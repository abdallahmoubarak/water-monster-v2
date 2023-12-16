import axios from 'axios'
export const handleSendFCM = async (fcmToken:any,title:any,body:any) => {
   
    try {
 
     

        const apiUrl = 'https://fcm.googleapis.com/fcm/send';

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AAAAqwaYmvg:APA91bH96Zkyw4YGV_SY7VlF5nQZZlG_nzSpFu2XIrHhX7fr7kdkyDCqpY8Quba2w07570T07m0No3QEzSd5l4uhvqRB4ypMjqIgSiRHVRtaRDfMsKvlhvpUVinCz2iT6eceMfV2kAId',
        };
        
        const data = {
          to: fcmToken,
          notification: {
            title: title,
            body: body,
          },
        };
        
        axios.post(apiUrl, data, { headers })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      
      alert("Notification sent Successfully!")
     
    } catch (error) {
      console.error('Error sending FCM payload:', error);
    }
  };