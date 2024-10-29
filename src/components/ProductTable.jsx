import { Col, Image, Row } from 'react-bootstrap';

export default function ProductTable({ name, image, specification, pros, cons, referral, video, tagline }) {

    return (
        <div className='d-flex flex-column justify-content-center mb-3'>
            <Row className='mt-3' style={{ borderBottom: "1px solid" }}>
                <h2 className='d-flex flex-row justify-content-center mb-3'>{name}</h2>
                <p className='d-flex flex-row justify-content-center' style={{ fontSize: "18px" }}><i>{tagline}</i></p>
            </Row>
            <Row className='d-flex flex-column justify-content-center' style={{ borderBottom: "1px solid" }}>
                <Image className='my-3' src={image} style={{ width: "100%" }} />
            </Row>
            <Row className='my-3'>
                <Col md={4}>SPECIFICATIONS</Col>
                <Col>{specification}</Col>
            </Row>
            <Row className='my-3'>
                <Col md={4}>REASONS TO BUY</Col>
                <Col>{pros}</Col>
            </Row>
            <Row className='my-3'>
                <Col md={4}>REASONS TO AVOID</Col>
                <Col>{cons}</Col>
            </Row>
            <Row className='my-3'>
                <Col md={4}>TODAY&apos;S BEST DEALS</Col>
                <Col><a href={referral} target="_blank" style={{ color: "red" }}><strong>Check Shopee Malaysia</strong></a></Col>
            </Row>
            <Row className='my-3'>
                <Col md={4}>PRODUCT SHOWCASE</Col>
                <Col>
                    <div className='ratio ratio-16x9'>
                        <iframe src={video} title="YouTube video player" allowFullScreen></iframe>
                    </div>
                </Col>
            </Row>
        </div >
    )
}
