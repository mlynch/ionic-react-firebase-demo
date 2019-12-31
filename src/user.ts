import * as firebase from 'firebase/app';

import { FirebaseApp } from './firebaseApp';

export function hasExistingSession() {
  return new Promise((resolve) => {
    FirebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  });
}

export async function getUser() {
  const user = FirebaseApp.auth().currentUser;

  if (!user) {
    return null;
  }

  return user!;
}

export async function login (email: string, password: string): Promise<firebase.User> {
  await FirebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const user = await FirebaseApp.auth().signInWithEmailAndPassword(email, password);

  return user.user!;
}

export async function signup({ name, email, password }: { name: string, email: string, password: string }): Promise<firebase.User> {
  await FirebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const user = await FirebaseApp.auth().createUserWithEmailAndPassword(email, password);

  console.log('Created user', user);

  // Create the associated user table
  await FirebaseApp.firestore().collection("users").doc(user.user!.uid).set({
    bio: ''
  });

  console.log('Created user data');

  return user.user!;
}

export function logout() {
  return FirebaseApp.auth().signOut();
}

export function sendPasswordResetEmail(email: string) {
  return FirebaseApp.auth().sendPasswordResetEmail(email);
}
