import "./otpverify.css"
import CloseIcon from '@material-ui/icons/Close';

export default function OtpVerify() {
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
                        <h1>OTP Verification</h1>
                    </div>

                    <div className="loginInputContainer">
                        <div className="loginInput">
                            <p>Please check your email to get the verification code</p>
                            <div className="otp">
                                <input type="text" minLength={1} maxLength={1}></input>
                                <input type="text" minLength={1} maxLength={1}></input>
                                <input type="text" minLength={1} maxLength={1}></input>
                                <input type="text" minLength={1} maxLength={1}></input>
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
