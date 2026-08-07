
function TeamCard({team}) {
    return (
        <div>
            <h2>{team.name}</h2>
            <p>{team.country}</p>
        </div>
    )
}

export default TeamCard