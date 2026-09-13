import { useEffect, useState } from "react"
import {
    Container,
    Typography,
    Table,
    TextField,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material"
import api from "../../api"

function PlayersPage() {

    const [players, setPlayers] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [sortDirection, setSortDirection] = useState("asc")
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await api.get(`/players?page=${page}&size=5&search=${search}&sort=lastName,${sortDirection}`)
                setPlayers(response.data.content)
                setTotalPages(response.data.totalPages)
            }
            catch (err) {
                setError("Players not found")
            }
        }

        fetchPlayers()
    }, [search, page, sortDirection])

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Players
            </Typography>

            <TextField
                label="Search players"
                placeholder="Search by last name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ mb: 3, width: "350px" }}
            />

            {error && <p>{error}</p>}

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                            <TableCell onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")} sx={{ cursor: "pointer", fontWeight: "bold" }}>Last Name {sortDirection === "asc" ? "↑" : "↓"}</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Team ID</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {players.map((player) => (
                            <TableRow key={player.id}>
                                <TableCell>{player.firstName}</TableCell>
                                <TableCell>{player.lastName}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell>{player.description}</TableCell>
                                <TableCell>{player.dateOfBirth}</TableCell>
                                <TableCell>{player.teamId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginTop: "20px" }}>
                <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span style={{ margin: "0 15px" }}>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </Container>
    )
}

export default PlayersPage