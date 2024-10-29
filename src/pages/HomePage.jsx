import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../components/BaseUrl"
import HomeCarousel from "../components/HomeCarousel"
import HomeProductCard from "../components/HomeProductCard"

export default function HomePage() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const fetchProducts = () => {
        fetch(`${BASE_URL}/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error:", error))
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
            fetchProducts()
        } else {
            navigate("/login")
        }
    }, [navigate])

    return (
        <div className="bg-light" style={{ minHeight: "100vh" }}>
            <Row>
                <Col></Col>
                <Col md={8} className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-center mt-4 mb-3" style={{ fontSize: "18px", borderBottom: "1px solid red" }}>
                        <p><strong>FEATURED PRODUCTS</strong></p>
                    </div>
                    <HomeCarousel products={products} />
                    <div className="d-flex flex-row justify-content-center mt-5 mb-3" style={{ fontSize: "18px", borderBottom: "1px solid red" }}>
                        <p><strong>BEST PICKS</strong></p>
                    </div>
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
                <Col></Col>
            </Row>
        </div>
    )
}
