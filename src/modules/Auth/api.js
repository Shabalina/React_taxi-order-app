export const sendLoginData = (login, password) =>  
fetch(    
  `https://loft-taxi.glitch.me/auth?` +
    `username=${login}` +
    `&password=${password}`
).then(
  response =>
    response.status !== 200 ? Promise.reject(response) : response.json()
)