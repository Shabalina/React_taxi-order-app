export const getRoute = (from, to) =>  (
  fetch(    
    `https://loft-taxi.glitch.me/route?` +
      `address1=${from}` +
      `&address2=${to}`
  ).then(
    response =>
      response.status !== 200 ? Promise.reject(response) : response.json()
  )
)
