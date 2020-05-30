import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "@/utility/firebase-config";

firebase.initializeApp({
  projectId: firebaseConfig.projectId,
  databaseURL: firebaseConfig.databaseURL,
});
// firebase.firestore().settings({ timestampsInSnapshots: true });

export const db = firebase.firestore();

const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
