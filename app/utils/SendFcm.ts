 export const handleSendFCM = async (fcmToken:any,title:any,body:any) => {
   
    try {
 
     

      // Send a test FCM payload to the current token
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        // timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer AAAAqwaYmvg:APA91bH96Zkyw4YGV_SY7VlF5nQZZlG_nzSpFu2XIrHhX7fr7kdkyDCqpY8Quba2w07570T07m0No3QEzSd5l4uhvqRB4ypMjqIgSiRHVRtaRDfMsKvlhvpUVinCz2iT6eceMfV2kAId`
        },
        body: JSON.stringify({
          to:fcmToken,
          notification: {
            title: title,
            body: body,
          },
        }),
      });
 
      const responseData = await response.json();
      console.log(responseData);
      
      alert(`fcm ${fcmToken}`)
     
    } catch (error) {
      console.error('Error sending FCM payload:', error);
    }
  };