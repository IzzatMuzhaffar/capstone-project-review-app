import { getAuth } from "firebase/auth"
import { useContext } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/AuthProvider"
import HomeCarousel from "../components/HomeCarousel"

export default function HomePage() {
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
                <h1>Welcome!</h1>
                <Button className='rounded-pill mb-3' type='submit' onClick={handleLogout}>Log Out</Button>
            </Row>
            <Row>
                <p>product carousel left to right</p>
                <HomeCarousel />
            </Row>
            <Row>
                <Col>left column</Col>
                <Col md={6}>show popular reviews</Col>
                <Col>right column</Col>
            </Row>
        </Container>
    )
}
