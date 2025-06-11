


import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";
import { useNavigate,useParams } from "react-router-dom";


function ResetPassword() {

    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const { token} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                await API.post(`/reset-password`, { token, password })
                .then(res => {
                    if(res.data.success){
                        toast.success("Password reset successful!");
                        navigate("/login");
                    }
                }).catch(err => {
                    toast.error(err.message);
                    console.log(err.message);
                });
            } catch (error) {
                toast.error("Invalid OTP or error resetting password.", error.message);
                console.error(error.message);     
            }
    };

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-4 bg-transparent text-[var(--text-color)] vh-100">

            

            <div className=" flex flex-col items-center justify-center gap-6 p-4">

                <h1 className="text-4xl font-bold">
                    Reset Password
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center text-[var(--text-color)]">

                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                autoComplete="off"
                                name="password"
                                className="form-control w-96 px-4 py-2 text-[var(--text-color)] border border-gray-400 rounded-xl"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="w-full text-white bg-[#5f9ea0] px-4 py-2 font-semibold rounded-xl cursor-pointer hover:bg-[#5f9ea0]/90 active:bg-[#5f9ea0]/80">
                            Update
                        </button>

                </form>

            </div>

        </div>
    );
}

export default ResetPassword;
