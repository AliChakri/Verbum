import { useEffect, useState,useRef } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import APIHome from "../../apiHome";
import Footer from "../../components/Home/Footer";




function SinglePage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

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
                toast.error("Failed to fetch post");
            }
        };
        getPost();
    }, [postId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);



    // const handleLike = async () => {
    //     try {
    //         const res = await APIHome.post("/like", { postId: post._id, userId: user });
    //         setLikes(res.data.likes);
    //     } catch {
    //         toast.error("Error liking post");
    //     }
    // };

    // const addComment = async () => {
    //     if (!newComment.trim()) return;
    //     try {
    //         const res = await APIHome.post("/comment", { postId: post._id, userId: user, text: newComment });
    //         setComments([...res.data]);
    //         setNewComment("");
    //     } catch {
    //         toast.error("Error adding comment");
    //     }
    // };

    // const likeComment = async (commentId) => {
    //     try {
    //         const res = await APIHome.put("/comment/like", { postId: post._id, commentId, userId: user });
    //         setComments(prevComments =>
    //             prevComments.map(c => (c._id === commentId ? { ...c, likes: res.data.length } : c))
    //         );
    //     } catch {
    //         toast.error("Error liking comment");
    //     }
    // };

    // const editComment = async (commentId, text) => {
    //     const updatedText = prompt("Edit comment:", text);
    //     if (!updatedText) return;
    //     try {
    //         const res = await APIHome.put("/comment/edit", { postId: post._id, commentId, text: updatedText });
    //         setComments(res.data);
    //     } catch {
    //         toast.error("Error editing comment");
    //     }
    // };

    // const deleteComment = async (commentId) => {
    //     if (!window.confirm("Are you sure you want to delete this comment?")) return;
    //     try {
    //         const res = await APIHome.delete(`/comment/delete`, {
    //             data: { postId: post._id, commentId }
    //         });
    //         setComments(res.data);
    //     } catch {
    //         toast.error("Error deleting comment");
    //     }
    // };


    return (
    <div className="max-w-6xl min-h-screen flex flex-col items-center mt-20 mx-auto p-6 bg-[var(--bg-color)] text-[var(--text-color)]">



        <div className="w-full max-w-3xl border-none p-6 bg-[var(--bg-color)] text-[var(--text-color)]">

        <motion.div
                    ref={ref}
                    className="rhombus"
                    initial={{ opacity: 0, y: 100 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
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
        </motion.div>
        </div>

        <Footer />

    </div>
    );
}

export default SinglePage;

// SVG Icons
// const LikeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M14 9V5a3 3 0 0 0-3-3L7 7v12h10l4-8V9z" />
//         <path d="M7 22h4" />
//     </svg>
// );

// const EditIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 20h9" />
//         <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
//     </svg>
// );
// const DeleteIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M3 6h18" />
//         <path d="M8 6v12" />
//         <path d="M16 6v12" />
//         <path d="M5 6l1 14h12l1-14" />
//         <path d="M10 6V4h4v2" />
//     </svg>
// );
