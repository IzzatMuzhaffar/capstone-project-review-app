import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function LoginPage() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    useEffect(() => {
        if (authToken) {
            navigate("/")
        }
    }, [authToken, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up then login
                const user = userCredential.user;
                console.log(user)
                setMessage("Sign up successful!")
                setTimeout(() => { setAuthToken(user.accessToken) }, 1500)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
                setMessage(`Error: ${errorCode}`)
            });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Logged in & display message
                const user = userCredential.user;
                console.log(user)
                setMessage("Log in successful!")
                setTimeout(() => { setAuthToken(user.accessToken) }, 1500)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
                setMessage(`Error: ${errorCode}`)
            });
    }

    return (
        <div style={{
            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/capstone-project-bf495.appspot.com/o/productImages%2Flanding-page2%20-%20final%20edit.jpg?alt=media&token=4b182d17-e656-4023-a29f-8000bd412190)",
            backgroundSize: "cover",
            minHeight: "100vh"
        }}
        >
            <div className="d-flex justify-content-center align-items-center color-overlay" style={{ height: "90vh" }}>
                <div className="singleCol container text-center">
                    <Form>
                        <h1 className="mb-3">Welcome to Gege Gaming Reviews!</h1>
                        <p style={{ fontSize: "24px" }}><i>Please log in to continue.</i></p>
                        <div className="d-flex justify-content-center">
                            <Form.Group className="login-form">
                                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} className="mb-2" />
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" value={password} className="mb-3" />
                            </Form.Group>
                        </div>
                        <Button variant="secondary" className='rounded-pill me-2' style={{ width: "150px" }} type='submit' onClick={handleSignUp}>Sign Up</Button>
                        <Button variant="secondary" className='rounded-pill me-2' style={{ width: "150px" }} type='submit' onClick={handleLogin}>Log In</Button>
                    </Form>
                    <p className="login-message"><strong>{message}</strong></p>
                </div>
            </div>
        </div>
    )
}
