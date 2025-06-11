
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthApi";
import { Lock, Mail } from "lucide-react";


function Login() {

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState({ email: "", password: "" });
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    };



const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await API.post("/login", data, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });

        if (res.data.success) {
            setUser(res.data.user);
            toast.success(`Welcome ${res.data.user.role === "admin" ? "Admin" : res.data.user.name}`);
            navigate("/home");
        }
    } catch (err) {
        if (err?.response?.status === 401) {
            toast.warning("Please verify your email first.");
            setShowVerifyModal(true); // ✅ show modal
        } else if (err?.response?.status === 400) {
            toast.error(err.response.data.message || "Invalid Credentials");
        } else {
            toast.error("Login failed. Please try again.");
        }
    }
};

    return (
        <section className="login-bg w-full h-screen bg-cover  flex items-center justify-center mx-auto overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
            <div className="container relative max-w-[500px] bg-transparent flex flex-col items-center justify-center py-12 border border-gray-400 rounded-xl  shadow-xl  z-50">
                
                {/* Title */}
                <div className="flex flex-col text-center">
                    <h1 className="text-3xl  w-full bg-clip-text font-extrabold text-[var(--text-color)] mb-4">Welcome Back to AC Blog</h1>
                    <h2 className="text-2xl text-[var(--text-color)]  mb-6">Sign In</h2>
                </div>
        
                {/* Form */}
                <form className="w-full flex flex-col items-center text-[var(--text-color)] gap-5">

                    {/* Email Input */}
                    <div className="relative w-full max-w-[400px] bg-transparent  backdrop-blur-sm flex items-center  rounded-lg border border-gray-700 transition-all duration-300 focus-within:scale-105 focus-within:border-blue-400">
                        <label className="pl-3">
                            <Mail className="w-6 h-6 opacity-80"/>
                        </label>
                        <input 
                            type="email"
                            className="w-full h-12 pl-4 pr-4 bg-transparent outline-none border-none placeholder:text-gray-400"
                            placeholder="Enter your Email"
                            required
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
        
                    {/* Password Input */}
                    <div className="relative w-full max-w-[400px] bg-transparent backdrop-blur-sm flex items-center  rounded-lg border border-gray-700 transition-all duration-300 focus-within:scale-105 focus-within:border-blue-400">
                        <label className="pl-3">
                            <Lock className="w-6 h-6 opacity-80"/>
                        </label>
                        <input 
                            type="password"
                            name="password"
                            className="w-full h-12 pl-4 pr-4 bg-transparent outline-none border-none placeholder:text-gray-400"
                            placeholder="Enter your Password"
                            required
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-[400px]">
                        <Link   to="/forgot-password" 
                                className=" text-left text-[#5f9ea0] ">
                            Forgot Password ?
                        </Link>
                    </div>

                    <div className="separator">Or</div>

        
                    {/* Register Button */}
                    <button 
                        className="w-full max-w-[400px] h-12 text-lg bg-[#5f9ea0] text-white rounded-lg border-none outline-none hover:bg-[#5f9ea0]/90 active:bg-[#5f9ea0]/70 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                        type="submit"
                        onClick={(e)=>handleSubmit(e)}
                    >
                        Login
                    </button>

                                        {/* Link */}
                    <div className="w-[400px] flex items-center justify-center ">
                        <p className="text-center font-[300] text-[15px]">Dont have an Account? 
                            <Link className="font-[400] text-[#5f9ea0]" to="/register"> Regiter</Link> 
                        </p>
                    </div>
        
                </form>

                {showVerifyModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[9999]">
                        <div className="bg-white text-black rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
                            <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
                            <p className="mb-6">
                                Your account is not verified. Please verify your email address to continue.
                            </p>
                            <button 
                                onClick={() => navigate("/verifying-email")}
                                className="bg-[#5f9ea0] text-white px-4 py-2 rounded hover:bg-[#5f9ea0]/80"
                            >
                                Go to Verification Page
                            </button>
                            <button 
                                onClick={() => setShowVerifyModal(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Login