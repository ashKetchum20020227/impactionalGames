import './App.css';
import Home from "./pages/home/Home"
import Game from './pages/game/Game';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from "axios"
import { refresh } from './apiCalls';
import { ThemeContext } from "./context/ThemeContext"
import GlobalSettings from './pages/globalSettings/GlobalSettings';
import { ClientThemeContext } from './context/ClientThemeContext';

function App() {

    const { user, dispatch } = useContext(AuthContext);

    const { clientTheme, setClientTheme } = useContext(ClientThemeContext)
    
    useEffect(() => {

        const getClientTheme = async () => {
            const res = await axios.post("/api/themes/getTheme")
            // alert(res.data.name)
            console.log(res.data)
            setClientTheme(res.data.name)
        }

        getClientTheme()

    }, [])

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/game/:gameId" element={user ? <Game /> : <Navigate to="/" />} />
                    <Route path="/globalSettings" element={user ? <GlobalSettings /> : <Navigate to="/" />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
