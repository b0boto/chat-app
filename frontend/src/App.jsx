import './App.css'
import Home from "./pages/home/Home.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import {Toaster} from "react-hot-toast";
import {useAuthContext} from "./context/AuthContext.jsx";
import {useEffect} from "react";
import useConversationKeeper from "./hooks/useConversationKeeper.js";

function App() {
  const { authUser } = useAuthContext();

  return (
      <div data-theme="dark" className={'p-4 h-screen flex items-center justify-center'}>
        <Routes>
            <Route path={'/'} element={authUser ? <Home/> : <Navigate to={'/login'}/>}/>
            <Route path={'/login'} element={authUser ? <Navigate to={'/'}/> : <Login/>}/>
            <Route path={'/signup'} element={authUser ? <Navigate to={'/'}/> : <SignUp/>}/>
        </Routes>
        <Toaster/>

      </div>
  )
}

export default App
