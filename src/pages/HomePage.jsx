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
    console.log(`User UID: ${currentUser.uid}`)

    if (!currentUser) {
        navigate("/login")
    }

    const handleLogout = () => {
        auth.signOut()
    }

    return (
        <Container>

            <Row>
                <Col>
                    <p>left column</p>
                    <Button className='rounded-pill mb-3' type='submit' onClick={handleLogout}>Log Out</Button>
                </Col>
                <Col md={8}>
                    <Row className="d-flex justify-content-center">
                        <h1>Welcome!</h1>
                    </Row>
                    <Row>
                        <HomeCarousel />
                    </Row>
                </Col>
                <Col>right column</Col>
            </Row>
        </Container>
    )
}
