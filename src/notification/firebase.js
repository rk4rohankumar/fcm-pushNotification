// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
import axios from '../axiosConfig'

const firebaseConfig = {
    apiKey: "AIzaSyBqTQcsGDcSY2f9nIFWYSV3zPMW7XLc7jM",
    authDomain: "emoha-67fa4.firebaseapp.com",
    projectId: "emoha-67fa4",
    storageBucket: "emoha-67fa4.firebasestorage.app",
    messagingSenderId: "420475888808",
    appId: "1:420475888808:web:2650b148137a7a94b50e9d",
    measurementId: "G-Z5T2WB4QX3"
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
            axios.post('/api/notifications/save-token', { token: token }).then(res => console.log(res)).catch(err => console.log(err
            ))
            console.log('Notification token:', token);

        } else {
            console.log('Unable to get permission to notify.');
        }

    } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
    }
};