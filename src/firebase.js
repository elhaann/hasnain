import { initializeApp } from "firebase/app";


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


export const app = initializeApp(firebaseConfig); 
