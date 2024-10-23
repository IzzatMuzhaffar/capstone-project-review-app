import { getAuth } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/AuthProvider"
import HomeCarousel from "../components/HomeCarousel"
import HomeProductCard from "../components/HomeProductCard"
import { BASE_URL } from "../components/BaseUrl"

export default function HomePage() {
    const [products, setProducts] = useState([])
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

    const fetchProducts = () => {
        fetch(`${BASE_URL}/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error:", error))
    }

    useEffect(() => {
        if (currentUser) {
            fetchProducts()
        }
    }, [currentUser])

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
                    {products.map((product) => (
                        <HomeProductCard key={product.id}
                            productId={product.id}
                            name={product.name}
                            imageUrl={product.image_url}
                            specs={product.specification}
                            pros={product.pros}
                        />
                    ))}
                </Col>
                <Col>right column</Col>
            </Row>
        </Container>
    )
}
