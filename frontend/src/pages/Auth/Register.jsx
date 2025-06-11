
import { useState } from "react"
import API from "../../Axios/api";
import { useNavigate,Link } from "react-router-dom";

import { toast } from "react-toastify";
import { Lock, Mail, User } from "lucide-react";



function Register() {

    

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/register", form);
            toast.success("Registered! Check your email for the verification link.");
            setMsg(res.data.message);
            setSuccess(res.data.success);
            if (res.data.success) {
                navigate("/check-email"); // Pass email to OTP page
            }
        } catch (err) {
            setMsg(err.response?.data?.message || "Registration failed");
            toast.error(err.message);
        }
    };
    

    return (

    <section className="w-full h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex items-center justify-center mx-auto overflow-hidden">
    <div className="container relative max-w-[500px] text-[var(--text-color)] flex flex-col items-center justify-center py-12 border border-gray-400 rounded-xl shadow-xl">
        
        {/* Title */}
        <div className="flex flex-col text-center text-[var(--text-color)]">
            <h1 className="text-3xl  w-full  font-extrabold mb-4">Welcome to AC Blog</h1>
            <h2 className="text-2xl mb-6">Create Your Account</h2>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col items-center gap-5 ">

            {/* Name Input */}
            <div className="relative w-full max-w-[400px] text-[var(--text-color)] flex items-center  rounded-lg border border-gray-700 transition-all duration-300 focus-within:scale-105 focus-within:border-blue-400">
                <label className="pl-3">
                    <User className="w-6 h-6 opacity-80" />
                </label>
                <input 
                    type="text"
                    name="name"
                    className="w-full h-12 pl-4 pr-4 bg-transparent outline-none border-none placeholder:text-gray-400"
                    placeholder="Enter your Name"
                    required
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
            </div>


            {/* Email Input */}
            <div className="relative w-full max-w-[400px] text-[var(--text-color)] flex items-center  rounded-lg border border-gray-700 transition-all duration-300 focus-within:scale-105 focus-within:border-blue-400">
                <label className="pl-3">
                    <Mail className="w-6 h-6 opacity-80"/>
                </label>
                <input 
                    type="email"
                    name="email"
                    className="w-full h-12 pl-4 pr-4 bg-transparent outline-none border-none placeholder:text-gray-400"
                    placeholder="Enter your Email"
                    required
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
            </div>

            {/* Password Input */}
            <div className="relative w-full max-w-[400px] text-[var(--text-color)] flex items-center  rounded-lg border border-gray-700 transition-all duration-300 focus-within:scale-105 focus-within:border-blue-400">
                <label className="pl-3">
                    <Lock className="w-6 h-6 opacity-80" />
                </label>
                <input 
                    type="password"
                    name="password"
                    className="w-full h-12 pl-4 pr-4 bg-transparent outline-none border-none placeholder:text-gray-400"
                    placeholder="Enter your Password"
                    required
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
            </div>

            {msg && !success ? <p className="mt-2 text-red-500">{msg}</p> : null}


            {/* Link */}
            <div className="w-[400px] flex items-center justify-start text-[var(--text-color)]">
                <p className="text-left  font-[300] text-[15px]">Already have an Account? 
                    <Link className="font-[400] text-[#5f9ea0] " to="/login"> Sign In</Link> 
                </p>
            </div>

            {/* Register Button */}
            <button 
                className="w-full max-w-[400px] h-12 text-lg bg-[#5f9ea0] text-white rounded-lg border-none outline-none hover:bg-[#5f9ea0]/90 active:bg-[#5f9ea0]/80 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                type="submit"
                onClick={(e)=>handleSubmit(e)}
            >
                Register
            </button>



        </form>
    </div>
</section>

    )
}

export default Register