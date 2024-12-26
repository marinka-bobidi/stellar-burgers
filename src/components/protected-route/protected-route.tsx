import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteType = {
  children: React.ReactElement;
  anonymous?: boolean;
};

export const ProtectedRoute = ({
  children,
  anonymous = false
}: ProtectedRouteType) => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const user = useSelector((state) => state.authentication.user);
  if (user.name !== '' && user.email !== '' && anonymous) {
    return <Navigate to={from} />;
  } else if (user.name === '' && user.email === '' && !anonymous) {
    return <Navigate to='/login' state={{ from: location }} />;
  } else {
    return children;
  }
};
