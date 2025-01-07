import admin from 'firebase-admin';
import  dotenv from 'dotenv';
dotenv.config();
const serviceAccount = JSON.parse(process.env.serviceAccount);

export const initAdmin=()=> admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

export const getAdmin=()=>admin;