import { getAuth } from "firebase/auth"
import { useContext } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/AuthProvider"
import ProductTable from "../components/ProductTable"

export default function ProductPage() {
    const auth = getAuth()
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        navigate("/login")
    }

    const handleLogout = () => {
        auth.signOut()
    }

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <p>left column</p>
                    <Button className='rounded-pill mb-3' type='submit' onClick={handleLogout}>Log Out</Button>
                </Col>
                <Col md={8}>
                    <ProductTable />
                    <h4>User Reviews</h4>
                </Col>
                <Col>right column</Col>
            </Row>
        </Container>
    )
}
