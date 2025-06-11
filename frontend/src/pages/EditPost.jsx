

import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import APIAdmin from "../APIAdmin";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {

    const navigate = useNavigate();
    const { postId } = useParams();
    const [title, setTitle] = useState("");
    const [cat, setCat] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState(""); // Stores editor content
    const quillRef = useRef(null);

const ignoreQuillChange = useRef(false);

    useEffect(() => {
    if (quillRef.current) return;

    quillRef.current = new Quill("#editor", {
        theme: "snow",
        placeholder: "Start writing...",
        modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
        },
    });

    // Sync content on user change
    quillRef.current.on("text-change", () => {
        if (ignoreQuillChange.current) {
        ignoreQuillChange.current = false;
        return;
        }
        setContent(quillRef.current.root.innerHTML);
    });
    }, []);


useEffect(() => {
    const getPost = async () => {
        try {
            const res = await APIAdmin.get(`/${postId}` , { withCredentials: true });
            if(res.data.success){
                setTitle(res.data.data.title);
                setImage(res.data.data.image);
                setCat(res.data.data.cat);
                setContent(res.data.data.description);
                toast.success('Post Fetched Successfully ✔');
            } else {
                console.log(postId);
                toast.success(res.data.message);
            }
        } catch (error) {
            if (error.response?.status === 401) {
            navigate("/login");
            toast.info("Not authorized! Please login.");
            } else {;
            toast.error(error.message);
            }
        }
    };
    getPost();
}, [navigate]);

const handleUpdate = async () => {
    const newPost = {
        title,
        description: content,
        image,
        cat,
        updatedAt: Date.now(),
    };

    try {
        const res = await APIAdmin.patch(`/edit/${postId}`, newPost);
        if (res.data.success) {
        toast.success("Post Updated 💡");
        navigate(`/posts/${postId}`);
        }
    } catch (error) {
        toast.error(error.message);
        console.error("Error updating post:", error);
    }
};

// **New Effect to Update Quill Editor**
useEffect(() => {
  if (quillRef.current && content) {
    ignoreQuillChange.current = true;
    quillRef.current.clipboard.dangerouslyPasteHTML(content);
  }
}, [content]);

// const stripHtml = (html) => {
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.textContent || "";
// }


return (
    <div className="p-4 max-w-2xl mx-auto mt-32 z-40 bg-[var(--bg-color)] text-[var(--text-color)]">
            <label htmlFor="email" className="block mb-2 text-2xl font-semibold ">
                Title
            </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow-xs bg-gray-50 border border-white mb-6 dark:border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="enter your title" required 
            />

            <label htmlFor="email" className="block mb-2 text-2xl font-semibold ">
                Image (Url)
            </label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="shadow-xs bg-gray-50 border border-white mb-6 dark:border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="enter your title" required 
            />

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-2xl font-semibold ">
                    Categories
                </label>
                <input name="cat"
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        type="text" id="email" 
                        className="shadow-xs bg-gray-50 border border-white dark:border-gray-700 text-gray-900 text-sm mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="example #programming" required />
                

                <label htmlFor="email" className="sm:w-lg md:w-6xl block mb-2 text-2xl font-semibold ">
                    Content
                </label>
            </div>

        
        <div id="editor" className="border min-h-[150px] p-2"> </div>

        <button onClick={handleUpdate} className="btn btn-outline btn-info">
            Edit Post
        </button>
    </div>
);
}

export default EditPost;