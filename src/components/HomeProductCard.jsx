import { Card, Col, Image } from 'react-bootstrap'

export default function HomeProductCard({ productId, name, imageUrl, specs, pros }) {
    return (
        <Card key={productId} className='d-flex flex-row my-2' href="" hover>
            <Col md={3}>
                <Image src={imageUrl} style={{ width: "200px", height: "200px" }} />
            </Col>
            <Col className='ms-3'>
                <h3>{name}</h3>
                <p>{specs}</p>
                <p>{pros}</p>
            </Col>
        </Card>
    )
}
Image