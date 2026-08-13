import { Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"

function PlayerDetailsPage() {

    const navigate = useNavigate()

    const location = useLocation()
    const player = location.state.player

    const [error, setError] = useState("")
    const [openDialog, setOpenDialog] = useState(false)

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
                            <Button variant="outlined" color="error" onClick={() => setOpenDialog(true)}>Delete Player</Button>
                        </CardContent>
                    </Card>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle sx={{ color: "black" }}>Delete Player</DialogTitle>
                        <DialogContent>Are you sure to delete <strong>{player.firstName} {player.lastName}</strong></DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

            </Container>


            <Snackbar open={!!error} message={error} ></Snackbar>

        </>

    )
}

export default PlayerDetailsPage