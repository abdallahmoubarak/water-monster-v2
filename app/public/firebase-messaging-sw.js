
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');

importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAAyvCmJW8tUMLwGZTbVQ2CDu1EvoF6vXw",
  authDomain: "fir-23b21.firebaseapp.com",
  projectId: "fir-23b21",
  storageBucket: "fir-23b21.appspot.com",
  messagingSenderId: "734550072056",
  appId: "1:734550072056:web:b895450b17c3429f73790d",
  measurementId: "G-SCXWD3KCJ2"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './icons/icon-192x192.png',
  };   
 

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Foreground message handler
