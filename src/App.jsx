import { useEffect, useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import { jwtDecode } from 'jwt-decode'
import { ADMIN_ID } from './components/AdminId'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import ProductA from './pages/ProductA'
import ProductB from './pages/ProductB'
import ProductC from './pages/ProductC'
import ProductD from './pages/ProductD'
import HomeNavbarModal from './components/HomeNavbarModal'

export function Layout() {
  const navigate = useNavigate()

  // check if user has logged in
  const [authToken, setAuthToken] = useLocalStorage("authToken", "")

  useEffect(() => {
    if (!authToken) {
      navigate("/login")
    }
  }, [authToken, navigate])

  const handleLogout = () => {
    setAuthToken("")
  }

  // check if user is admin
  const [showAdmin, setShowAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id
    if (userId === ADMIN_ID) {
      setShowAdmin(true)
    }
  }, [setShowAdmin])

  // navbar behaviour for smaller screen
  const [showNavbarModal, setShowNavbarModal] = useState(false)

  const handleShowNavbarModal = () => setShowNavbarModal(true)
  const handleCloseNavbarModal = () => setShowNavbarModal(false)

  return (
    <div style={{
      backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/capstone-project-bf495.appspot.com/o/productImages%2Flanding-page2%20-%20final%20edit.jpg?alt=media&token=4b182d17-e656-4023-a29f-8000bd412190)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%"
    }}
    >
      <Nav className='navbar'>
        <div className='side-column'></div>
        <a href='/' className='nav-item'>
          <i className="bi bi-house-fill"></i>
        </a>
        <a className='nav-item' href='/products/product/5'>Headphones</a>
        <a className='nav-item' href='/products/product/6'>Microphones</a>
        <a className='nav-item' href='/products/product/9'>Keyboards</a>
        <a className='nav-item' href='/products/product/10'>Monitors</a>
        {showAdmin ?
          <><a href='/admin' className='nav-item'>Admin</a></> : <></>
        }
        <a onClick={handleLogout} className='nav-item'>Logout</a>
        <i className="bi bi-list nav-button" onClick={handleShowNavbarModal}></i>
        <div className='side-column'></div>
      </Nav>
      <HomeNavbarModal show={showNavbarModal} handleClose={handleCloseNavbarModal} handleLogout={handleLogout} showAdmin={showAdmin} />
      <Container>
        <Row>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='admin' element={<AdminPage />} />
          <Route path='products/product/5' element={<ProductA />} />
          <Route path='products/product/6' element={<ProductB />} />
          <Route path='products/product/9' element={<ProductC />} />
          <Route path='products/product/10' element={<ProductD />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
