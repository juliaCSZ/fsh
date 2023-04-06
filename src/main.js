import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';
import store from './store';


Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD2H-CMVwbxPG0rAFRSpT1RNdR2fCPSUYc",
  authDomain: "furnitrueshop.firebaseapp.com",
  projectId: "furnitrueshop",
  storageBucket: "furnitrueshop.appspot.com",
  messagingSenderId: "539630637292",
  appId: "1:539630637292:web:e8cf5d8e5ca7dbd6c915c9",
  measurementId: "G-W9HCTQ1NQK"
};
// Initialize Firebase app
const firebaseapp = firebase.initializeApp(firebaseConfig);
export const db = firebaseapp.firestore();
export const firebaseAuth = firebase.auth()


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')












// ------------- firebase -------------
/* 
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD2H-CMVwbxPG0rAFRSpT1RNdR2fCPSUYc",
    authDomain: "furnitrueshop.firebaseapp.com",
    projectId: "furnitrueshop",
    storageBucket: "furnitrueshop.appspot.com",
    messagingSenderId: "539630637292",
    appId: "1:539630637292:web:e8cf5d8e5ca7dbd6c915c9",
    measurementId: "G-W9HCTQ1NQK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script> 
*/
