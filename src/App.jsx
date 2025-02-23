import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <Provider store={appStore}>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="login" element={<Login />} />
            <Route  element={<ProtectedRoutes />} >
            <Route path="/" element={<Feed />} />
            <Route path="profile" element={<h1>Protected Profile Route</h1>} />
          </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
