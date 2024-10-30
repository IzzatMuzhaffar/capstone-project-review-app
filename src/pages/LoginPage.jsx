import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function LoginPage() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    // useEffect(() => {
    //     if (authToken) navigate("/home")
    // }, [authToken, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user) // remove before deploy
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
            });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user) // remove before deploy
                setAuthToken(user.accessToken)
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
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
                            <Form.Group>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} className="mb-2" style={{ width: "400px" }} />
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" value={password} className="mb-3" style={{ width: "400px" }} />
                            </Form.Group>
                        </div>
                        <Button variant="secondary" className='rounded-pill me-2' style={{ width: "150px" }} type='submit' onClick={handleSignUp}>Sign Up</Button>
                        <Button variant="secondary" className='rounded-pill me-2' style={{ width: "150px" }} type='submit' onClick={handleLogin}>Log In</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
