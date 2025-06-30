import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AnimalCreateFormPage from './pages/AnimalPages/CreatePage/AnimalCreateFormPage.jsx';
import AnimalViewPage from './pages/AnimalPages/AnimalView/AnimalViewPage.jsx';
import AnimalListPage from './pages/AnimalPages/ListPage/AnimalListPage.jsx';
import AnimalEditPage from './pages/AnimalPages/AnimalEdit/AnimalEditPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import UserListPage from './pages/UsersPages/UserList/UserListPage.jsx';
import UserCreateFormPage from './pages/UsersPages/UserCreate/UserCreateFormPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthContext/AuthProvider.jsx';
import UserEditPage from './pages/UsersPages/UserEdit/UserEditPage.jsx';
import UserViewPage from './pages/UsersPages/UserView/UserViewPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Rotas públicas */}
                <Route path='/login' element={<LoginPage />} />
                <Route path='/animal/:id' element={<AnimalViewPage />} />
                <Route path='/' element={<HomePage />} />

                {/* Rotas privadas */}
                <Route
                    path='/animais'
                    element={
                        <PrivateRoute>
                            <AnimalListPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='users/'
                    element={
                        <PrivateRoute>
                            <UserListPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='user/:id'
                    element={
                        <PrivateRoute>
                            <UserViewPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='user/create'
                    element={
                        <PrivateRoute>
                            <UserCreateFormPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='user/edit/:id'
                    element={
                        <PrivateRoute>
                            <UserEditPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='animal/create'
                    element={
                        <PrivateRoute>
                            <AnimalCreateFormPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='animal/edit/:id'
                    element={
                        <PrivateRoute>
                            <AnimalEditPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
