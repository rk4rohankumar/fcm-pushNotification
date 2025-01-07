// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
import axios from '../axiosConfig'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID
}
// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const token = await getToken(messaging, {
                vapidKey: "BEbbPsmf20ZepAiwZgI5egtNw-Xb7-BkWm5BUty6iAJVSCzkyBLB9zCIpnt9K_6O9kPpf2NJssIUxJ1cjyiXGAw",
            })
            axios.post('/api/notifications/save-token', { token: token }).then(res => console.log(res.data)).catch(err => console.log(err
            ))
            console.log('Notification token:', token);

        } else {
            console.log('Unable to get permission to notify.');
        }

    } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
    }
};