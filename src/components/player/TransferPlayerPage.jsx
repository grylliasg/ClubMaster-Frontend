import { Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"


function TransferPlayerPage() {

    const navigate = useNavigate()

    const location = useLocation()

    const player = location.state.player

    const [teams, setTeams] = useState([])
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [chosenTeam, setChosenTeam] = useState(null)

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await api.get(`/teams`)

                setTeams(response.data)
            }
            catch {
                setError("Failed to fetch teams")
            }

        }

        fetchTeams()

    }, [])

    const handleSubmit = () => {
        async function transferPlayer() {
            try {
                await api.put(`/players/transfer/${chosenTeam.id}`,
                    {
                        id: player.id,
                        firstName: player.firstName,
                        lastName: player.lastName,
                        position: player.position,
                        dateOfBirth: player.dateOfBirth,
                        team: player.team
                    })

                setSuccess(`Player transfered to ${chosenTeam.name}`)
            }
            catch {
                setError("Failed to transfer player")
            }

        }

        transferPlayer()
    }

    return (
        <Container>
            <Button variant="outlined" onClick={() => navigate(`/teams`)}>Back to teams</Button>
            <Typography sx={{ mt: 3 }} variant="h4">
                {player.firstName} {player.lastName}
            </Typography>

            <Typography sx={{ mb: 3 }} variant="h6">
                Choose Team to Transfer
            </Typography>

            {teams.map((team) => (
                <Button key={team.id} variant={chosenTeam === team ? "contained" : "outlined"} onClick={() => setChosenTeam(team)}>{team.name}</Button>
            ))}

            <Container><Button sx={{ mt: 5 }} variant="contained" onClick={handleSubmit}>
                Submit
            </Button></Container>

            <Snackbar open={!!error} message={error} ></Snackbar>
            <Snackbar open={!!success} message={success} ></Snackbar>
        </Container>
    )

}

export default TransferPlayerPage