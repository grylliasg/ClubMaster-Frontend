import { Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleLogin = () => {
        async function login() {
            try {
                const response = await axios.post("http://localhost:8080/auth/login",
                    {
                        username: username,
                        password: password
                    }
                )

                const token = response.data
                localStorage.setItem("token", token)
                navigate("/teams")
            }
            catch {
                setError("Invalid Username or Password")
            }
            }


        login()
    }

    return (
        <Container>
            <Typography variant="h4">
                Login Form
            </Typography>

            <TextField
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" onClick={handleLogin}>
                Login
            </Button>

            <Snackbar open={!!error} message={error} ></Snackbar>
        </Container>
    )
}

export default LoginPage