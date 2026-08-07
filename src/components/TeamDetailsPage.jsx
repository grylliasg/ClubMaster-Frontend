import { Card, CardContent, Container, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function TeamDetailsPage() {

    const {name} = useParams() // take the var name from the url

    const [team, setTeam] = useState(null)

    useEffect(() => {
        async function fetchTeam() {
            const response = await axios.get(`http://localhost:8080/teams/${name}`)
            setTeam(response.data)
        }

        fetchTeam()
    }, [name])

    return (
        !team ? <p>Loading...</p> :
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{team.name}</Typography>
                    <Typography variant="body1">{team.country}</Typography>
                </CardContent>
            </Card>
        </Container>
    )
}

export default TeamDetailsPage