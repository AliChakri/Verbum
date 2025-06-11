
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../Axios/api';

export const AuthContext = createContext();

const AuthApi = ({children}) => {



    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);


    useEffect(() => {

        const checkUser = async () => {
            
            try {
                const res = await API.get('/check-user', { withCredentials: true });
                if(res.data.user){
                    setUser(res.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
                console.log("Auth check error:", error?.response?.data || error.message);
            }
        }

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={
            { 
                user, setUser 
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthApi