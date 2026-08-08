import TeamsPage from "./components/TeamsPage"
import TeamDetailsPage from "./components/TeamDetailsPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateTeamPage from "./components/CreateTeamPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/teams" element={<TeamsPage />}></Route>
                <Route path="/teams/:name" element={<TeamDetailsPage />} />
                <Route path="/teams/new" element={<CreateTeamPage />} />
            </Routes>
        </BrowserRouter>
        
    )
}

export default App