import { useEffect } from "react"
import Nav from "./components/Nav"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Votes from "./components/pages/Votes"
import Statistics from "./components/pages/Statistics"
import { useAppDispatch } from "./redux/store"
import { fetchCandidates } from "./redux/slices/candidatesSlice"
import { socket } from "./main"
import { Bounce, toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCandidates());
    toast.info('Somone somewhere has voted')
    socket.on("newDataHasOccurred", () => {
      dispatch(fetchCandidates());

    });

    return () => {
      socket.off("newDataHasOccurred");
    };
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="votes" element={<Votes />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
      <ToastContainer
        position = "top-right" 
        autoClose = {3000}
        hideProgressBar = {false}
        closeOnClick = {true}
        pauseOnHover = {true}
        draggable = {true}
        theme = "light"
        transition = {Bounce}
      />
    </div>
    
  )
}
