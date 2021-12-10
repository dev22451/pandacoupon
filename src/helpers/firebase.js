import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAYxvIap3N8tVyD3vL-StMEefb4vby3r-c",
  authDomain: "couponapp-3ac19.firebaseapp.com",
  projectId: "couponapp-3ac19",
  storageBucket: "couponapp-3ac19.appspot.com",
  messagingSenderId: "1006098806039",
  appId: "1:1006098806039:web:c8e0c68258b2af55a8b352",
  databaseURL: 'https://couponapp-3ac19.firebaseio.com',
};


const App = firebase.initializeApp({})

export const getDeviceToken = async () => {
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();
  console.log({token})
}