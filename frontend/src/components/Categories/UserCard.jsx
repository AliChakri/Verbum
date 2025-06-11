

import { Link } from 'react-router-dom';

const UserCard = ( { blogId, image, time, title, description, cat } ) => {

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };


    return (

        <>
            <div key={blogId} className="w-full max-w-96 sm:max-w-none flex flex-col justify-between sm:flex-row  gap-x-4 gap-y-4 sm:gap-y-0 bg-[var(--bg-color)] text-[var(--text-color)]">
                <img 
                src={image}
                className="sm:max-w-80 md:max-w-96 max-w-[400px] w-full h-60  object-cover shadow-lg"
                alt="Featured Post"
                />
                <div className=" flex flex-col max-h-60 gap-y-2 bg-[var(--bg-color)] text-[var(--text-color)]">
                    <h3 className="sm:max-w-80 lg:max-w-96 text-xl font-bold ">{title}</h3>
                    <p className=" text-sm font-light max-w-80 w-full">{time}</p>
                    <p className="sm:max-w-80 lg:max-w-96 max-h-16 overflow-auto w-full text-gray-400 text-sm font-normal ">{stripHtml(description).slice(0, 100)}...</p>
                    <Link className="hover:underline w-fit text-[var(--text-color)]" to={`/posts/${blogId}`}>
                        More Info
                    </Link>

                </div>
            </div>
        </>

    )

}

export default UserCard