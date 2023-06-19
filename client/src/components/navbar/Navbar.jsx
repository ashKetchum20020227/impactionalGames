import "./navbar.css"
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Login from "../../components/login/Login"
import { useContext, useEffect, useState } from "react";
import SideProfile from "../sideProfile/SideProfile";
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import WalletPopup from "../walletPopup/WalletPopup"
import { AuthContext } from "../../context/AuthContext";
import gorilla from "../../Assets/Screenshot (70) 2.png"
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { logout } from "../../apiCalls";
import ComingSoon from "../comingSoon/ComingSoon";
import { ThemeContext } from "../../context/ThemeContext";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Link } from "react-router-dom" 
import { ClientThemeContext } from "../../context/ClientThemeContext"

export default function Navbar(props) {

    const { user, dispatch } = useContext(AuthContext)

    const {theme, setTheme} = useContext(ThemeContext)

    const { clientTheme } = useContext(ClientThemeContext)

    const [trigger, setTrigger] = useState(0);
    const [registerTrigger, setRegisterTrigger] = useState(0);
    const [profileTrigger, setProfileTrigger] = useState(0)
    const [walletTrigger, setWalletTrigger] = useState(0)
    const [comingSoonTrigger, setComingSoonTrigger] = useState(0)

    const handleLogout = async () => {
        logout(dispatch)
    }

    useEffect(() => {
        if (user) {
            setTrigger(0)
        }
    })

    return (
        <>
            {trigger == 1 ? <Login setRegisterTrigger={setRegisterTrigger} registerTrigger={registerTrigger} trigger={trigger} setTrigger={setTrigger} /> : ""}
            {profileTrigger == 1 ? <SideProfile comingSoonTrigger={comingSoonTrigger} setComingSoonTrigger={setComingSoonTrigger} triggerUserProfile={props.triggerUserProfile} setTriggerUserProfile={props.setTriggerUserProfile} trigger={profileTrigger} setTrigger={setProfileTrigger} /> : ""}
            {walletTrigger == 1 ? <WalletPopup walletTrigger={walletTrigger} setWalletTrigger={setWalletTrigger} /> : ""}
            {comingSoonTrigger == 1 ? <ComingSoon trigger={comingSoonTrigger} setTrigger={setComingSoonTrigger} /> : "" }
            <div id={clientTheme == 'Christmas' ? 'christmasThemeNavbarContainer' : ""} className={theme == 'dark' ? "navbarContainer" : "lightThemeNavbarContainer"}>
                <div className="hamburgerIcon" onClick={() => {setProfileTrigger(!profileTrigger)}}>
                    {profileTrigger == 0 ? <MenuIcon style={theme == 'dark' ? {color: "white"} : {color: "black"}} /> : <CloseIcon style={theme == 'dark' ? {color: "white"} : {color: "black"}} />}
                </div>
                <div>
                    <div className="navButtonsContainer">
                        {user ? <button onClick={() => {setWalletTrigger(1)}} className="navWalletButton"> <AccountBalanceWalletRoundedIcon /> Wallet </button> : ""}
                        {user ? 
                        <div className="navProfile">
                            <img className="profileImage" src={gorilla}></img>
                            <p className={theme == 'dark' ? "username" : "lightThemeUsername"}>{user.username}</p>
                            <div className={theme == 'dark' ? "profileDropDown" : "lightThemeProfileDropDown"}>
                                <div className="header">
                                    <div className="userInfo">
                                        <img className="sideProfileImage" src={gorilla}></img>
                                        <h3>{user.username}</h3>
                                    </div>
                                    <Link to="/globalSettings" style={{textDecoration: "none"}}>
                                        <div className="globalSettings">
                                            <SettingsIcon style={theme == 'dark' ? {color: "white"} : {color: "black"}} />
                                            <p style={theme == 'dark' ? {margin: 0, color: "white"} : {margin: 0, color: "black"}}>Global Settings</p>
                                        </div>
                                    </Link>
                                </div>

                                <div className="linksContainer">
                                    <div onClick={() => {props.setTriggerUserProfile(1)}} className="dropdownLink">
                                        <PersonIcon />
                                        <p>User Information</p>
                                    </div>

                                    <div onClick={() => {setComingSoonTrigger(1)}} className="dropdownLink">
                                        <StackedLineChartIcon />
                                        <p>Statistics</p>
                                    </div>

                                    <div onClick={() => {setWalletTrigger(1)}} className="dropdownLink">
                                        <AccountBalanceWalletIcon />
                                        <p>Wallet</p>
                                    </div>

                                    <div className="dropdownLink">
                                        <HistoryIcon />
                                        <p>Transactions</p>
                                    </div>

                                    <div onClick={() => {setComingSoonTrigger(1)}} className="dropdownLink">
                                        <SupportAgentIcon />
                                        <p>Live Support</p>
                                    </div>

                                    <div onClick={() => {setComingSoonTrigger(1)}} className="dropdownLink">
                                        <Diversity1Icon />
                                        <p>Refer a friend</p>
                                    </div>
                                    
                                </div>

                                <div onClick={handleLogout} className="logoutContainer">
                                    <LogoutIcon />
                                    <p>Logout</p>
                                </div>
                            </div>
                        </div>
                        : ""
                        }

                        { user ? 
                        "" : 
                        <div>
                            <button onClick={() => {setTrigger(1)}} className={theme == 'dark' ? "navSignInButton" : "lightThemeNavSignInButton"}>Sign in</button>
                            <button onClick={() => {setRegisterTrigger(1); setTrigger(1)}} className="navSignUpButton">Sign up</button>
                        </div>
                        }

                        <div className="themeButton">
                            <WbSunnyIcon style={theme == 'light' ? {color: "#f5c242", fontSize: "40px"} : {color: "white", fontSize: "40px"}} />
                            <label class="switch">
                                <input type="checkbox" onClick={() => {theme == 'dark' ? setTheme('light') : setTheme('dark')}} checked={theme=='dark' ? true : false}/>
                                <span class="slider round"></span>
                            </label>
                            <ModeNightIcon style={theme == 'dark' ? {color: "#B64FC8ff", fontSize: "40px"} : {color: "black", fontSize: "40px"}} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
