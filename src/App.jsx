import TeamsPage from "./components/team/TeamsPage.jsx"
import TeamDetailsPage from "./components/team/TeamDetailsPage.jsx"
import EditTeamPage from "./components/team/EditTeamPage.jsx"
import PlayerDetailsPage from "./components/player/PlayerDetailsPage.jsx"
import EditPlayerPage from "./components/player/EditPlayerPage.jsx"
import CreatePlayerPage from "./components/player/CreatePlayerPage.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateTeamPage from "./components/team/CreateTeamPage.jsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/teams" element={<TeamsPage />}></Route>
                <Route path="/teams/:name" element={<TeamDetailsPage />} />
                <Route path="/teams/new" element={<CreateTeamPage />} />
                <Route path="/teams/:teamName/edit" element={<EditTeamPage />} />
                <Route path="/players/:id" element={<PlayerDetailsPage />} />
                <Route path="/players/:id/edit" element={<EditPlayerPage />} />
                <Route path="/players/new" element={<CreatePlayerPage />} />
            </Routes>
        </BrowserRouter>
        
    )
}

export default App