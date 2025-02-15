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