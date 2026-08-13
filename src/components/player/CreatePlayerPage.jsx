import { Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"


function CreatePlayerPage() {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [position, setPosition] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    const location = useLocation()
    const team = location.state.team

    const handleSubmit = () => {

        async function addPlayer() {
            try {
                const response = await api.post("/players",
                    {
                        firstName: firstName,
                        lastName: lastName,
                        position: position,
                        dateOfBirth: dateOfBirth,
                        team: team
                    }
                )

                navigate(`/teams/${team.name}`)
            }
            catch (err) {
                setError(err.response?.data || "Something went wrong")
            }
        }

        addPlayer()
    }

    return (
        <Container>
            <Button variant="outlined" onClick={() => navigate(`/teams/${team.name}`)}>Back to team</Button>
            <Typography variant="h4">
                Add Player
            </Typography>

            <TextField
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
                label="Position"
                onChange={(e) => setPosition(e.target.value)}
            />

            <TextField
                label="Date Of Birth"
                onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>

            <Snackbar open={!!error} message={error} ></Snackbar>
        </Container>
    )

}

export default CreatePlayerPage