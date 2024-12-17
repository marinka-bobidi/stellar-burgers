import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { userLogoutThunk } from '../../services/slices/auth';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector(
    (state) => state.authentication.refreshToken
  );
  const handleLogout = () => {
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(userLogoutThunk());
    navigate('/login');
    deleteCookie('accessToken');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
