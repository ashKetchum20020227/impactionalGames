
import "./sharepopup.css"
import CloseIcon from '@material-ui/icons/Close';

export default function SharePopup(props) {

    const handleCopy = () => {
        navigator.clipboard.writeText(document.URL)
        alert("Copied")
    }

    return (
        <>
            <div className="sharePopupOuter">
                <div className="sharePopupInner">
                    <header>
                        <h3>Share</h3>
                        <CloseIcon style={{cursor: "pointer", marginRight: "20px"}} onClick={() => props.setShareTrigger(0)} />
                    </header>

                    <p>{document.URL}</p>

                    <div onClick={handleCopy} style={{display: "flex", justifyContent: "center", alignItems: "center"}}><button>Copy</button></div>
                </div>
            </div>
        </>
    )
}
