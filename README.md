# chitchat.io

This chat app uses Socket.io as a backend service and ReactJS with tailwind css as UI/UX experience.

Inside Server folder, add a config.json file 
```
let config = {
  clientUrl: "", //"https://my-chitchat-app.herokuapp.com",
  redisHost: "localhost", //,
  redisPassword: "",
  redisPort: 6379,
  jwtPrivateKey: "" //Your Private Key,
};
export default config;
```
