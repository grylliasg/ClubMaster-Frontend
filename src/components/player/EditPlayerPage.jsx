import { Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"

function EditPlayerPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const player = location.state.player

    const [firstName, setFirstName] = useState(player.firstName)
    const [lastName, setLastName] = useState(player.lastName)
    const [position, setPosition] = useState(player.position)
    const [dateOfBirth, setDateOfBirth] = useState(player.dateOfBirth)
    const [error, setError] = useState("")

    const handleSubmit = () => {
        async function editPlayer() {
            try {
                const response = await api.put(`/players/${player.id}`,
                    {
                        firstName: firstName,
                        lastName: lastName,
                        position: position,
                        dateOfBirth: dateOfBirth,
                        team: player.team
                    }
                )

                navigate(`/players/${player.id}`, { state: { player: response.data } })

            }
            catch {
                setError("Failed to edit player")
            }
        }

        editPlayer()
    }

    return (
        <Container>
            <Button variant="outlined" onClick={() => navigate(`/teams/${player.team.name}`)}>Back to team</Button>
            <Typography variant="h4">
                Edit Player
            </Typography>

            <TextField
                label="Player First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
                label="Player Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
                label="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />

            <TextField
                label="Date Of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>

            <Snackbar open={!!error} message={error} ></Snackbar>
        </Container>
    )
}

export default EditPlayerPage