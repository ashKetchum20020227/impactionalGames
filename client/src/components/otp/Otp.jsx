import "./otp.css"
import CloseIcon from '@material-ui/icons/Close';

export default function Otp() {
    return (
        <>
            <div className={"loginOuter"}>
                <div className="loginInnerWrapper">
                    <div>
                        <CloseIcon style={{fontSize: "30px"}} />
                    </div>
                </div>
                <div className="loginInner">
                    <div className="loginContainerHeader">
                        <h1>Forgot Password</h1>
                    </div>

                    <div className="loginInputContainer">
                        <div className="loginInput">
                            <div>
                                <p>Enter your email address to recover your password</p>
                                <label for="emailInput">Email</label>
                                <input id="emailInput" type="text"></input>
                            </div>
                        </div>

                        <div className="loginButtonsContainer">
                            <div className="loginButton">
                                <button style={{width: "88%"}}>Recover Password</button>
                            </div>
                        </div>

                        <div className="loginButtonsContainer">
                            <div className="loginButton">
                                <button style={{position: "absolute", bottom: "10%"}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
