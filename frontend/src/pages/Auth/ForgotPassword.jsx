



import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../Axios/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await API.post("/forgot-password", {email})
        .then(res => {
            if(res.data.success) {
                toast.success("OTP sent to your email!");
            }
        }).catch((err) => console.log(err.message));

        ;
        
    } catch (error) {
        toast.error("Error sending OTP. Try again.",error.message);
    }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center ">
            <form onSubmit={(e)=>handleSubmit(e)} className="w-96 flex flex-col gap-8 max-w-md mx-auto">
                <h2 className="text-lg text-center font-semibold ">Forgot Password</h2>
                <input
                type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input w-full"
                />
                <button type="submit" className="btn text-white bg-[#5f9ea0]">Send OTP</button>
            </form>
        </div>
    );
}

export default ForgotPassword;