import {onCall} from "firebase-functions/v2/https";

export const helloWorld = onCall((req: any) => {
	const {data, auth} = req;
	if (!auth) {
		throw new Error("Not authenticated");
	}

	return {
		message: `Hello from Firebase, UID: ${auth.uid}, Data: ${data}`,
	};
});
