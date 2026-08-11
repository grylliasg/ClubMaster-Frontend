import { Button, Card, CardContent, Container, Grid, Snackbar, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"

function PlayerDetailsPage() {

    const navigate = useNavigate()

    const location = useLocation()
    const player = location.state.player

    const [error, setError] = useState("")

    const handleDelete = () => {

        async function deletePlayer() {
            try {
                await api.delete(`/players/${player.id}`)
                navigate(`/teams/${player.team.name}`)
            }
            catch {
                setError("Failed to delete player")
            }
        }

        deletePlayer()
    }

    return (
        <>
            <Container>
                <Grid item xs={12}>
                    <Card>
                        <Button variant="outlined" onClick={() => navigate(`/teams/${player.team.name}`)}>Back to team</Button>
                        <CardContent>
                            <Typography variant="h4">{player.firstName} {player.lastName}</Typography>
                            <Typography variant="body1">{player.position}</Typography>
                            <Typography variant="body1">{player.dateOfBirth}</Typography>
                            <Button variant="contained" onClick={() => navigate(`/players/${player.id}/edit`, { state: { player } })}>Edit Player</Button>
                            <Button variant="outlined" color="error" onClick={handleDelete}>Delete Player</Button>
                        </CardContent>
                    </Card>
                </Grid>

            </Container>


            <Snackbar open={!!error} message={error} ></Snackbar>

        </>

    )
}

export default PlayerDetailsPage