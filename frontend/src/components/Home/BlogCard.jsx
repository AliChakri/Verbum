

import { Link } from 'react-router-dom'

const BlogCard = ( { blogId, image, time, title, description, cat } ) => {

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        
        <div key={blogId} className="card w-[90%] h-[400px] flex flex-col justify-between mx-12 gap-2 motion-preset-focus motion-duration-1000">

            <div>
                <img src={image}
                    className="w-full h-72 object-cover bg-center border-gray-600 shadow-2xl "
                />
            </div>

            <div>
                <p className="my-2">{time}</p>
                <h3 className="text-xl font-semibold">{title.slice(0, 29)}...</h3>
                <p className="text-sm font-light">{stripHtml(description).slice(0, 65)}...</p>
                <span className="text-xs font-medium px-3 py-1 border rounded-full bg-[var(--bg-color)] text-[var(--text-color)] w-fit my-1">
                    {cat}
                </span>
            </div>

            <div>
                <Link to={`/posts/${blogId}`}
                    className="w-fit hover:underline cursor-pointer text-[var(--text-color)]"
                >
                    More Info
                </Link>
            </div>
        </div>

    )
}

export default BlogCard