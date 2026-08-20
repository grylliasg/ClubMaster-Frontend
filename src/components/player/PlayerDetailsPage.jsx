import { Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import api from "../../api"

function PlayerDetailsPage() {

    const [player, setPlayer] = useState(null)
    const [error, setError] = useState("")
    const [openDialog, setOpenDialog] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    const location = useLocation()
    const playerState = location.state?.player
    const successTransfer = location.state?.success

    useEffect(() => {
        async function fetchPlayer() {
            try {
                const playerResponse = await api.get(`/players/player/${id}`)
                setPlayer(playerResponse.data)
            }
            catch (err) {
                setError(err.response?.data || "Something went wrong")
            }
        }

        if (playerState) {
            setPlayer(playerState)
        } else {
            fetchPlayer()
        }

    }, [])

    const handleDelete = () => {

        async function deletePlayer() {
            try {
                await api.delete(`/players/${player.id}`)
                navigate(`/teams/${player.team.name}`)
            }
            catch (err) {
                if (err.response?.status === 403) {
                    setError("You do not have the permission to perform this action")
                } else {
                    setError(err.response?.data || "Something went wrong")
                }
            }
        }

        deletePlayer()
    }

    if (!player) {
        return <Typography>{error}</Typography>
    } else {
        return (
            <>
                <Container>
                    <Grid item xs={12}>
                        <Card>
                            <Button variant="outlined" onClick={() => navigate(`/teams/${player.team.name}`)}>Back to team</Button>
                            <CardContent>
                                <Typography variant="h4">{player.firstName} {player.lastName}</Typography>
                                <Typography variant="overline">{player.team.name} </Typography>
                                <Button variant="outlined" color="primary" sx={{ fontSize: "0.7rem", textTransform: "none", borderRadius: 2, fontWeight: 600, px: 2, boxShadow: "none", "&:hover": { boxShadow: "none", }, }} onClick={() => navigate(`/players/${player.id}/transfer`, { state: { player } })}>Transfer</Button>
                                <Typography variant="body1">{player.position}</Typography>
                                <Typography sx={{ mb: 3 }} variant="body1">Birth Date: {player.dateOfBirth}</Typography>
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
                <Snackbar open={!!successTransfer} message={successTransfer} ></Snackbar>

            </>

        )
    }
}

export default PlayerDetailsPage