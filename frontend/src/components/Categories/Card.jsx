
import { Delete, Edit, MoveRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import APIAdmin from '../../Axios/APIAdmin';
import { toast } from 'react-toastify';

const Card = ( { blogId, image, time, title, description, cat } ) => {

    const navigate = useNavigate();

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const handleDelete = async (postId) => {
        try {
            const res = await APIAdmin.delete(`/${postId}`, { withCredentials: true });
            if(res.data.success){
                navigate('/home');
                toast.dark('Deleted Succesfully');
            }
            
        } catch (error) {
            toast.error(error.message);
        }
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
                    <p className="flex items-center gap-4 text-sm font-light max-w-80 w-full">
                        <span>
                            {time}
                        </span>
                        <span className='font-medium border px-4 py-1 border-gray-400 rounded-full'>
                            {cat}
                        </span>
                    </p>
                    <p className="sm:max-w-80 lg:max-w-96 max-h-16 overflow-auto w-full text-gray-400 text-sm font-normal ">{stripHtml(description).slice(0, 100)}...</p>
                    <Link className="flex gap-2 hover:underline w-fit text-[var(--text-color)]" to={`/posts/${blogId}`}>
                        More Info <MoveRight />
                    </Link>
                    
                    <span className=" w-32 h-16 flex items-center justify-around ">
                        {/* Pass postId, userId, and likes to LikeButton */}
                        <Link to={`/edit-post/${blogId}`}
                            className="w-8 h-8 cursor-pointer text-white">
                            {<Edit className="text-[cadetblue] " />}
                        </Link>
                        <button 
                                className="w-8 h-8 cursor-pointer text-white"
                                onClick={() => handleDelete(blogId)}>
                            {<Delete className=' cursor-pointer' color="red"/>}
                        </button>

                    </span>

                </div>
            </div>
        </>
        
    )
}

export default Card