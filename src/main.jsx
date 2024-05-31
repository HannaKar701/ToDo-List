import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage';
import RegistrationForm from './components/Regisration form/RegistrationForm.jsx';
import Login from './components/Login/Login.jsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createHashRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/todo-list',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/registration',
        element: <RegistrationForm />,
        errorElement: <ErrorPage />,
    },
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
