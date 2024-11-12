import { Col, Row } from 'react-bootstrap'

export default function ProductReviewCard({ review, recommend, date }) {
    const postDate = new Date(date);

    // Get day, month, and year
    const day = String(postDate.getDate()).padStart(2, '0');
    const month = String(postDate.getMonth() + 1).padStart(2, '0');
    const year = postDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div className="bg-light d-flex flex-row mb-3 px-2 py-3">
            <Col xs={2} md={2}><i className="bi bi-person-square d-flex flex-column justify-content-start" style={{ fontSize: "70px" }}></i></Col>
            <Col className="d-flex flex-column">
                <Row>
                    {recommend ?
                        <div className="d-flex flex-row">
                            <i className="bi bi-hand-thumbs-up-fill" style={{ fontSize: "30px" }}></i>
                            <p className='ms-2 mt-2' style={{ fontSize: "18px" }}>Recommended</p>
                        </div>
                        :
                        <div className="d-flex flex-row">
                            <i className="bi bi-hand-thumbs-down-fill" style={{ fontSize: "30px" }}></i>
                            <p className='ms-2 mt-2' style={{ fontSize: "18px" }}>Not Recommended</p>
                        </div>
                    }
                </Row>
                <p>Posted: {formattedDate}</p>
                {review}
            </Col>
        </div>
    )
}
