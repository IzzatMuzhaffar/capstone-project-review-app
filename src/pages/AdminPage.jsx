import { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import NewProductModal from '../components/NewProductModal'
import AdminProductCard from '../components/AdminProductCard'
import { ADMIN_ID } from '../components/AdminId'
import { BASE_URL } from '../components/BaseUrl'

export default function AdminPage() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [products, setProducts] = useState([])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // check if user is admin
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.user_id
        if (userId === ADMIN_ID) {
            fetchProducts()
        } else {
            navigate("/home") // return to homepage if not admin
        }
    }, [navigate])

    const fetchProducts = () => {
        fetch(`${BASE_URL}/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error:", error))
    }

    return (
        <div className="bg-light" style={{ minHeight: "100vh" }}>
            <Row className='justify-content-center'>
                <Col md={9} className="d-flex flex-column">
                    <div className='py-3 mb-2' style={{ borderBottom: "1px solid" }}>
                        <h2 className="d-flex flex-row justify-content-center"><i>Admin Panel</i></h2>
                        <div className="d-flex flex-row justify-content-center">
                            <Button variant='secondary' style={{ width: "200px", borderRadius: "10px" }} onClick={handleShow}>Add new product</Button>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                        {products.map((product) => (
                            <AdminProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </Col>
            </Row>
            <NewProductModal show={show} handleClose={handleClose} />
        </div>
    )
}
