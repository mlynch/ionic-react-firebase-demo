import { FirebaseApp } from './firebaseApp';

export async function loadThings() {
  const col = await FirebaseApp.firestore().collection("things");
  const docs = await col.orderBy('name').limit(25).get();

  return docs.docs.map(doc => doc.data());
}