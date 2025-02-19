import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Body from "./Body";
import Login from "./Login";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="login" element={<Login />} />
          </Route>
          <Route  element={<ProtectedRoutes />} >
            <Route path="profile" element={<h1>Protected Profile Route</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
