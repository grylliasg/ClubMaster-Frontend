import { Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api"
import FormCard from "../FormCard"

function CreateTeamPage() {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            await api.post("/teams", {
                name: name,
                country: country,
            })

            navigate("/teams")
        } catch (err) {
            setError(err.response?.data || "Something went wrong")
        }
    }

    return (
        <>
            <FormCard
                title="Create Team"
                onBack={() => navigate("/teams")}
                backLabel="Back to teams"
                onSubmit={handleSubmit}
                submitLabel="Create Team"
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

export default CreateTeamPage
