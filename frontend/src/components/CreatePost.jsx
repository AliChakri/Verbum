

import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import APIAdmin from "../Axios/APIAdmin";
import { toast } from "react-toastify";



function CreatePost() {


    const [title, setTitle] = useState("");
    const [cat, setCat] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState(""); // Stores editor content
    const quillRef = useRef(null);
    const [htmlContent, setHtmlContent] = useState(""); // Store converted HTML

    
    useEffect(() => {
      if (quillRef.current) return; // Prevent re-initialization
  
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
  
      // Save content on text change
      quillRef.current.on("text-change", () => {
          setContent(quillRef.current.root.innerHTML);
      });
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, description: content, image, cat,createdAt: Date.now()  };

    try {
        const res = await APIAdmin.post("/create", newPost);
        if(res.data.success){
            toast.success('Post Created 💡');
            // Convert Quill Delta to HTML
            const tempQuill = new Quill(document.createElement("div"));
            tempQuill.setContents(res.data.data.description);
            setHtmlContent(tempQuill.root.innerHTML); // Store HTML content
        }
    } catch (error) {
        toast.error(error.message);
        console.error("Error creating post:", error);
    }
};

return (
    <div className="p-4 max-w-2xl mx-auto mt-32 z-40 bg-[var(--bg-color)] text-[var(--text-color)]">
            <label htmlFor="email" className="block mb-2 text-2xl font-semibold ">
                Title
            </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow-xs bg-transparent text-[var(--text-color)] border border-gray-400 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="enter your title" required 
            />

            <label htmlFor="email" className="block mb-2 text-2xl font-semibold ">
                Image (Url)
            </label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="shadow-xs bg-transparent text-[var(--text-color)] border border-gray-400 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="enter your title" required 
            />

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-2xl font-semibold ">
                    Categories
                </label>
                <input name="cat"
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        type="text" id="email" 
                        className="shadow-xs bg-transparent text-[var(--text-color)] border-gray-400 text-sm mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="example #programming" required />
                

                <label htmlFor="email" className="sm:w-lg md:w-6xl block mb-2 text-2xl font-semibold ">
                    Content
                </label>
            </div>

        
            <div id="editor" className="border min-h-[150px] p-2">  </div>

        <button onClick={(e)=>handleSubmit(e)} className="btn btn-outline btn-info">
            Create Post
        </button>
    </div>
);
}

export default CreatePost;