import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
  return (
    <Provider store={appStore}>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route  element={<ProtectedRoutes />} >
            <Route path="/" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
