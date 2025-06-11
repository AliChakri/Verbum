import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIAdmin from "../../Axios/APIAdmin";
import { toast } from "react-toastify";
import Card from "../../components/Categories/Card";
import UserCard from "../../components/Categories/UserCard";
import { AuthContext } from "../../context/AuthApi";
import Footer from "../../components/Home/Footer";

function AllPosts() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [filters, setFilters] = useState([]);
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // Filters
    const [selectedCats, setSelectedCats] = useState("");

    // Search
    const [search, setSearch] = useState("");

  // Fetch filters + user info once
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const res = await APIAdmin.get(`/`);
                if (res.data.success) {
                    const allCategories = [...new Set(res.data.blogs.map(blog => blog.cat))];
                    setFilters(allCategories);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialData();
    }, []);

  // Fetch blogs on search/category change
    useEffect(() => {
        const getPosts = async () => {
        try {
            const res = await APIAdmin.get("/", {
                params: {
                    category: selectedCats,
                    search: search,
                },
                withCredentials: true,
            });

            if (res.data.success) {
                if (res.data.blogs.length === 0) {
                    setBlogs([]);
                    setMsg("No posts found.");
                    setSuccess(false);
                } else {
                    setBlogs(res.data.blogs);
                    setMsg("");
                    setSuccess(true);
                }
            } else {
                setMsg("Failed to load posts.");
                setSuccess(false);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/login");
                toast.info("Not authorized! Please login.");
            } else {
                setMsg("Failed to fetch posts");
                setSuccess(false);
            }
        }
        };

        const delay = setTimeout(getPosts, 200); // debounce for search
        return () => clearTimeout(delay);

    }, [selectedCats, search]);

    return (

        <div className="w-full min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] mb-32">

            <div className="flex flex-col items-center mt-32 mx-auto px-4">
                
                <div className="w-full max-w-6xl flex flex-col items-center gap-8">

                    <div className="w-full max-w-6xl">
                        <h2 className="text-3xl font-semibold my-6">All Posts</h2>
                    </div>

                    {/* FILTERS */}
                    <div className="w-full max-w-6xl flex gap-x-2.5 flex-wrap">

                        <button
                            className={`btn ${selectedCats === "" ? "bg-blue-600 text-white" : ""}`}
                            onClick={() => setSelectedCats("")}
                        >
                            All
                        </button>

                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`btn ${selectedCats === filter ? "bg-blue-600 text-white" : ""}`}
                                onClick={() => setSelectedCats(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* SEARCH BAR */}
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search posts..."
                        className="input input-bordered w-full max-w-md mt-4"
                    />

                    {/* POSTS */}
                    {blogs && success ? 
                        (
                            blogs.map((blog, index) =>
                                user && user.role === "admin" ? (
                                    <Card
                                        key={index}
                                        blogId={blog._id}
                                        image={blog.image}
                                        time={new Date(blog.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                        title={blog.title}
                                        description={blog.description}
                                        cat={blog.cat}
                                    />
                                ) : (
                                    <UserCard
                                        key={index}
                                        blogId={blog._id}
                                        image={blog.image}
                                        time={new Date(blog.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                        title={blog.title}
                                        description={blog.description}
                                        cat={blog.cat}
                                    />
                                )
                            )
                        ) : (
                                <h1 className="text-[#080808] ">{msg || "Error loading posts"}</h1>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AllPosts;
