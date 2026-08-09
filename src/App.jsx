import TeamsPage from "./components/TeamsPage"
import TeamDetailsPage from "./components/TeamDetailsPage"
import EditTeamPage from "./components/EditTeamPage"
import PlayerDetailsPage from "./components/PlayerDetailsPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateTeamPage from "./components/CreateTeamPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/teams" element={<TeamsPage />}></Route>
                <Route path="/teams/:name" element={<TeamDetailsPage />} />
                <Route path="/teams/new" element={<CreateTeamPage />} />
                <Route path="/teams/:teamName/edit" element={<EditTeamPage />} />
                <Route path="/players/:id" element={<PlayerDetailsPage />} />
            </Routes>
        </BrowserRouter>
        
    )
}

export default App