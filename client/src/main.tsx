import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import CoursesLayout from './layouts/CoursesLayout.tsx'
import Course from './courses/Course.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<CoursesLayout />}>
        <Route path="courses/:slug" element={<Course />} />
      </Route>
    </Routes>
    </StrictMode>
  </BrowserRouter>
)
