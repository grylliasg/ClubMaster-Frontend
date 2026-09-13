import { Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"
import FormCard from "../FormCard"

function CreatePlayerPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [position, setPosition] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const location = useLocation()
    const team = location.state.team

    const handleSubmit = async () => {
        try {
            await api.post("/players", {
                firstName: firstName,
                lastName: lastName,
                position: position,
                dateOfBirth: dateOfBirth,
                team: team,
            })

            navigate(`/teams/${team.name}`)
        } catch (err) {
            setError(err.response?.data || "Something went wrong")
        }
    }

    return (
        <>
            <FormCard
                title="Add Player"
                onBack={() => navigate(`/teams/${team.name}`)}
                backLabel="Back to team"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <TextField
                    label="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />

                <TextField
                    label="Date Of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                />
            </FormCard>

            <Snackbar open={!!error} message={error} />
        </>
    )
}

export default CreatePlayerPage
