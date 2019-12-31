import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './firebaseConfig';

export const FirebaseApp = firebase.initializeApp(firebaseConfig);

export const FirebaseStorage = firebase.storage();
export const FirebaseAnalytics = firebase.analytics();