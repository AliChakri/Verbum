


import { useNavigate } from "react-router-dom";
import { useEffect, useState,useRef  } from "react";
import { toast } from "react-toastify";
import APIAdmin from "../../Axios/APIAdmin";
import RecentBlogs from "../../components/Home/RecentBlogs";
import AllPost from "../../components/Home/AllPost";
import { MoveRight } from "lucide-react";
import Footer from "../../components/Home/Footer";

function Home() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [msg, setMsg] = useState("");


  const postsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // GENERAL POSTS
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await APIAdmin.get(`/`, { withCredentials: true });
        if(res.data.blogs) {
          setLoading(false);
          setPosts(res.data.blogs);
        } else {
          setLoading(false)
          setPosts([]);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setLoading(false)
          navigate("/login");
          toast.info("Not authorized! Please login.");
        } else {
          setLoading(false)
          setMsg("Failed to fetch posts");
        }
      }
    };
    getPosts();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("rhombus");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <div className="w-full min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] mb-32">
        <div className="flex flex-col items-center mt-32 mx-auto px-4 bg-[var(--bg-color)] text-[var(--text-color)] ">
          <div className="w-full max-w-6xl">
            <h2 className="text-3xl font-semibold my-6">Recent Posts</h2>
          </div>

          <RecentBlogs />

          {/* View All Link */}
          <div className="w-full h-20 max-w-6xl mt-6 text-right">
            <a
              href="/all-posts"
              className="text-[#5f9ea0] text-lg font-medium hover:underline flex items-center justify-end"
            >
              View All
              <span className="ml-2">
                <MoveRight />
              </span>
            </a>
          </div>
        </div>

              {/* ###   ALL Posts     ### */}
              <div  className="w-full  flex flex-col items-center justify-center mt-16 px-4 my-8 mx-auto bg-[var(--bg-color)] text-[var(--text-color)]">

                <div className="w-full max-w-6xl">
                  <h2 className="text-3xl font-semibold my-6 bg-[var(--bg-color)] text-[var(--text-color)]">All Blog Post</h2>
                </div>

                <AllPost />

              </div>
      <Footer />
    </div>
    
  );
}

export default Home;
