
import './index.css'
import { Routes, Route} from 'react-router-dom'

import Home from './pages/Home/Home'
import AllPosts from './pages/Home/AllPosts'
import SinglePage from './pages/Home/SinglePage'
import About from './pages/Home/About'
import Footer from './components/Home/Footer'
import Settings from './pages/Home/Settings'

import SplashScreen from './components/SplashScreen'


import Login from './pages/Auth/Login'
import OtpPage from './pages/Auth/OtpPage'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import CheckEmail from './components/Auth/CheckEmail'

import NavBar from './components/Nav/NavBar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'


import CreatePost from './components/CreatePost'
import EditPost from './pages/EditPost'
import AuthApi from './context/AuthApi'

import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import Email from './pages/Auth/Re-Verifying/Email'




function App() {

  const [user, setUser] = useState(null); // ✅ User state

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Simulate loading delay (e.g., fetching data, or just a nice splash)
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    
    <>
      {loading ? 
                <SplashScreen /> 

                : 

                <div className='w-full min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] overflow-x-hidden'>
      


                  <ToastContainer />
                  <AuthApi>
                    <NavBar />

                    <Routes>

                      <Route element={<PublicRoute/>} >

                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/verifying-email' element={<Email />} />
                        <Route path="/verify-email/:token" element={<OtpPage />} />
                        <Route path="/check-email" element={<CheckEmail />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />

                      </Route>

                    <Route element={<ProtectedRoute/>} >
                    
                      <Route path='/home' element={<Home />} />
                      <Route path='/all-posts' element={<AllPosts />} />
                      <Route path='/about' element={<About />} />
                      <Route path='/user/settings' element={<Settings />} />
                      <Route path='/posts/:postId' element={<SinglePage />} />
                      <Route path='/create-post' element={<CreatePost />} />
                      <Route path='/edit-post/:postId' element={<EditPost />} />

                    </Route>

                    </Routes>
                  </AuthApi>
                </div>
      }
    </>
  )
}

export default App
