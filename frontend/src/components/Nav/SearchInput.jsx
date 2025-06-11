
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import APIAdmin from "../../APIAdmin";
import { toast } from "react-toastify";
APIAd

const SearchInput = () => {

  const navigate = useNavigate();

  const handleSearch = async (search) => {
    
    try {
      const res = await APIAdmin.get('/', search);

      if(res.data.success){
        toast.
      }

    } catch (error) {
      
    }
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[100%] transition-all duration-500">
        <label className="input relative w-96 shadow-md">
        <Search className="h-[1em] opacity-50"/>

        <input  
                onClick={navigator()}
                type="search" 
                className=" grow outline-none" placeholder="Search" />
        </label>
    </div>
  )
}

export default SearchInput