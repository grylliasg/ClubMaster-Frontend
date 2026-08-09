import { Button, Card, CardContent, Container, Snackbar, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function TeamDetailsPage() {

    const { name } = useParams() // take the var name from the url
    const navigate = useNavigate()

    const [team, setTeam] = useState(null)
    const [error, setError] = useState("")

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
        if (!error) {
            return
        }

        const timer = setTimeout(() => {
            navigate("/teams")
        }, 2000)

        return () => clearTimeout(timer)
    }, [error, navigate])

    return (
        <>
            {team ? <Container>
                <Card>
                    <CardContent>
                        <Typography variant="h4">{team.name}</Typography>
                        <Typography variant="body1">{team.country}</Typography>
                        <Button variant="contained" onClick={handleDelete}>Delete Team</Button>
                    </CardContent>
                </Card>
            </Container> :

                <p>Loading...</p>}

            <Snackbar open={!!error} message={error} ></Snackbar>

        </>

    )
}

export default TeamDetailsPage