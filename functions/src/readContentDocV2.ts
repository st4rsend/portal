import {onRequest} from "firebase-functions/v2/https";
import {db} from "./shared/firebase";

const rateLimitMap = new Map<string, { count: number; lastAccess: number }>();
const RATE_LIMIT = 20;// requêtes max
const WINDOW_MS = 60000;// par minute

const SvcAccount =
 "cf-public-data-reader@gcp-learning-project-195511.iam.gserviceaccount.com";

export const readContentDocV2 = onRequest(
	{
		serviceAccount: SvcAccount,
	}, async (req: any, res: any) => {
  // CORS (optional for dev — remove or restrict in prod)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  // Handle preflight CORS request
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const clientIp = req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    "unknown";
  const now = Date.now();
  const limitEntry = rateLimitMap.get(clientIp) || {count: 0, lastAccess: now};

  if (now - limitEntry.lastAccess < WINDOW_MS) {
    if (limitEntry.count >= RATE_LIMIT) {
      return res.status(429).send("Too many requests");
    }
    limitEntry.count += 1;
  } else {
    limitEntry.count = 1;
    limitEntry.lastAccess = now;
  }
  rateLimitMap.set(clientIp, limitEntry);

	if (req.method !== "GET") {
		return res.status(405).json({error: "Method Not Allowed"});
	}

  // const docId = req.path.split("/").pop();
  const docId = req.query.docid;
	const docMaster = req.query.docmaster;
  if (!docId) return res.status(400).send("Missing docId");
  if (!docMaster) return res.status(400).send("Missing docMaster");

  try {
    const doc = await db.doc(`Content/${docMaster}/Docs/${docId}`).get();
    if (!doc.exists) return res.status(404).send("Not found");

    const raw = doc.data() as any;
    if (!raw) return res.status(200).json({meta: null, rows: []});

    const meta = raw.meta ?? null;
    const unitsOrder: string[] = Array.isArray(raw.units_order) ?
      raw.units_order : [];
    const units: Record<string, any> = raw.units &&
      typeof raw.units === "object" ? raw.units : {};

    const rows = unitsOrder
      .filter((id) => typeof id === "string" && id in units)
      .map((id) => {
        const u = units[id] ?? {};
        return {
          id,
          label: u.label ?? "",
          selector: u.selector ?? "text",
          raw_data: u.raw_data ?? "",
        };
      });

    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.status(200).json({meta, rows});
  } catch (e) {
			console.error("Firestore access failed:", JSON.stringify(e, null, 2));
			res.status(500).send("Server Error");
  }
});
