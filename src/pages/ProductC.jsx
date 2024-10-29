import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ProductTable from "../components/ProductTable"
import ProductReviewForm from "../components/ProductReviewForm"
import { BASE_URL } from "../components/BaseUrl"
import ProductReviewCard from "../components/ProductReviewCard"

export default function ProductC() {
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [reviews, setReviews] = useState([])
    const productId = 9 // change this value for new products

    // check if user is logged in, then fetch product and reviews
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
            fetchProductById(productId)
            if (reviews) {
                fetchReviews(productId)
            }
        } else {
            navigate("/login")
        }
    }, [productId, reviews, navigate])

    const fetchProductById = (productId) => {
        fetch(`${BASE_URL}/products/product/${productId}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error:", error))
    }

    const fetchReviews = () => {
        fetch(`${BASE_URL}/reviews/product/${productId}`)
            .then((response) => response.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error("Error:", error))
    }

    return (
        <div className="d-flex justify-content-center bg-light">
            <Row>
                <Col></Col>
                <Col md={8} className="d-flex flex-column">
                    {product.map((product) => (
                        <ProductTable key={product.id}
                            name={product.name}
                            image={product.image_url}
                            specification={product.specification}
                            pros={product.pros}
                            cons={product.cons}
                            referral={product.referral_link}
                            video={product.video_url}
                            tagline={product.tagline}
                        />
                    ))}
                    {product.map((product) => (
                        <ProductReviewForm key={product.id}
                            id={product.id}
                            name={product.name}
                        />
                    ))}
                    <div className="mt-3" style={{ borderTop: "1px solid" }}>
                        <p className="mt-3" style={{ fontSize: "18px" }}><strong>READER REVIEWS FOR THIS PRODUCT</strong></p>
                    </div>
                    {reviews.map((review) => (
                        <ProductReviewCard key={review.id}
                            review={review.review}
                            recommend={review.recommend}
                            date={review.created_at}
                        />
                    ))}
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}
