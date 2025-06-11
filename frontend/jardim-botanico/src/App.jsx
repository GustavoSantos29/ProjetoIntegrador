import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AnimalCreateFormPage from "./pages/AnimalPages/CreatePage/AnimalCreateFormPage.jsx";
import AnimalViewPage from './pages/AnimalPages/AnimalView/AnimalViewPage.jsx';
import AnimalListPage from './pages/AnimalPages/ListPage/AnimalListPage.jsx';
import AnimalEditPage from './pages/AnimalPages/AnimalEdit/AnimalEditPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthContext/AuthProvider.jsx';


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/animal/:id" element={<AnimalViewPage />} />

        
        {/* Rotas privadas */}
        <Route path="/" element={
          <PrivateRoute>
          <AnimalListPage />
          </PrivateRoute>
        } />
        
        <Route path="/create" element={
          <PrivateRoute>
            <AnimalCreateFormPage />
          </PrivateRoute>} />

        <Route path="/animal/edit/:id" element={
          <PrivateRoute>
          <AnimalEditPage />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
