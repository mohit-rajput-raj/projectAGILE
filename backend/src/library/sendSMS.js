import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAE1p4Mm8pUDEJnShVWjXG2qqgFEhAY9E0",
  authDomain: "agile-ecb96.firebaseapp.com",
  projectId: "agile-ecb96",
  storageBucket: "agile-ecb96.firebasestorage.app",
  messagingSenderId: "226145690051",
  appId: "1:226145690051:web:ecf41c8b84fdcd177edd76",
  measurementId: "G-BX1PF12D0L"
};

export const app = initializeApp(firebaseConfig);
export const asuth = getAuth(app);
export const analytics = getAnalytics(app);
