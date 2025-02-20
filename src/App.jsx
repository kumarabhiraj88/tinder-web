import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="login" element={<Login />} />
            <Route  element={<ProtectedRoutes />} >
            <Route path="/" element={<h1>Feed Page</h1>} />
            <Route path="profile" element={<h1>Protected Profile Route</h1>} />
          </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
