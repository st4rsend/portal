import {onRequest} from "firebase-functions/v2/https";
import {db} from "./shared/firebase";

const rateLimitMap = new Map<string, { count: number; lastAccess: number }>();
const RATE_LIMIT = 20;// requêtes max
const WINDOW_MS = 60000;// par minute

const ContentPath = "Content/Xj2sEuNvzDtXlTkV2Xnp/Docs";

const SvcAccount =
 "cf-public-data-reader@gcp-learning-project-195511.iam.gserviceaccount.com";

export const readContentDoc = onRequest(
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
		res.status(405).json({error: "Method Not Allowed"});
	}

  // const docId = req.path.split("/").pop();
  const docId = req.query.docid;
  if (!docId) return res.status(400).send("Missing docId");

  try {
    const doc = await db.doc(`${ContentPath}/${docId}`).get();
    if (!doc.exists) return res.status(404).send("Not found");

    res.setHeader("Cache-Control", "public, max-age=86400");
    res.status(200).json(doc.data());
  } catch (e) {
			console.error("Firestore access failed:", JSON.stringify(e, null, 2));
			res.status(500).send("Server Error");
  }
});
