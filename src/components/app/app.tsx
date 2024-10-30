import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  AppHeader,
  OrderInfo,
  IngredientDetails,
  BurgerConstructor
} from '@components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { Modal } from '../modal';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { ingredientThunk, closeModal } from '../../services/slices/ingredient';

const App = () => {
  console.log(process.env.BURGER_API_URL);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ingredientThunk());
  }, [dispatch]);
  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order Information' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Ingredient Details'
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Order Information' onClose={() => {}}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
