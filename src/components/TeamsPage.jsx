import { useEffect, useState } from "react"
import TeamCard from "./TeamCard"
import axios from "axios"
import { Container, Grid, Typography } from "@mui/material"

function TeamsPage() {

    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

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