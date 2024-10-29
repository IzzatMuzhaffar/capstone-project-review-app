import axios from "axios"
import { Button, Modal } from "react-bootstrap"
import { BASE_URL } from "./BaseUrl"

export default function DeleteProductModal({ productId, show, handleClose }) {

    const handleDelete = () => {
        axios
            .delete(`${BASE_URL}/products/product/${productId}`)
            .then((response) => {
                console.log("Success:", response.data)
                handleClose()
            })
            .catch((error) => {
                console.error("Error", error)
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><strong>Are you sure? Please confirm delete.</strong></Modal.Header>
                <Modal.Body>
                    <Button
                        variant="danger"
                        className="rounded-pill"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
