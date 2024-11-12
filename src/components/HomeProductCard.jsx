import { Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function HomeProductCard({ productId, name, imageUrl, specs, pros }) {
    const navigate = useNavigate()

    const handleShowProduct = () => {
        navigate(`/products/product/${productId}`)
    }

    return (
        <div key={productId} className='d-flex flex-row my-2'>
            <Col xs={4} md={4} className='me-3'>
                <Image src={imageUrl} style={{ width: "100%", minHeight: "200px" }} />
            </Col>
            <Col>
                <p style={{ fontSize: "18px" }}><strong>{name}</strong></p>
                <p>{specs}</p>
                <p>{pros}</p>
                <a onClick={handleShowProduct} style={{ color: "red" }}>See more ...</a>
            </Col>
        </div>
    )
}
Image