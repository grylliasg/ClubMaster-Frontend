import { Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"
import FormCard from "../FormCard"

function EditPlayerPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const player = location.state.player

    const [firstName, setFirstName] = useState(player.firstName)
    const [lastName, setLastName] = useState(player.lastName)
    const [position, setPosition] = useState(player.position)
    const [dateOfBirth, setDateOfBirth] = useState(
        player.dateOfBirth ? String(player.dateOfBirth).slice(0, 10) : ""
    )
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        try {
            const response = await api.put(`/players/${player.id}`, {
                id: player.id,
                firstName: firstName,
                lastName: lastName,
                position: position,
                dateOfBirth: dateOfBirth,
                team: player.team,
            })

            navigate(`/players/${player.id}`, { state: { player: response.data } })
        } catch {
            setError("Failed to edit player")
        }
    }

    return (
        <>
            <FormCard
                title="Edit Player"
                onBack={() => navigate(`/teams/${player.team.name}`)}
                backLabel="Back to team"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Player First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <TextField
                    label="Player Last Name"
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

export default EditPlayerPage
