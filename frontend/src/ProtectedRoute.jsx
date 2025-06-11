
import { useContext } from 'react'
import { AuthContext } from './context/AuthApi'
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {

    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute