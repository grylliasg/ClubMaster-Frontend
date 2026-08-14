import {Card, CardContent, Container, Typography} from "@mui/material"
import {Link} from "react-router-dom"

function TeamCard({team}) {
    
    return (
        <Card sx={{width: 200, height: 90, display: "flex", flexDirection: "column"}}>
            <CardContent>
            <Link to={`/teams/${team.name}`}><Typography variant="h5">{team.name}</Typography></Link>
            <Typography>{team.country}</Typography>
            </CardContent>
        </Card>
    )
}

export default TeamCard