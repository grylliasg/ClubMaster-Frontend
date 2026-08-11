import { Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api"

function CreateTeamPage() {

    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            await api.post("/teams",
                {
                    name: name,
                    country: country
                })

            navigate("/teams")
        }
        catch {
            setError("Failed to create team")
        }
    }

    return (
        <Container>
            <Button variant="outlined" onClick={() => navigate(`/teams`)}>Back to teams</Button>
            <Typography variant="h4">
                Create Team
            </Typography>

            <TextField
                label="Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit}>
                Create Team
            </Button>

            <Snackbar open={!!error} message={error} ></Snackbar>
        </Container>


    )
}

export default CreateTeamPage