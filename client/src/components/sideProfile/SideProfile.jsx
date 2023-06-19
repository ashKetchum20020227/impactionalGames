import "./sideprofile.css"
import gorilla from "../../pages/home/Screenshot (70) 2.png";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Sidebar from "../sidebar/Sidebar";

export default function SideProfile(props) {

    const { theme } = useContext(ThemeContext)

    const { user } = useContext(AuthContext)

    const handleShowGameCategories = () => {
        const doc = document.getElementsByClassName("sideProfileCategoryDropdown")[0]
        doc.classList.remove("displayNone")
    }

    const handleHideGameCategories = () => {
        const doc = document.getElementsByClassName("sideProfileCategoryDropdown")[0]
        doc.classList.add("displayNone")
    }

    return (
        <>
            {user ? <div className="sideProfileWrapper">
                <div className={theme == 'dark' ? "sideProfileOuter" : "lightThemeSideProfileOuter"}>
                    <div className="sideProfileOuterImageContainer">
                        <img className="sideProfileImage" src={gorilla}></img>
                        <div className="sideProfileInfo">
                            {user ? <h2>{user.username}</h2> : <h2>Username</h2>}
                            {user ? <h4>{user.phone}</h4> : <h4>Mobile</h4>}
                        </div>
                    </div>
                    <div className="sideProfileOuterViewProfile" onClick={() => props.setTriggerUserProfile(1)}>
                        <h4>View Profile</h4>
                    </div>
                </div>
                <div className="sideProfileInner">

                    <div onMouseOut={handleHideGameCategories} onMouseOver={handleShowGameCategories} style={{width: "100%", display: "flex", flexDirection: "column"}}>
                        <div className="sideProfileInnerLink">
                            <CategoryOutlinedIcon style={{fontSize: "35px"}} />
                            <p>Game Categories</p>
                        </div>
                        <div className="sideProfileCategoryDropdown displayNone"><Sidebar /></div>
                    </div>

                    <div onClick={() => props.setComingSoonTrigger(1)} className="sideProfileInnerLink">
                        <iconify-icon style={{fontSize: "35px"}} icon="akar-icons:double-sword"></iconify-icon>
                        <p>Team Clash</p>
                    </div>

                    <div onClick={() => props.setComingSoonTrigger(1)} className="sideProfileInnerLink">
                        <SupportAgentIcon style={{fontSize: "30px"}} />
                        <p>Helpdesk</p>
                    </div>

                    <div onClick={() => props.setComingSoonTrigger(1)} className="sideProfileInnerLink">
                        <PolicyOutlinedIcon style={{fontSize: "30px"}} />
                        <p>Fairplay Policy</p>
                    </div>

                    <div onClick={() => props.setComingSoonTrigger(1)} className="sideProfileInnerLink">
                        <SettingsOutlinedIcon style={{fontSize: "30px"}} />
                        <p>Settings</p>
                    </div>

                    <div onClick={() => props.setComingSoonTrigger(1)} className="sideProfileInnerLink">
                        <VolunteerActivismOutlinedIcon style={{fontSize: "30px"}} />
                        <p>Take control</p>
                    </div>

                    <div onClick={() => props.setComingSoonTrigger(1)} className="sideProfileInnerLink">
                        <ShoppingCartOutlinedIcon style={{fontSize: "30px"}} />
                        <p>Sports</p>
                    </div>
                </div>
            </div> : ""}
        </>
    )
}
