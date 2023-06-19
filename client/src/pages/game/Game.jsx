import "./game.css"
import Navbar from "../../components/navbar/Navbar"
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import bomb from "../../Assets/Screenshot (70) 5.png"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import gorilla from "../../Assets/Screenshot (70) 2.png"
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { useRef, useContext, useEffect, useState } from "react";
import UserInfoPopup from "../../components/userInfoPopup/UserInfoPopup";
import {Link} from "react-router-dom"
import SharePopup from "../../components/sharePopup/SharePopup";
import axios from "axios"
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { likeGameCall, pushToHistoryCall } from "../../apiCalls";
import PlayerInfoPopup from "../../components/playerInfoPopup/PlayerInfoPopup";
import { ThemeContext } from "../../context/ThemeContext";
import moment from 'moment';
import Footer from "../../components/footer/Footer";

export default function Game() {

    const { theme } = useContext(ThemeContext)

    const { user, dispatch } = useContext(AuthContext)

    const comment = useRef()

    const [triggerUserProfile, setTriggerUserProfile] = useState(0)
    const [liked, setLiked] = useState(0);
    const [likes, setLikes] = useState(0);

    const { gameId } = useParams()

    const [game, setGame] = useState(null);
    const [comments, setComments] = useState([])

    const [shareTrigger, setShareTrigger] = useState(0)

    const [triggerPlayerProfile, setTriggerPlayerProfile] = useState(0)

    const [playerId, setPlayerId] = useState(null)

    const handleComment = async () => {
        try {
            const res = await axios.post("/api/comments/addComment", {gameId: game._id, userId: user._id, username: user.username, comment: comment.current.value})
            if (res.data == "Error") {
                alert("Sorry, there was some error")
                
            }
            else {
                setComments(res.data)
                comment.current.value = ""
            }
        } catch(err) {
            console.log(err);
        }
    }

    const handleLike = async () => {
        try {
            likeGameCall({gameId: game._id, userId: user._id}, dispatch)
            // const res = await axios.post("http://localhost:8000/games/like", {gameId: game._id, userId: user._id})
        } catch(err) {
            console.log(err);
        }
    }

    const handleCommentLike = async (commentId) => {
        try {
            const res = await axios.post("/api/comments/likeComment", {commentId: commentId, userId: user._id, gameId: game._id})
            // var newComments = comments
            
            // for (var i = 0; i < newComments.length; i++) {
            //     var flag = 0
            //     if (newComments[i]._id == commentId) {
            //         for (var j = 0; j < newComments[i].likes.length; j++) {
            //             if (newComments[i].likes[j] == user._id) {
            //                 flag = 1
            //                 newComments[i].likes.splice(j, 1)
            //                 break
            //             }
            //         }
            //         if (flag == 0) {
            //             newComments[i].likes.push(user._id)
            //         }
            //         break
            //     }
            // }

            // setComments(newComments)
            setComments(res.data)

        } catch(err) {
            console.log(err);
            alert("Error")
        }
    }

    const handleCommentReply = async (commentId) => {

        var doc = document.getElementById(commentId)
        doc = doc.getElementsByClassName("commentReplyInputContainer")[0]
        doc = doc.getElementsByTagName("input")[0]
        
        const replyComment = doc.value

        try {
            const res = await axios.post("/api/comments/replyComment", {gameId: game._id, username: user.username, userId: user._id, commentId: commentId, comment: replyComment})
            setComments(res.data)
            doc.value = ""
        } catch(err) {
            console.log(err);
        }
    }

    const openReplies = (commentId) => {
        var doc = document.getElementById(commentId)
        // console.log(doc);
        if (theme == 'dark') {
            doc = doc.getElementsByClassName("commentRepliesWrapper")[0]
        } else {
            doc = doc.getElementsByClassName("lightThemeCommentRepliesWrapper")[0]
        }
        doc.classList.toggle("hidden")
    }

    const handleWhatsappShare = () => {
        window.open('whatsapp://send?text='+document.URL); 
    }

    const handleFacebookShare = () => {
        window.open("https://www.facebook.com/sharer/sharer.php?u=https://youtube.com")
    }

    const handleLinkedinShare = () => {
        window.open("http://www.linkedin.com/shareArticle?mini=true&url=https://youtube.com")
    }

    const openFullScreen = () => {
        const elem = document.getElementById("gameFrameContainer")
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
          }
    }

    const closeFullscreen = () => {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
      }

    useEffect(() => {
        const getGame = async () => {
            try {
                const curGame = await axios.post("/api/games/getGame", {gameId: gameId})
                console.log(curGame.data);
                setGame(curGame.data)
                if (curGame.data.likes) {
                    pushToHistoryCall({userId: user._id, gameId: curGame.data._id, name: curGame.data.name, iframeLink: curGame.data.iframeLink}, dispatch)
                    setLikes(curGame.data.likes.length)
                    if (curGame.data.likes.includes(user._id)) {
                        setLiked(1)
                    }

                    const res = await axios.post("/api/comments/all", {gameId: gameId})
                    setComments(res.data)
                }
            } catch(err) {
                console.log(err);
            }
        }
        getGame()
        document.addEventListener("keydown", (e) => {
            if(e.key === "Escape") {
                closeFullscreen()
            }
        })
    }, [])
    
    return (
        <>
            {triggerUserProfile == 1 ? <UserInfoPopup setTriggerUserProfile={setTriggerUserProfile} /> : ""}
            {triggerPlayerProfile == 1 ? <PlayerInfoPopup setTriggerPlayerProfile={setTriggerPlayerProfile} playerId={playerId} /> : ""}
            <Navbar triggerUserProfile={triggerUserProfile} setTriggerUserProfile={setTriggerUserProfile} />
            {game && game.name ? <div className={theme == 'dark' ? "gamePageWrapper" : "lightThemeGamePageWrapper"}>
                <div className="gamePageHeader">
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{marginRight: "20px"}}><Link style={theme == 'dark' ? {color: "white"} : {color: "black"}} to="/">Home</Link></div>
                        <div className="gameNameContainer">
                            <p>{game.name}</p>
                        </div>
                    </div>
                    <div className="gameOwnerContainer">
                        {game.owner ? <p>By <a>{game.owner}</a></p>:""}
                    </div>
                </div>

                <div className="gameContainer">
                    <iframe id="gameFrameContainer" className="gameFrameContainer" src={game.iframeLink}></iframe>
                </div>
                <div className="gameFooter">
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {/* <div className="gameFooterLink"> 
                            <StarRoundedIcon style={{color: "white"}} />
                            <p>129</p>
                        </div> */}

                        <div className="gameFooterLink"> 
                            {liked ? <FavoriteRoundedIcon onClick={() => {handleLike();setLiked(0); setLikes(likes-1)}} style={{color: "tomato"}} /> : <FavoriteRoundedIcon onClick={() => {handleLike();setLiked(1); setLikes(likes+1)}} style={theme == 'dark' ? {color: "white"} : {color: "black"}} />}
                            <p>{likes}</p>
                        </div>
                        
                        {/* <div className="gameFooterLink">
                            <SendRoundedIcon style={{color: "white"}} />
                        </div> */}
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div className="gameFooterLink">
                            <FullscreenRoundedIcon onClick={openFullScreen} style={theme == 'dark' ? {color: "white", fontSize: "30px"} : {color: "black", fontSize: "30px"}} />
                        </div>
                    </div>
                </div>

                <div className="gameInfoContainer">
                    <div className="gameInfo1">
                        <img className="gameInfoImage" src={bomb}></img>
                        <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <h1 className="gameInfoName">{game.name}</h1>
                                {game.owner ? <p className="gameInfoOwner">By <a>{game.owner}</a></p> : ""}
                                <p>Release: {game.release ? game.release : "---"}</p>
                            </div>

                            {/* <div><p className="gameInfoMoreInfo">More Info</p></div> */}
                        </div>
                    </div>

                    <div className="gameInfo2">
                        <h2>About the game</h2>
                        <p>{game.about ? game.about : ""}</p>
                    </div>
                </div>

                <div className="shareGameContainer">
                    <div>
                        <h1>Share</h1>
                    </div>
                    <div className="shareLinksContainer">
                        {shareTrigger == 1 ? <SharePopup setShareTrigger={setShareTrigger} /> : ""}
                        <div onClick={handleFacebookShare} style={{backgroundColor: "white", height: "40px", borderRadius: "10px", width: "35px"}}><iconify-icon icon="brandico:facebook-rect" style={{color: "#0a66c2", fontSize:"40px"}}></iconify-icon></div>
                        <div onClick={handleWhatsappShare}><img style={{width: "40px"}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"}></img></div>
                        <div onClick={() => {setShareTrigger(1)}}><iconify-icon width="43" icon="logos:skype"></iconify-icon></div>
                        <div onClick={handleLinkedinShare} style={{backgroundColor: "white", height: "40px", borderRadius: "10px", width: "35px"}}><iconify-icon icon="bi:linkedin" style={{color: "#0a66c2", fontSize: "40px"}}></iconify-icon></div>
                    </div>
                </div>

                <div className="commentsContainer">
                    <div className="header">
                        <h2>Comments</h2>
                        <MenuRoundedIcon />
                    </div>

                    <div className="leaveACommentContainer">
                        <img src={gorilla}></img>
                        <input ref={comment} type="text" placeholder="Leave your comment..."></input>
                        <button onClick={handleComment} className="commentButton">Comment</button>
                    </div>

                    {comments ? <div className="comments">
                        {comments.map(comment => {
                            return (
                                <div id={comment._id} style={{marginBottom: "20px"}}>
                                    <div className="commentWrapper">
                                        <div className="header">
                                            <img src={bomb}/>
                                            <p onClick={() => {setPlayerId(comment.userId); setTriggerPlayerProfile(1)}} className="commentUsername">{comment.username}</p>
                                            <p className="commentAgo">{moment(new Date(comment.createdAt)).fromNow()}</p>
                                        </div>

                                        <div style={{marginTop: "5px"}}>
                                            <p>{comment.comment}</p>
                                        </div>

                                        <div className="iconsContainer">
                                            <div style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                {comment.likes.includes(user._id) ? <ThumbUpRoundedIcon onClick={() => {handleCommentLike(comment._id)}} style={{fontSize: "20px", color: "green"}} /> : <ThumbUpRoundedIcon onClick={() => {handleCommentLike(comment._id)}} style={theme == 'dark' ? {fontSize: "20px", color: "darkgrey"} : {fontSize: "20px", color: "black"}} />}
                                                <p style={theme == 'dark' ? {marginLeft: "3px", color: "lightgray"} : {marginLeft: "3px", color: "black"}}>{comment.likes.length}</p>
                                            </div>
                                            <div style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <QuestionAnswerRoundedIcon onClick={() => {openReplies(comment._id)}} style={theme == 'dark' ? {fontSize: "20px", color: "darkgrey"} : {fontSize: "20px", color: "black"}} />
                                                <p style={theme == 'dark' ? {marginLeft: "3px", color: "lightgray"} : {marginLeft: "3px", color: "black"}}>{comment.replies.length}</p>
                                            </div>
                                            <div style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <FlagRoundedIcon style={theme == 'dark' ? {fontSize: "20px", color: "darkgrey"} : {fontSize: "20px", color: "black"}} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className={theme == 'dark' ? "commentRepliesWrapper hidden" : "lightThemeCommentRepliesWrapper hidden"}>
                                        <div className="commentReplyInputContainer">
                                            <img src={gorilla}></img>
                                            <input type="text" placeholder="Reply to this comment..."></input>
                                            <button onClick={() => {handleCommentReply(comment._id)}} className="commentReplyButton">Comment</button>
                                        </div>
                                        <div className="commentRepliesContainer">
                                            {comment.replies.map((reply) => {
                                                return (
                                                    <div className="commentReply">
                                                        <div className="header">
                                                            <img src={bomb}/>
                                                            <p onClick={() => {setPlayerId(reply.userId); setTriggerPlayerProfile(1)}} className="commentUsername">{reply.username}</p>
                                                            {reply.date ? <p className="commentAgo">{moment(new Date(reply.date)).fromNow()}</p> : ""}
                                                        </div>

                                                        <div style={{marginTop: "5px"}}>
                                                            <p>{reply.comment}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div> : ""}
                </div>

                {/* <div className="gameRatingContainer">
                    <div className="header">
                        <h1>4.0</h1>
                        <div>
                            <div>
                                <StarRoundedIcon />
                                <StarRoundedIcon />
                                <StarRoundedIcon />
                            </div>
                            <p>out of 5</p>
                        </div>
                    </div>

                    <div></div>
                </div> */}
                <Footer />
            </div> : ""}
        </>
    )
}


{/* <iframe frameborder="0" src="https://itch.io/embed-upload/6579220?color=333333" allowfullscreen="" width="640" height="380"><a href="https://pankajahlawat.itch.io/ludotournmanet">Play ludoTournmanet6 on itch.io</a></iframe> */}
{/* <iframe frameborder="0" src="https://itch.io/embed-upload/6659237?color=333333" allowfullscreen="" width="640" height="380"><a href="https://pankajahlawat.itch.io/rummynewui">Play RummyNewUI3 on itch.io</a></iframe> */}
// https://itch.io/embed-upload/6659237?color=333333