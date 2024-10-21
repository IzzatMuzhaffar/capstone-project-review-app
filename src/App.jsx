import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './components/AuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
