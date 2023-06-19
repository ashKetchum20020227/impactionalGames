
import "./globalsettings.css"
import Navbar from "../../components/navbar/Navbar"
import { ThemeContext } from "../../context/ThemeContext";
import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import UserInfoPopup from "../../components/userInfoPopup/UserInfoPopup"
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import Footer from "../../components/footer/Footer"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';

export default function GlobalSettings() {

    const { theme, setTheme } = useContext(ThemeContext)

    const { user, dispatch } = useContext(AuthContext);

    const [triggerUserProfile, setTriggerUserProfile] = useState(0)

    const navigate = useNavigate()

    const [general, setGeneral] = useState(1)
    const [privacy, setPrivacy] = useState(0)
    const [security, setSecurity] = useState(0)
    const [active, setActive] = useState(0)

    const handleHome = () => {
        navigate("/")
    }

    const handleSelect = (e) => {

        var doc = document.getElementsByClassName("selected")[0]
        doc.classList.remove("selected")

        if (doc.id == 'general') {
            setGeneral(0)
        } else if (doc.id == 'privacy') {
            setPrivacy(0)
        } else if (doc.id == 'security') {
            setSecurity(0)
        } else {
            setActive(0)
        }

        doc = document.getElementById(e.target.id)

        if (doc.id == 'general') {
            setGeneral(1)
        } else if (doc.id == 'privacy') {
            setPrivacy(1)
        } else if (doc.id == 'security') {
            setSecurity(1)
        } else {
            setActive(1)
        }

        doc.classList.add("selected")
    }
    

    return (
        <>
            {triggerUserProfile == 1 ? <UserInfoPopup setTriggerUserProfile={setTriggerUserProfile} /> : ""}
            <Navbar triggerUserProfile={triggerUserProfile} setTriggerUserProfile={setTriggerUserProfile} />
            <div className={theme == 'dark' ? "globalSettingsWrapper" : "lightThemeGlobalSettingsWrapper"}>
                <header><span onClick={handleHome}>{"Home"}</span>{" > "}<SettingsIcon style={{color: "#52C71Bff"}} />{" Global Settings"}</header>
                <div className="globalSettingsMain">
                    <div className="globalSettingsSidebar">
                        <p id="general" onClick={(e) => {handleSelect(e)}} className="selected">General</p>
                        <p id="privacy" onClick={(e) => {handleSelect(e)}}>Privacy</p>
                        <p id="security" onClick={(e) => {handleSelect(e)}}>Security</p>
                        <p id="active" onClick={(e) => {handleSelect(e)}}>Active Sessions</p>
                    </div>       
                    {general == 1 ? <div className="globalSettingsDiv generalSettings">
                        <div>
                            <p>Show full name of currency in crypto list</p>
                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>

                        <div>
                            <p>Display Mode</p>
                            <div className="themeButton">
                                <WbSunnyIcon style={theme == 'light' ? {color: "#f5c242", fontSize: "40px"} : {color: "white", fontSize: "40px"}} />
                                <label class="switch">
                                    <input type="checkbox" onClick={() => {theme == 'dark' ? setTheme('light') : setTheme('dark')}} checked={theme == 'dark' ? true : false} />
                                    <span class="slider round"></span>
                                </label>
                                <ModeNightIcon style={theme == 'dark' ? {color: "#B64FC8ff", fontSize: "40px"} : {color: "black", fontSize: "40px"}} />
                            </div>
                        </div>

                        <div>
                            <p>Language</p>
                            <select>
                                <option>English</option>
                                <option>French</option>
                                <option>Indonesian</option>
                                <option>Japanese</option>
                            </select>
                        </div>
                    </div> : ""}      

                    {privacy == 1 ? <div className="globalSettingsDiv privacySettings">
                        <div>
                            <div>
                                <h4>Hide my gaming profile</h4>
                                <p>Even if hidden, your avatar and username are always visible in chatrooms.</p>
                            </div>

                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>

                        <div>
                            <div>
                                <h4>Hide my username from public lists</h4>
                                <p>If hidden, no one can view your profile by clicking on your avatar or username on public rankings or bet lists</p>
                            </div>

                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>

                        <div>
                            <div>
                                <h4>Hide my online presence in private chat</h4>
                            </div>

                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>

                        <div>
                            <div>
                                <h4>Allow private messages from strangers</h4>
                            </div>

                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>

                        <div>
                            <div>
                                <h4>Refuse any new friend request</h4>
                            </div>

                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>

                    </div> : ""}   

                    {security == 1 ? <div className="globalSettingsDiv securitySettings">
                        <div>
                            <form>
                                <div>
                                    <label>Login Email</label>
                                    <input type="text"></input>
                                </div>

                                <div>
                                    <label>Login Password</label>
                                    <input type="password"></input>
                                </div>

                                <button>Change</button>
                            </form>
                        </div>

                    </div> : ""}    

                </div>

                <Footer />

            </div>
        </>
    )
}
