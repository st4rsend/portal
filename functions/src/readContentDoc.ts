import {onCall} from "firebase-functions/v2/https";
import {db} from "./shared/firebase";

const rateLimitMap = new Map<string, { count: number; lastAccess: number }>();
const RATE_LIMIT = 20;// requêtes max
const WINDOW_MS = 60000;// par minute

const ContentPath = "users";

export const readContentDoc = onCall(async (req: any, res: any) => {
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

  const docId = req.path.split("/").pop();
  if (!docId) return res.status(400).send("Missing docId");

  try {
    const doc = await db.doc(`${ContentPath}/${docId}`).get();
    if (!doc.exists) return res.status(404).send("Not found");

    res.setHeader("Cache-Control", "public, max-age=86400");
    res.status(200).json(doc.data());
  } catch (e) {
    res.status(500).send("Server Error");
  }
});
