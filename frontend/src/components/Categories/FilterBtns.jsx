
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import APIAdmin from '../../Axios/APIAdmin';

const FilterBtns = () => {

      // Filtering
    const [filters, setFilters] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [selectedCats, setSelectedCats] = useState("");

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await APIAdmin.get(`/?category=${selectedCats}`);
                if(res.data.success){
                    setBlogs(res.data.blogs);
                    
                    const allCategories = [...new Set(res.data.blogs.map(blog => blog.cat))];
                    setFilters(allCategories);
                }

            } catch (error) {
                if (error.response?.status === 401) {
                    toast.info("Not authorized! Please login.");
                }
            }
        };
        getPosts();
    }, []);

    return (

         <> {/*     FILTERS      */}
            <div className="w-full max-w-6xl flex gap-x-2.5">
            {filters && filters.length > 0 && filters.map((filter) => (
                <button
                key={filter}
                className="btn"
                onClick={() => setSelectedCats(filter)}
                >
                {filter}
                </button>
            ))}
            </div>
        </>  
    )
}

export default FilterBtns