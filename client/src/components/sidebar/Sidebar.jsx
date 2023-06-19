import "./sidebar.css"
import jackpot from "../../pages/home/165606573680024 1.png"
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function Sidebar() {

    const { theme } = useContext(ThemeContext)

    return (
        <>
            <div className={theme == 'dark' ? "sidebarWrapper" : "lightThemeSidebarWrapper"}>
                <div className="sidebarLink">Arcade</div>
                <div className="sidebarLink">Casino</div>
                <div className="sidebarLink">Sports</div>
                <div className="sidebarLink">Shooting</div>
            </div>
            {/* <img className="smallImage" src={jackpot}></img> */}
        </>
    )
}
