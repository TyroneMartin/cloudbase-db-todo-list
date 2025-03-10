import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

const serviceAccountKey = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

const app = initializeApp({
  credential: cert(serviceAccountKey),
  databaseURL: process.env.databaseURL
});

const db = getFirestore(app);

export { db };