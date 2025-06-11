
import { useEffect, useState } from 'react'
import APIAdmin from '../../APIAdmin';
import BlogCard from './BlogCard';


const AllPost = () => {

    const [blogs, setBlogs] = useState([]);
    const [filters, setFilters] = useState([]);


    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await APIAdmin.get('/', { withCredentials: true });
            if (res.data.blogs) {
                setBlogs(res.data.blogs);
                const allCategories = [...new Set(res.data.blogs.map(blog => blog.cat))];
                setFilters(allCategories);
            } else {
                setBlogs([]);
            }
        };
        fetchBlogs();
    }, []);

    return (

        <>
            { blogs && blogs?.length > 0 ? (
                <div className="w-full  max-w-6xl mx-auto grid gap-y-32 gap-x-8 lg:grid-cols-3 md:grid-cols-2 bg-[var(--bg-color)] text-[var(--text-color)] ">

                    { blogs.map((blog, index) => (
                        <BlogCard
                            key={index}
                            blogId={blog._id}
                            image={blog.image}
                            time={new Date(blog.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                            title={blog.title}
                            description={blog.description}
                            cat={blog.cat}
                        />

                    ))}

                </div>
            ) : (
                <span className="w-full text-center">
                    <p className="text-2xl">
                        No posts available for this category.
                    </p>
                </span>
            )}
        </>

    )
}

export default AllPost