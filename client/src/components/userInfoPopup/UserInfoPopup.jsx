import "./userinfopopup.css"
import CloseIcon from '@material-ui/icons/Close';
import gorilla from "../../Assets/Screenshot (70) 2.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { editUsernameCall } from "../../apiCalls";
import {Link} from "react-router-dom"
import { ThemeContext } from "../../context/ThemeContext";

export default function UserInfoPopup(props) {

    const {theme, setTheme} = useContext(ThemeContext)

    const { user, dispatch } = useContext(AuthContext);

    const [edit, setEdit] = useState(0);
    
    const newUsername = useRef()

    const handleModify = async () => {
        if (user) {
            editUsernameCall({_id: user._id, username: newUsername.current.value}, dispatch)
            setTimeout(() => {
                props.setTriggerUserProfile(0)
            }, 1000)
        }

        else {
            alert("Sign in and then try again")
            setTimeout(() => {
                props.setTriggerUserProfile(0)
            }, 100)
        }
    }

    return (
        <>
            {user ? <div className="userInfoPopupOuter">
                {edit == 0 ? <div className={theme == 'dark' ? "userInfoPopupInner" : "lightThemeUserInfoPopupInner"}>
                    <header>
                        <h3>User Information</h3>
                        <CloseIcon style={{cursor: "pointer", marginRight: "20px"}} onClick={() => props.setTriggerUserProfile(0)} />
                    </header>
                    
                    <div className="userInfoContainer">
                        <div className="profileLikes">
                            <FavoriteIcon style={{color: "tomato"}} />
                            <p>{user.profileLikes.length}</p>
                        </div>

                        <div className="userInfo">
                            <img src={gorilla}></img>
                            {user ? <h2>{user.username}</h2> : <h2>Username</h2>}
                            {user ? <p>User Id: {user._id}</p> : <p>User Id</p>}
                        </div>

                        <div className="profileEdit" onClick={() => {setEdit(1)}}>
                            <EditIcon />
                        </div>
                    </div>
                    
                    <div className="userStatsContainer">
                        <header>
                            <div style={{display: "flex", gap: "10px"}}>
                                <StackedLineChartIcon />
                                <p>Statistics</p>
                            </div>
                            <div style={{color: "#3ABE17ff"}}>Details {' >'}</div>
                        </header>

                        <div className="userStats">
                            <div className="userStat">
                                <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                                    <iconify-icon width="20" icon="fluent-emoji-flat:victory-hand"></iconify-icon>
                                    <p>Total Wins</p>
                                </div>
                                <p>0</p>
                            </div>
                            <div className="userStat">
                                <div style={{display: "flex", gap: "10px"}}>
                                    <MonetizationOnIcon style={{color: "gold", fontSize: "20px"}} />
                                    <p>Total Bets</p>
                                </div>
                                <div>
                                <p>0</p>
                                </div>
                            </div>
                            <div className="userStat">
                                <div style={{display: "flex", gap: "10px"}}>
                                    <iconify-icon width="20" style={{color: "gold"}} icon="fa6-solid:coins"></iconify-icon>
                                    <p>Total Wagered</p>
                                </div>
                                <p>$ 0.0</p>
                            </div>
                        </div>
                    </div>

                    <div className="userFavGamesContainer">
                        <header>
                            <h2>Liked Games</h2>
                        </header>
                        {user.likedGames.length == 0 ? <div className="userFavGames">
                            <img src={"https://cdn.iconscout.com/icon/premium/png-256-thumb/no-data-found-1965030-1662565.png"}></img>
                            <p>Oops there is no data yet</p>
                        </div> : 
                        <div>
                            {user.likedGames.map((likedGame) => {
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
                        {user.history.length == 0 ? <div className="userRecentGames">
                            <img src={"https://cdn.iconscout.com/icon/premium/png-256-thumb/no-data-found-1965030-1662565.png"}></img>
                            <p>Oops there is no data yet</p>
                        </div> : 
                        <div>
                            {user.history.map((game) => {
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
                </div> : <div className={theme == 'dark' ? "editInfoPopupInner" : "lightThemeEditInfoPopupInner"}>
                    <header>
                        <p onClick={() => {setEdit(0)}} style={{cursor: "pointer", textDecoration: "underline"}}>Back</p>
                        <h3>Edit Information</h3>
                        <CloseIcon style={{cursor: "pointer", marginRight: "20px"}} onClick={() => props.setTriggerUserProfile(0)} />
                    </header>

                    <div className="editInfoContainer">
                        <div className="userInfo">
                            <img src={gorilla}></img>
                            <div className="editInfoAvatar">Edit your Avatar</div>
                        </div>
                    </div>

                    <div className="editInfoUsername">
                        <p>Username</p>
                        <input ref={newUsername} type="text" placeholder={user ? user.username : ""}></input>
                        <p style={{marginTop: "8px", color: "gray", fontSize: "14px"}}>Do not use special punctuation, otherwise your account may not be supported.</p>
                    </div>
                    
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <button onClick={handleModify} className="editInfoButton">Modify</button>
                    </div>
                </div>

                }
            </div> : ""}
        </>
    )
}
