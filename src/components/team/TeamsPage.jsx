import { useEffect, useState } from "react"
import TeamCard from "./TeamCard"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import api from "../../api"

function TeamsPage() {

    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await api.get("/teams")
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
                    <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
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