import { Button, Container, Grid, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import api from "../../api"

function EditTeamPage() {

    const { teamName } = useParams()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [id, setId] = useState()

    const handleSubmit = () => {
        async function editTeam() {
            try {
                await api.put(`/teams/${id}`,
                    {
                        name: name,
                        country: country
                    }
                )

                navigate("/teams")
            }
            catch {
                setError("Failed to edit team")
            }
        }

        editTeam()
    }

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await api.get(`/teams/${teamName}`)

                setName(response.data.name)
                setCountry(response.data.country)
                setId(response.data.id)
            }
            catch {
                setError("Failed to fetch team")
            }

        }

        fetchTeam()

    }, [teamName])

    return (
        <Container>
            <Button variant="outlined" onClick={() => navigate(`/teams/${teamName}`)}>Back to team</Button>
            <Typography variant="h4">
                Edit Team
            </Typography>

            <TextField
                label="Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>

            <Snackbar open={!!error} message={error} ></Snackbar>
        </Container>
    )
}

export default EditTeamPage