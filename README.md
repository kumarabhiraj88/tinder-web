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
-> Create a Login component (Using Card, text input from daisyui)
-> install axios
-> install cors in backend and add it as a middleware(npm i cors)(to avoid cors error in frontend);
 The different local domains will work only if we whitelist these origins in the backend with corsOptions
 with credentials:true
 In frontend with every api call, pass {withCredentials: true}, then only the cookies will get stored (cookies should have jwt token)
  (When you pass withCredentials: true in your Axios request, you are telling the browser to include cookies and HTTP authentication information with the request)
-> install redux toolkit (npm install @reduxjs/toolkit react-redux)
    (Reference- https://redux-toolkit.js.org/tutorials/quick-start)