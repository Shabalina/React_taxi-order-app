export const getAddressList = () =>
  fetch(    
      'https://loft-taxi.glitch.me/addressList'
    ).then(
      response =>
        response.status !== 200 
        ? Promise.reject(response) 
        : response.json()
    )
