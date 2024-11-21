import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function HomeNavbarModal({ show, handleClose, handleLogout, showAdmin }) {
    const navigate = useNavigate()

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className='menu-item' onClick={() => { navigate("/"); handleClose() }}>Home</div>
                <div className='menu-item' onClick={() => { navigate("/products/product/5"); handleClose() }}>Headphones</div>
                <div className='menu-item' onClick={() => { navigate("/products/product/6"); handleClose() }}>Microphones</div>
                <div className='menu-item' onClick={() => { navigate("/products/product/9"); handleClose() }}>Keyboards</div>
                <div className='menu-item' onClick={() => { navigate("/products/product/10"); handleClose() }}>Monitors</div>
                {showAdmin ?
                    <div className='menu-item' onClick={() => { navigate("/admin"); handleClose() }}>Admin</div> : <></>
                }
                <div className='menu-item' onClick={handleLogout}>Logout</div>
            </Modal.Body>
        </Modal>
    )
}
