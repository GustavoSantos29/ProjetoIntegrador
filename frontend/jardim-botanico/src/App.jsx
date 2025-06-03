import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AnimalCreateFormPage from "./pages/AnimalPages/CreatePage/AnimalCreateFormPage.jsx";
import AnimalViewPage from './pages/AnimalPages/AnimalView/AnimalViewPage.jsx';
import AnimalListPage from './pages/AnimalPages/ListPage/AnimalListPage.jsx';
import AnimalEditPage from './pages/AnimalPages/AnimalEdit/AnimalEditPage.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/create" element={<AnimalCreateFormPage />} />
      <Route path="/animal/:id" element={<AnimalViewPage />} />
      <Route path="/animal/edit/:id" element={<AnimalEditPage />} />
      <Route path="/list" element={<AnimalListPage />} />
    </Routes>
  )
}

export default App
