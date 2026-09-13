import {
    Alert,
    Box,
    Button,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            })

            const token = response.data
            localStorage.setItem("token", token)
            navigate("/teams")
        } catch {
            setError("Invalid Username or Password")
        }
    }

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                background:
                    "linear-gradient(160deg, #0f172a 0%, #1e3a5f 45%, #134e4a 100%)",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 440,
                    p: { xs: 3.5, sm: 5 },
                    borderRadius: 4,
                    textAlign: "left",
                    bgcolor: "#ffffff",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
                }}
            >
                <Typography
                    variant="overline"
                    sx={{ color: "#0f766e", fontWeight: 700, letterSpacing: 1.6 }}
                >
                    ClubMaster
                </Typography>
                <Typography
                    variant="h4"
                    sx={{ mt: 0.5, mb: 1, fontWeight: 700, color: "#0f172a" }}
                >
                    Sign in
                </Typography>
                <Typography sx={{ mb: 4, color: "#64748b" }}>
                    Enter your credentials to continue
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        autoComplete="username"
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 1,
                            py: 1.4,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 700,
                            bgcolor: "#0f766e",
                            boxShadow: "none",
                            "&:hover": {
                                bgcolor: "#0d9488",
                                boxShadow: "none",
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => setError("")}
                    sx={{ width: "100%" }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default LoginPage
