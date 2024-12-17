import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginThunk } from '../../services/slices/auth';
import { TLoginData } from '@api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCookie, setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector((state) => state.authentication);
  const handleSubmit = (e: SyntheticEvent) => {
    const data: TLoginData = {
      email: email,
      password: password
    };
    dispatch(loginThunk(data));
    setCookie('accessToken', token.acessToken);
    setCookie('refreshToken', token.refreshToken);
    navigate('/');
    e.preventDefault();
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
