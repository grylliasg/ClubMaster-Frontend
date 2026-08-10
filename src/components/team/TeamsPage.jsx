import { useEffect, useState } from "react"
import TeamCard from "./TeamCard"
import axios from "axios"
import { Button, Container, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function TeamsPage() {

    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await axios.get("http://localhost:8080/teams")
                setTeams(response.data)
            }
            catch {
                setError("Failed to load teams")
            }
            finally {
                setLoading(false)
            }
        }

        fetchTeams()
    }, [])

    return (
        loading ? <p>Loading Teams...</p> :
            error ? <p>{error}</p> :
                <Container>
                    <Typography variant="h4">Teams</Typography>
                    <Button variant="contained" size="small" onClick={() => navigate("/teams/new")}>Add Team</Button>
                    <Grid container>
                        {teams.map((team) => (
                            <Grid item xs={12} sm={6} key={team.id}>
                                <TeamCard
                                    team={team}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
    )
}

export default TeamsPage