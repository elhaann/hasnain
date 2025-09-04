// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDoFu2J0LvUelkbOAR-gcUVWba0Ot4WcnY",
  authDomain: "eco-energy-eddaa.firebaseapp.com",
  projectId: "eco-energy-eddaa",
  storageBucket: "eco-energy-eddaa.firebasestorage.app",
  messagingSenderId: "901131625736",
  appId: "1:901131625736:web:6266b9733ecdf3def138bd",
  measurementId: "G-WZZK1GM4VV",
  databaseURL:"https://eco-energy-eddaa-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure reCAPTCHA for phone auth
// export const setupRecaptcha = (containerId) => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier(containerId, {
//       size: 'normal',
//       callback: (response) => {
//         // reCAPTCHA solved
//         console.log('reCAPTCHA solved');
//       },
//       'expired-callback': () => {
//         // Response expired
//         console.log('reCAPTCHA expired');
//       }
//     });
//   }
// };

export default app;