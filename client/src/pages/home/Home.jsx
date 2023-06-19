import "./home.css"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import bigBangEvent from "./16560525669103 1.png"
import jackpot from "./165606573680024 1.png"
import roulette from "./OIP - 2022-07-01T115102 1.png"
import poker from "./d02b36a842455d576d33d24f50ecf458 1.png"
import rummy from "./OIP - 2022-07-29T090326 1.png"
import dice from "./Screenshot (72) 1.png"
import bomb from "./Screenshot (70) 5.png"
import gorilla from "./Screenshot (70) 2.png"
import fox from "./Screenshot (70) 1.png"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import UserInfoPopup from "../../components/userInfoPopup/UserInfoPopup"
import { refresh } from '../../apiCalls';
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { addReviewCall } from "../../apiCalls"
import { ThemeContext } from "../../context/ThemeContext";
import Footer from "../../components/footer/Footer"
import axios from "axios"
import { display } from "@mui/system"
import { ClientThemeContext } from "../../context/ClientThemeContext"

export default function Home() {

    const { theme } = useContext(ThemeContext)

    const { clientTheme } = useContext(ClientThemeContext)

    const [triggerUserProfile, setTriggerUserProfile] = useState(0)
    const { user, dispatch } = useContext(AuthContext);

    const review = useRef()

    const [games, setGames] = useState(null);

    const images = [fox, gorilla, bomb]

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken")
        refresh({accessToken: null, refreshToken: refreshToken}, dispatch)
        
        // const place = Intl.DateTimeFormat().resolvedOptions().timeZone

        axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=7be0695ffefc488698b9de8d44727c64')
        .then(async (response) => {
            // console.log(response.data);
            await axios.post("/api/users/addVisit", {userId: user ? user._id : "", ipAddress: response.data.ip_address, place: JSON.stringify(response.data)})
        })
        .catch(error => {
            console.log(error);
        });

        // const addVisit = async () => {
        //     await axios.post("/api/visits/addVisit", {userId: user ? user._id : "", place: place})
        // }

        // addVisit()


        const getAllGames = async () => {
            const res = await axios.post("/api/games/getAllGames")
            setGames(res.data)
        }

        getAllGames()

    }, [])
    
    const handleAddReview = async () => {
        if(user) {
            addReviewCall({_id: user._id, review: review.current.value})
            alert("Feedback received. Thanks for taking out your time")
            review.current.value = ""
        }

        else {
            alert("Sign in and then try again")
            review.current.value = ""
        }
    }

    return (
       <>
       {triggerUserProfile == 1 ? <UserInfoPopup setTriggerUserProfile={setTriggerUserProfile} /> : ""}
       <Navbar triggerUserProfile={triggerUserProfile} setTriggerUserProfile={setTriggerUserProfile} />
            <div className={theme == 'dark' ? "homeWrapper" : "lightThemeHomeWrapper"}>
                
                <div className="homeMain">
                    <div className="homeGamesContainer1">
                        {/* <Sidebar /> */}
                        {/* <div> */}
                            {/* <img className="bigImage" src={bigBangEvent} alt="big bang event"></img>
                            <img className="smallImage" src={jackpot} alt="jackopt"></img>
                            <img className="mediumImage" src={jackpot} alt="jackpot"></img> */}
                            <div className="hotGamesContainer">
                                
                                <Link to="/game/6376d4f40ecc1185ad3c294c" style={{textDecoration: "none"}}>
                                    <div className="hotGame">
                                        <img style={{backgroundColor: "white"}} src={roulette} alt="roulette"></img>
                                        <p>Roulette</p>
                                    </div>
                                </Link>
                                
                                <Link to="/game/636e2288a5e78699c0ab8faf" style={{textDecoration: "none"}}>
                                    <div className="hotGame">
                                        <img src={poker} alt="poker"></img>
                                        <p>Poker</p>
                                    </div>
                                </Link>

                                <Link to="/game/637b305c7bbf88e92e34d735" style={{textDecoration: "none"}}>
                                    <div className="hotGame">
                                        <img src={rummy} alt="rummy"></img>
                                        <p>Rummy</p>
                                    </div>
                                </Link>
                            </div>
                        {/* </div> */}

                        {/* <div>
                            <Link to="/game/636e2288a5e78699c0ab8faf">
                                <img className="bigSquareImage" src={dice} alt="dice"></img>
                            </Link>
                        </div> */}
                        {games ? <div className="otherGamesContainer">

                            {games.map(game => {
                                return (
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                        <Link to={"/game/" + game._id}>
                                            <img className="squareImage" src={game.icon ? game.icon : images[Math.floor(Math.random() * 3)]} alt={game.name}></img>
                                        </Link>
                                        <h3 style={{backgroundColor: "black", color: "white"}}>{game.name}</h3>
                                    </div>
                                )
                            })}

                            {/* <div>
                                <Link to="/game/636e2288a5e78699c0ab8faf">
                                    <img className="squareImage" src={bomb} alt="boom bash"></img>
                                </Link>
                            </div>
                            <div>
                                <Link to="/game/636e2288a5e78699c0ab8faf">
                                    <img className="squareImage" src={gorilla} alt="banana kingdom"></img>
                                </Link>
                            </div>
                            <div>
                                <Link to="/game/636e2288a5e78699c0ab8faf">
                                    <img className="squareImage" src={fox} alt="fox plays"></img>
                                </Link>
                            </div> */}
                        </div> : ""}
                    </div>

                    {/* <div className="homeGamesContainer2">
                        <Link to="/game/636e2288a5e78699c0ab8faf">
                            <img className="bigSquareImage" src={dice} alt="dice"></img>
                        </Link>
                        <Link to="/game/636e2288a5e78699c0ab8faf">
                            <img className="squareImage" src={bomb} alt="boom bash"></img>
                        </Link>
                        <Link to="/game/636e2288a5e78699c0ab8faf">
                            <img className="squareImage" src={gorilla} alt="banana kingdom"></img>
                        </Link>
                        <Link to="/game/636e2288a5e78699c0ab8faf">
                            <img className="squareImage" src={fox} alt="fox plays"></img>
                        </Link>
                    </div> */}

                    <Footer />
                    
                </div>
            </div>
       </>
    )
}
