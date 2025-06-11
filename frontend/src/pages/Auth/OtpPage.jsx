

import API from "../../api";
import { toast } from "react-toastify";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect } from "react";

function OtpPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await API.get(`/verify-email/${token}`);
        toast.success("Email verified! You can now log in.");
        navigate("/login");
      } catch (error) {
        toast.error("Verification failed. Invalid or expired link.");
      }
    };

    verifyEmail();
}, [token, navigate]);

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <h2 className="text-2xl font-bold">Verifying your email...</h2>
    </div>
  );
}

export default OtpPage;

