import { Button, Card, CardContent, Container, Grid, Snackbar, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

function PlayerDetailsPage() {

    const { id } = useParams()
    const navigate = useNavigate()

    const location = useLocation()
    const player = location.state.player

    const [error, setError] = useState("")

    const handleDelete = () => {

        async function deletePlayer() {
            try {
                await axios.delete(`http://localhost:8080/players/${player.id}`)
                navigate("/teams")
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
                        <CardContent>
                            <Typography variant="h4">{player.firstName} {player.lastName}</Typography>
                            <Typography variant="body1">{player.position}</Typography>
                            <Typography variant="body1">{player.dateOfBirth}</Typography>
                            <Button variant="contained" onClick={handleDelete}>Delete Player</Button>
                        </CardContent>
                    </Card>
                </Grid>

            </Container>


            <Snackbar open={!!error} message={error} ></Snackbar>

        </>

    )
}

export default PlayerDetailsPage