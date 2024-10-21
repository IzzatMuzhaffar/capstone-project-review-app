import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function LoginPage() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) navigate("/home")
    }, [currentUser, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
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
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
            });
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} />
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" value={password} />
                </Form.Group>
                <Button className='rounded-pill mb-3' type='submit' onClick={handleSignUp}>Sign Up</Button>
                <Button className='rounded-pill mb-3' type='submit' onClick={handleLogin}>Log In</Button>
            </Form>
        </div>
    )
}
