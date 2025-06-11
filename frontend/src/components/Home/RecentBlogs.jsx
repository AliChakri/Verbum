import { useEffect, useState } from 'react'
import APIAdmin from '../../APIAdmin';

const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState([]);

        const fullDate = (time) => {
            return new Date(time).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })}

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await APIAdmin.get('/', { withCredentials: true });
            if (res.data.blogs) {
                setBlogs(res.data.blogs);
                setBlogs(prev => prev.slice(0, 3));
            } else {
                setBlogs([]);
            }
        };
        fetchBlogs();
    }, []);
    


    return (
        <>
            {blogs.length > 2 ? (
                <div className="w-full min-h-[60vh] max-w-6xl grid gap-6 lg:grid-cols-2 md:grid-cols-1 ">
                    <div className="home-page w-full h-[60vh] relative ">
                        <img 
                            src={blogs[0].image}
                            className="w-full h-full object-cover shadow-lg"
                            alt="Featured Post"
                        />
                        <div className="absolute inset-0 bg-opacity-40 flex items-end p-6 text-white">
                            <div>
                                <h3 className="text-2xl font-bold">{blogs[0].title}</h3>
                                <p className="text-gray-100 text-sm">{fullDate(blogs[0].createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="two-pics grid gap-4 bg-[var(--bg-color)] text-[var(--text-color)]">
                        {[1, 2].map(i => (
                            <div key={i} className="flex gap-4 shadow-lg overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
                                <img
                                    src={blogs[i].image}
                                    className="w-44 h-full object-cover"
                                    alt={`Blog ${i}`}
                                />
                                <div className="flex flex-col justify-center gap-1.5 pr-4">
                                    <p className="text-xs text-gray-500">{fullDate(blogs[i].createdAt)}</p>
                                    <h3 className="text-lg font-semibold">{blogs[i].title}</h3>
                                    <p className="text-sm text-gray-700 line-clamp-2">{stripHtml(blogs[i].description).slice(0, 100)}...</p>
                                    <span className="text-xs font-medium px-3 py-1 border rounded-full w-fit">
                                        {blogs[i].cat}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h1 className="text-[#080808]">No Data Found</h1>
            )}
        </>
    );
};

export default RecentBlogs;
