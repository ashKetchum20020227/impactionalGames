import "./rummy.css"
import backgroundImage from "../home/A-Blackjack-1\ 1.png";
import deals from "../../Assets/deals (1).png"
import points from "../../Assets/ranking (3) (1).png"
import pools from "../../Assets/Group 1896.png"
import coin from "../../Assets/Group 1731 (1).png"
import CircleIcon from '@mui/icons-material/Circle';

export default function Rummy() {
    return (
        <>
            <div className="rummyWrapper">
                <div className="rummyImageWrapper">
                    <img src={backgroundImage}></img>
                </div>
                <div className="rummyMainWrapper">
                    <div className="header">
                        <div className="first">
                            <h1 style={{color: "#FCCB2Bff", fontSize: "4rem"}}>Rummy</h1>
                            <h4 style={{color: "white", fontSize: "1.2rem"}}>Live Cards Tables</h4>
                        </div>

                        <div className="rummyDealsButtonContainer">
                            <div className="rummyDealsButton">
                                <img src={points}></img>
                                <h2>Points</h2>
                            </div>
                            <div className="rummyDealsButton">
                                <img src={deals}></img>
                                <h2 style={{color: "#C80101ff"}}>Deals</h2>
                            </div>
                            <div className="rummyDealsButton">
                                <img className="rummyDealsButtonLargeImage" src={pools}></img>
                                <h2>Pools</h2>
                            </div>
                        </div>
                    </div>
                    <div className="secondHeader">
                        <h2>Select a Table to Play</h2>
                    </div>
                    <div className="thirdHeader">
                        <div>Best Of</div>
                        <div style={{color: "#C80101ff"}}>Online Players</div>
                        <div>Buy In</div>
                    </div>
                    <div className="rummyOpenGamesContainer">
                        <div className="rummyOpenGame">
                            <div className="buttonsContainer">
                                <div className="numberOfDealsButton">2 Deals</div>
                                <div className="priceButton"><img style={{width: "22px"}} src={coin}></img><p>2,500</p></div>
                            </div>
                            <div className="textContainer">
                                <div>
                                    <p style={{fontSize: "0.9rem"}}>Heads up</p>
                                    <div style={{display: "flex", flexDirection: "row", gap: "2px"}}><CircleIcon style={{color: "#17C433ff", width: "15px"}} /><p style={{fontSize: "1.2rem"}}>2 online</p></div>
                                </div>
                                <div>
                                    <p style={{fontSize: "0.9rem"}}>Use 125 coins</p>
                                </div>
                            </div>
                        </div>
                        <div className="rummyOpenGame">
                            <div className="buttonsContainer">
                                <div className="numberOfDealsButton">2 Deals</div>
                                <div className="priceButton"><img style={{width: "22px"}} src={coin}></img><p>770</p></div>
                            </div>
                            <div className="textContainer">
                                <div>
                                    <p style={{fontSize: "0.9rem"}}>Heads up</p>
                                    <div style={{display: "flex", flexDirection: "row", gap: "2px"}}><CircleIcon style={{color: "#17C433ff", width: "15px"}} /><p style={{fontSize: "1.2rem"}}>2 online</p></div>
                                </div>
                                <div>
                                    <p style={{fontSize: "0.9rem"}}>Use 125 coins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
