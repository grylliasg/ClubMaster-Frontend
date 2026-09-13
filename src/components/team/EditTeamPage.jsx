import { Snackbar, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api"
import FormCard from "../FormCard"

function EditTeamPage() {
    const { teamName } = useParams()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [id, setId] = useState()

    const handleSubmit = async () => {
        try {
            await api.put(`/teams/${id}`, {
                name: name,
                country: country,
            })

            navigate("/teams")
        } catch {
            setError("Failed to edit team")
        }
    }

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await api.get(`/teams/${teamName}`)

                setName(response.data.name)
                setCountry(response.data.country)
                setId(response.data.id)
            } catch {
                setError("Failed to fetch team")
            }
        }

        fetchTeam()
    }, [teamName])

    return (
        <>
            <FormCard
                title="Edit Team"
                onBack={() => navigate(`/teams/${teamName}`)}
                backLabel="Back to team"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Team Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <TextField
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </FormCard>

            <Snackbar open={!!error} message={error} />
        </>
    )
}

export default EditTeamPage
