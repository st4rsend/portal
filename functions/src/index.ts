import {setGlobalOptions} from "firebase-functions/v2";
setGlobalOptions({region: "europe-west6"});

export {helloWorld} from "./helloWorld";
export {readContentDoc} from "./readContentDoc";
