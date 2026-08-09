import { Button, Card, CardContent, Container, Grid, Snackbar, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function TeamDetailsPage() {

    const { name } = useParams() // take the var name from the url
    const navigate = useNavigate()

    const [team, setTeam] = useState(null)
    const [error, setError] = useState("")
    const [players, setPlayers] = useState([])

    const handleDelete = () => {
        async function deleteTeam() {
            try {
                await axios.delete(`http://localhost:8080/teams/${team.id}`)

                navigate("/teams")
            }
            catch {
                setError("Failed to delete team")
            }
        }

        deleteTeam()
    }

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await axios.get(`http://localhost:8080/teams/${name}`)
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
                const playersResponse = await axios.get(`http://localhost:8080/players/${name}`)
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
                            <CardContent>
                                <Typography variant="h4">{team.name}</Typography>
                                <Typography variant="body1">{team.country}</Typography>
                                <Button variant="contained" onClick={handleDelete}>Delete Team</Button>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                Players
                            </Typography>

                            <Grid container spacing={4}>
                                {players.map((player) => (
                                    <Grid item xs={12} sm={6} md={4} key={player.id}>
                                        <Card>
                                            <CardContent>
                                                <Link to={`/players/${player.id}`} state={{player}} variant="h6">
                                                    {player.firstName} {player.lastName}
                                                </Link>

                                                <Typography variant="body1">
                                                    {player.position}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Container> :

                <p>Loading...</p>}

            <Snackbar open={!!error} message={error} ></Snackbar>

        </>

    )
}

export default TeamDetailsPage