

import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthApi";




function Logout(){

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const logout = () => {
        // Make a request to the backend to logout and clear token
        axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                toast.dark("Logout Successfully");
                navigate("/login"); 
        }); // Clear user state
    };

    

return(
    <div>
    { user &&
        <div className="cercle relative w-10 h-10 mr-24 flex  items-center justify-center text-xl font-bold bg-[var(--bg-color)] text-[var(--text-color)] gap-4 ">
            <div className="dropdown dropdown-end">

                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-13 h-13">
                        <div className="w-16 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.image || "/default-avatar.png"} />
                        </div>
                    </div>
                
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li className=" sm:hidden">
                            <Link to="/home" className="justify-between">
                                Home
                            </Link>
                        </li>
                        <li className=" sm:hidden">
                            <Link to="all-posts" className="justify-between">
                                All Posts
                            </Link>
                        </li>
                        <li className=" sm:hidden">
                            <Link to="/about" className="justify-between">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/settings" className="justify-between">
                                Settings
                            </Link>
                        </li>
                        { user.role === "admin" ? (
                            <li>
                            <Link to="/create-post" className="justify-between">
                                Create Post
                            </Link>
                            </li>
                        ) : (
                            ''
                        )}
                        <li><a onClick={logout}>Logout</a></li>
                    </ul>
                

            </div>

        </div>
    }
    </div>
)
};

export default Logout