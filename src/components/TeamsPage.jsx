import { useEffect, useState } from "react"
import TeamCard from "./TeamCard"
import axios from "axios"

function TeamsPage() {

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

    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    return (
        loading ? <p>Loading Teams...</p> :
        error ? <p>{error}</p> :
        <>
            {teams.map((team) => (
                <TeamCard
                    key={team.id}
                    team={team}
                />
            ))}
        </>
    )
}

export default TeamsPage