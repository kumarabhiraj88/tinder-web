# tinder-web

Created a Vite + React application Using Vite build tool
Go to the vite official doc page
Make changes to the command 
npm create vite@latest my-vue-app -- --template vue
to 
-> npm create vite@latest my-app-name -- --template react
-> Removed unnecessary codes and files (App.css,src/assets)
-> Do npm install
-> npm run dev
-> git init (initialize git into the project)
-> create a git repository and push the code
-> Refer Tailwind css documentation for Vite
-> npm install tailwindcss @tailwindcss/vite
-> Remove all the css in the index.css file and add @import "tailwindcss"; and add the code in vite.config.ts as per documentation
-> install daisyUI as a Tailwind CSS plugin (npm i -D daisyui@beta, add @plugin "daisyui"; in the css file)
-> Create a Navbar component and import in the App.jsx file (follow daisyui doc)
-> Create a Footer component
-> install react-router-dom
-> Create componets folder and keep all components within it
-> Create a Login component (Using Card, text input from daisyui)
-> install axios
-> install cors in backend and add it as a middleware(npm i cors)(to avoid cors error in frontend);
 The different local domains will work only if we whitelist these origins in the backend with corsOptions
 with credentials:true
 In frontend with every api call, pass {withCredentials: true}, then only the cookies will get stored (cookies should have jwt token)
  (When you pass withCredentials: true in your Axios request, you are telling the browser to include cookies and HTTP authentication information with the request)
-> install redux toolkit (npm install @reduxjs/toolkit react-redux)
    (Reference- https://redux-toolkit.js.org/tutorials/quick-start)
-> create utils/appStore.js (for redux configuration)
-> Wrap the application with Provider component from redux and pass store as prop
-> create utils/userSlice.js
-> configureStore->Provider->createSlice->add reducer to store
    Use redux dev tool extension in the browser to check the redux store activities (need updated browser )
-> using useDispatch(), dispatch the action (defined in the slice), payload to store (payload-> response data got from the successfull login )
While subscribing to the store using useSelector(store=>store.userReducer), use exact reducer name used inside the configureStore()
-> create utils/constants.js, keep BASE_URL here (hardcode datas should keep here)
-> while refreshing page, state data will lost, to avoid this keep state updated with loggedin user data using a  common api call
-> create a Feed component, create feedSlice and add it in the appStore config
-> create a UserCard component and import in the Feed component, pass feeds to the UserCard component, use Card from daisyUI
-> create EditProfile component and import in the Profile component, also import UserCard component here
-> Toast component added