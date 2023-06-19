import "./playerinfopopup.css"
import CloseIcon from '@material-ui/icons/Close';
import gorilla from "../../Assets/Screenshot (70) 2.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect, useContext } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

export default function PlayerInfoPopup(props) {

    const {theme} = useContext(ThemeContext)

    const { user, dispatch } = useContext(AuthContext);

    const [player, setPlayer] = useState(null)

    const handleProfileLike = async () => {
        const res = await axios.post("/api/users/likeProfile", {userId: player._id, likeId: user._id})
        setPlayer(res.data)
    }

    useEffect(() => {
        const getUser = async () => {
            // alert(props.playerId)
            const res = await axios.get("/api/users/" + props.playerId)

            if (res.data.username) {
                setPlayer(res.data)
            } else {
                alert(res.data)
            }
        }

        getUser();

    }, [])

    return (
        <>
            {player ? <div className="userInfoPopupOuter">
                <div className={theme == 'dark' ? "playerInfo userInfoPopupInner" : "playerInfo lightThemeUserInfoPopupInner"}>
                    <header>
                        <h3>User Information</h3>
                        <CloseIcon style={{cursor: "pointer", marginRight: "20px"}} onClick={() => props.setTriggerPlayerProfile(0)} />
                    </header>
                    
                    <div className="userInfoContainer">
                        <div onClick={handleProfileLike} className="profileLikes">
                            <FavoriteIcon style={player.profileLikes.includes(user._id) ? {color: "tomato"} : {color: "white"}} />
                            <p>{player.profileLikes.length}</p>
                        </div>

                        <div className="userInfo">
                            <img src={gorilla}></img>
                            {player ? <h2>{player.username}</h2> : <h2>Username</h2>}
                            {player ? <p>User Id: {player._id}</p> : <p>User Id</p>}
                        </div>
                    </div>
                

                    <div className="userFavGamesContainer">
                        <header>
                            <h2>Liked Games</h2>
                        </header>
                        {player.likedGames.length == 0 ? <div className="userFavGames">
                            <img src={"https://cdn.iconscout.com/icon/premium/png-256-thumb/no-data-found-1965030-1662565.png"}></img>
                            <p>Oops there is no data yet</p>
                        </div> : 
                        <div>
                            {player.likedGames.map((likedGame) => {
                                return (
                                <div className="userFavGame">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <img src={gorilla}></img>
                                        <h3 style={{marginLeft: "5px"}}>{likedGame.name}</h3>
                                    </div>
                                    <Link to={"/game/" + likedGame.gameId}>
                                        <button>Play Now</button>
                                    </Link>
                                </div>
                                )
                            })}
                        </div>}
                    </div>

                    <div className="userRecentGamesContainer">
                        <header>
                            <h3>History</h3>
                        </header>
                        {player.history.length == 0 ? <div className="userRecentGames">
                            <img src={"https://cdn.iconscout.com/icon/premium/png-256-thumb/no-data-found-1965030-1662565.png"}></img>
                            <p>Oops there is no data yet</p>
                        </div> : 
                        <div>
                            {player.history.map((game) => {
                                return (
                                    <div className="userFavGame">
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img src={gorilla}></img>
                                            <h3 style={{marginLeft: "5px"}}>{game.name}</h3>
                                        </div>
                                        <Link to={"/game/" + game.gameId}>
                                            <button>Play Now</button>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        }
                    </div>
                </div>
            </div> : ""}
        </>
    )
}
