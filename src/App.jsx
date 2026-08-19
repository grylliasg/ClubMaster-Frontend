import TeamsPage from "./components/team/TeamsPage.jsx"
import TeamDetailsPage from "./components/team/TeamDetailsPage.jsx"
import EditTeamPage from "./components/team/EditTeamPage.jsx"
import PlayerDetailsPage from "./components/player/PlayerDetailsPage.jsx"
import EditPlayerPage from "./components/player/EditPlayerPage.jsx"
import CreatePlayerPage from "./components/player/CreatePlayerPage.jsx"
import TransferPlayerPage from "./components/player/TransferPlayerPage.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateTeamPage from "./components/team/CreateTeamPage.jsx"
import LoginPage from "./components/LoginPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/teams" element={<ProtectedRoute><TeamsPage /></ProtectedRoute>}></Route>
                <Route path="/teams/:name" element={<ProtectedRoute><TeamDetailsPage /></ProtectedRoute>} />
                <Route path="/teams/new" element={<ProtectedRoute><CreateTeamPage /></ProtectedRoute>} />
                <Route path="/teams/:teamName/edit" element={<ProtectedRoute><EditTeamPage /></ProtectedRoute>} />
                <Route path="/players/:id" element={<ProtectedRoute><PlayerDetailsPage /></ProtectedRoute>} />
                <Route path="/players/:id/edit" element={<ProtectedRoute><EditPlayerPage /></ProtectedRoute>} />
                <Route path="/players/new" element={<ProtectedRoute><CreatePlayerPage /></ProtectedRoute>} />
                <Route path="/players/:id/transfer" element={<ProtectedRoute><TransferPlayerPage /></ProtectedRoute>} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
        
    )
}

export default App