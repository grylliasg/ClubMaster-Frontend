import { Button, Card, CardContent, Container, DialogTitle, Grid, Snackbar, Typography, Dialog, DialogContent, DialogActions } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../../api"

function TeamDetailsPage() {

    const { name } = useParams() // take the name from the URL
    const navigate = useNavigate()

    const [team, setTeam] = useState(null)
    const [error, setError] = useState("")
    const [players, setPlayers] = useState([])
    const [confirmDeletion, setConfirmDeletion] = useState(false)

    const handleDelete = () => {
        async function deleteTeam() {
            try {
                await api.delete(`/teams/${team.id}`)

                navigate("/teams")
            }
            catch (err) {
                if (err.response?.status === 403) {
                    setError("You do not have the permission to perform this action")
                } else {
                    setError(err.response?.data || "Something went wrong")
                }
            }
        }

        deleteTeam()
    }

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await api.get(`/teams/${name}`)
                setTeam(response.data)
            }
            catch {
                setError("Team not found")
            }
        }

        fetchTeam()
    }, [name])

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const playersResponse = await api.get(`/players/${name}`)
                setPlayers(playersResponse.data)
            }
            catch {
                setError("Players not found")
            }
        }

        fetchPlayers()
    }, [name])

    return (
        <>
            {team ?
                <Container>
                    <Grid item xs={12}>
                        <Card>
                            <Button variant="outlined" onClick={() => navigate(`/teams`)}>Back to teams</Button>
                            <CardContent>
                                <Typography variant="h4">{team.name}</Typography>
                                <Typography variant="body1">{team.country}</Typography>
                                <Button variant="contained" onClick={() => { navigate(`/teams/${team.name}/edit`) }}>Edit Team</Button>
                                <Button variant="outlined" color="error" onClick={() => setConfirmDeletion(true)}>Delete Team</Button>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                Players
                            </Typography>
                            <Button variant="contained" onClick={() => navigate("/players/new", { state: { team } })}>Add Player</Button>
                            {players.length === 0 ? <h4>This team has no players</h4> :
                                <Grid container spacing={4}>
                                    {players.map((player) => (
                                        <Grid item xs={12} sm={6} md={4} key={player.id}>
                                            <Card>
                                                <CardContent>
                                                    <Link to={`/players/${player.id}`} state={{ player }} variant="h6">
                                                        {player.firstName} {player.lastName}
                                                    </Link>

                                                    <Typography variant="body1">
                                                        {player.position}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>}
                        </CardContent>
                    </Card>
                    <Dialog open={confirmDeletion} onClose={() => setConfirmDeletion(false)}>
                        <DialogTitle sx={{ color: "black" }}>
                            Delete Team
                        </DialogTitle>
                        <DialogContent>
                            Are you sure to delete <strong>{team.name}</strong>?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmDeletion(false)}>Cancel</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Container> :

                <p>Loading...</p>}

            <Snackbar open={!!error} message={error} ></Snackbar>

        </>

    )
}

export default TeamDetailsPage