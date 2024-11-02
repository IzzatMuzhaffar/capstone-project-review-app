import { useEffect, useState } from 'react'
import { Col, Nav, Navbar, Row } from 'react-bootstrap'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import ProductA from './pages/ProductA'
import ProductB from './pages/ProductB'
import useLocalStorage from 'use-local-storage'
import { ADMIN_ID } from './components/AdminId'
import { jwtDecode } from 'jwt-decode'
import ProductC from './pages/ProductC'
import ProductD from './pages/ProductD'

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


  return (
    <div style={{
      backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/capstone-project-bf495.appspot.com/o/productImages%2Flanding-page2%20-%20final%20edit.jpg?alt=media&token=4b182d17-e656-4023-a29f-8000bd412190)",
      backgroundSize: "cover",
      minHeight: "100vh"
    }}
    >
      <Row>
        <Col className="bg-danger"></Col>
        <Col md={8} className='bg-danger' >
          <Navbar>
            <Col className='d-flex flex-row justify-content-center'>
              <Nav>
                <Nav.Link href='/' style={{ color: "white", fontSize: "18px" }} className='mx-2'>
                  <i className="bi bi-house-fill"></i>
                </Nav.Link>
                <Nav.Link href='/' style={{ color: "white", fontSize: "18px" }} className='mx-2'>Best Picks</Nav.Link>
                <Nav.Link href='/products/product/5' style={{ color: "white", fontSize: "18px" }} className='mx-2'>Headphones</Nav.Link>
                <Nav.Link href='/products/product/6' style={{ color: "white", fontSize: "18px" }} className='mx-2'>Microphones</Nav.Link>
                <Nav.Link href='/products/product/9' style={{ color: "white", fontSize: "18px" }} className='mx-2'>Keyboards</Nav.Link>
                <Nav.Link href='/products/product/10' style={{ color: "white", fontSize: "18px" }} className='mx-2'>Monitors</Nav.Link>
                {showAdmin ?
                  <><Nav.Link href='/admin' style={{ color: "white", fontSize: "18px" }} className='mx-2'>Admin</Nav.Link></> : <></>
                }
                <div className='bg-secondary'>
                  <Nav.Link onClick={handleLogout} style={{ color: "white", fontSize: "18px" }} className='mx-2'>Logout</Nav.Link>
                </div>
              </Nav>
            </Col>
          </Navbar>
        </Col>
        <Col className="bg-danger"></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md={8}>
          <Outlet />
        </Col>
        <Col></Col>
      </Row>
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
          <Route path='login' element={<LoginPage />} />
          <Route path='products/product/5' element={<ProductA />} />
          <Route path='products/product/6' element={<ProductB />} />
          <Route path='products/product/9' element={<ProductC />} />
          <Route path='products/product/10' element={<ProductD />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
