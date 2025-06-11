import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import APIHome from "../../Axios/apiHome";
import Footer from "../../components/Home/Footer";




function SinglePage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await APIHome.get(`/${postId}`, { withCredentials: true });

                if (res.data.success) {
                    setPost(res.data.data);
                    setSuccess(true);
                } else {
                    setSuccess(false);
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error?.response?.data || error?.message || "Failed to fetch post");
            }
        };
        getPost();
    }, [postId]);



    return (
    <div className="max-w-6xl min-h-screen flex flex-col items-center mt-32 mx-auto p-6 bg-[var(--bg-color)] text-[var(--text-color)]">

        <div className="w-full max-w-3xl border-none p-6 bg-[var(--bg-color)] text-[var(--text-color)]">

            {post && success ? (
                <>
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                    <img src={post.image} className="w-full max-h-[400px] object-cover rounded-lg mt-4 shadow-md" alt="Post" />
                    <div className="prose mt-4 text-lg space-y-4 bg-[var(--bg-color)] text-[var(--text-color)]" dangerouslySetInnerHTML={{ __html: post.description }}></div>

                </>
            ) : (
                <h1 className="text-red-500">{msg || "Error loading post"}</h1>
            )}
        </div>

        <Footer />

    </div>
    );
}

export default SinglePage;
