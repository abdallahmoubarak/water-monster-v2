import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '../firebase';

const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
       
          const messaging = getMessaging(firebaseApp);
        
          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey:
                'BMNlRFUJrLYZjMw4l5Tn_Bd_VNDYLSkmc_onqfGWmaUj30nkp0Rwhi8GSHoMY94epSZSCP5phPz8ewHExmSlATU',
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          }
      
      } catch (error) {
        console.log('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, [notificationPermissionStatus]);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;