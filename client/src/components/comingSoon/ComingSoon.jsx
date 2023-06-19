
import "./comingsoon.css"
import CloseIcon from '@material-ui/icons/Close';

export default function ComingSoon(props) {

    return (
        <>
            <div className={props.trigger == 1 ? "loginOuter" : "dropPopup comingSoonOuter"}>
                <div className="comingSoonInnerWrapper">
                    <div onClick={props.setTrigger}>
                        <CloseIcon style={{fontSize: "30px"}} />
                    </div>
                </div>
                { props.trigger == 1 ? 
                    <div className="comingSoonInner">
                        <p style={{fontWeight: "900", fontSize: "30px"}}>Feature coming Soon</p>
                    </div> : ""}
            </div>
        </>
    )
}
