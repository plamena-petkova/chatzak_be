import { useSelector } from 'react-redux';
import { Navigate, Outlet} from 'react-router-dom';


function PrivateRoutes () {

    const currentUser = useSelector((state) => state.auth.user);
  
    return (
        currentUser._id ?  <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;
