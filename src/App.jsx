import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoutes from "./ProtectedRoutes";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore,{persistor}  from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <Provider store={appStore}>  
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
              <Route  element={<ProtectedRoutes />} >
                <Route path="feed" element={<Feed />} />
                <Route path="profile" element={<Profile />} />
                <Route path="connections" element={<Connections />} />
                <Route path="requests" element={<Requests />} />
              </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
