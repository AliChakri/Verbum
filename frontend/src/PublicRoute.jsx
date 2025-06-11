
import { useContext } from 'react'
import { AuthContext } from './context/AuthApi'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {

    const { user } = useContext(AuthContext);

    return user ? <Navigate to="/home" replace /> : <Outlet /> ;
}

export default PublicRoute