import "./login.css"
import google from "./google.jpeg"
import CloseIcon from '@material-ui/icons/Close';
import { registerCall, loginCall, loginCallMobile } from "../../apiCalls";
import { useContext } from "react";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { setUpRecaptcha } from "../../context/firebase";
import loginComplete from "../../Assets/Group 1384 (1).png"
import { ClientThemeContext } from "../../context/ClientThemeContext"

export default function Login(props) {

    const [mobileTrigger, setMobileTrigger] = useState(0);
    const [otpTrigger, setOtpTrigger] = useState(0);
    const [loginCompleteTrigger, setLoginCompleteTrigger] = useState(0);

    const [register, setRegister] = useState(props.registerTrigger);

    const { clientTheme } = useContext(ClientThemeContext)

    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const email = useRef()
    const password = useRef()
    const [mobileNumber, setMobileNumber] = useState("")
    const [confirmObj, setConfirmObj] = useState("")
    const otp1 = useRef()
    const otp2 = useRef()
    const otp3 = useRef()
    const otp4 = useRef()
    const otp5 = useRef()
    const otp6 = useRef()
    const username = useRef()
    const registerPassword = useRef()

    const handleRegister = async () => {
        await registerCall({email: email.current.value, password: registerPassword.current.value, username: username.current.value, phone: mobileNumber}, dispatch)
        setRegister(0)
        props.setRegisterTrigger(0)
        props.setTrigger()
    }

    const handleSubmit = async () => {
        if (mobileTrigger == 0) {
            loginCall({email: email.current.value, password: password.current.value}, dispatch)
            
            // setLoginCompleteTrigger(1)
            setTimeout(() => {
                props.setTrigger()
            }, 700)
            
        } else {
            // loginCallMobile({mobile: mobileNumber.current.value, otp: otp1.current.value + otp2.current.value + otp3.current.value + otp4.current.value}, dispatch)
            try {
                const res = await confirmObj.confirm(otp1.current.value + otp2.current.value + otp3.current.value + otp4.current.value + otp5.current.value + otp6.current.value)
                // console.log(res);
                loginCallMobile({mobile: mobileNumber, user: res.user}, dispatch)
        
                // setLoginCompleteTrigger(1)
                setTimeout(() => {
                    props.setTrigger()
                }, 700)

            } catch(err) {
                console.log(err);
            }
        }
    }

    const getOtp = async () => {
        // alert(mobileNumber)
        const response = await setUpRecaptcha(mobileNumber)
        // console.log(response)
        setConfirmObj(response)
        setOtpTrigger(1)
    }

    return (
        <>
            <div className={props.trigger == 1 ? "loginOuter" : "dropPopup loginOuter"}>
                <div className="loginInnerWrapper">
                    <div onClick={() => {props.setTrigger(0); props.setRegisterTrigger(0)}}>
                        <CloseIcon style={{fontSize: "30px"}} />
                    </div>
                </div>
                { register == 0 ? <div>
                { otpTrigger == 0 ? <div className="loginInner">
                    <div className="loginContainerHeader">
                        <h1>Welcome Back!{/* lol */}
                        {clientTheme == 'Christmas' ? <iconify-icon icon="fa6-solid:candy-cane" style={{fontSize: "40px", color: "red"}} rotate="270deg"></iconify-icon> : ""}</h1>
                        
                        <p>Login to continue</p>
                    </div>

                    { loginCompleteTrigger == 0 ? <div className="loginInputContainer">
                        {mobileTrigger == 0 ? 
                        <div className="loginInput">
                            <div>
                                <label htmlFor="emailInput">{clientTheme == 'Christmas' ?<iconify-icon icon="fxemoji:christmastree" style={{fontSize: "30px"}}></iconify-icon> : ""} Email</label>
                                <input ref={email} id="emailInput" type="text"></input>
                            </div>
                        </div> : 
                        <div>
                            <label htmlFor="emailInput">Mobile Number</label>
                            <PhoneInput defaultCountry="IN" value={mobileNumber} onChange={setMobileNumber} placeholder="Enter phone number" />
                            <div id="recaptcha-container"></div>
                        </div>
                        }

                        <div className="loginInput">
                            {mobileTrigger == 0 ? <div>
                                <label htmlFor="passwordInput">{clientTheme == 'Christmas' ? <iconify-icon icon="tabler:cookie-man" style={{color: "brown", fontSize: "30px"}}></iconify-icon> : ""} Password</label>
                                <input ref={password} id="passwordInput" type="password"></input>
                            </div> : "" }
                        </div>

                        <div className="rememberMeContainer">
                            <div style={{display: "flex"}}>
                                <input id="rememberMe" style={{width: "20px", height: "20px", marginRight: "5px"}} type="checkbox"></input>
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                            <div>
                                <a className="forgotPassword">Forgot Password</a>
                            </div>
                        </div>

                    
                        <div className="loginButtonsContainer">
                            <div className="loginButton">
                                {mobileTrigger == 0 ? <button onClick={handleSubmit}>Log in {clientTheme == 'Christmas' ? <iconify-icon icon="emojione-v1:santa-claus" style={{fontSize: "30px", color: "tomato"}}></iconify-icon> : ""} </button> : <button onClick={getOtp}>Send OTP</button> }
                            </div>

                            <div className="thirdPartyLoginButtonsContainer">
                                <div className="googleSigninButton">
                                    <img style={{width: "18px"}} className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                                    <span style={{fontSize: "0.8rem"}}>Connect to google</span>
                                </div>
                                <div className="facebookSigninButton">
                                    <img style={{width: "18px"}} className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/640px-Facebook_icon_2013.svg.png"/>
                                    <span style={{fontSize: "0.8rem"}}>Connect to facebook</span>
                                </div>
                                <div className="appleSigninButton">
                                    <img style={{width: "18px"}} className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg"/>
                                    <span style={{fontSize: "0.8rem"}}>Connect to apple</span>
                                </div>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px"}}>
                            {mobileTrigger == 0 ? <p onClick={() => {setMobileTrigger(1)}} style={{color: "black", cursor: "pointer", textDecoration: "underline"}}>Login with mobile</p> : <p onClick={() => {setMobileTrigger(0)}} style={{color: "black", cursor: "pointer", textDecoration: "underline"}}>Login with email</p>}
                            <div><p onClick={() => {setRegister(1)}} style={{color: "black", cursor: "pointer", textDecoration: "underline"}}>New user? Register here</p></div>
                        </div>
                    </div> : <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}><img style={{width: "300px", height: "300px"}} src={loginComplete}></img></div> }
                </div> :
                <div className="loginInner">
                    <div className="loginContainerHeader">
                        <h1>OTP Verification</h1>
                    </div>

                    { loginCompleteTrigger == 0 ? <div className="loginInputContainer">
                        <div className="loginInput">
                            <p>Please check your mobile to get the verification code</p>
                            <div className="otp">
                                <input ref={otp1} type="text" minLength={1} maxLength={1}></input>
                                <input ref={otp2} type="text" minLength={1} maxLength={1}></input>
                                <input ref={otp3} type="text" minLength={1} maxLength={1}></input>
                                <input ref={otp4} type="text" minLength={1} maxLength={1}></input>
                                <input ref={otp5} type="text" minLength={1} maxLength={1}></input>
                                <input ref={otp6} type="text" minLength={1} maxLength={1}></input>
                            </div>
                        </div>

                        <div className="loginButtonsContainer">
                            <div className="loginButton">
                                <button onClick={handleSubmit} style={{width: "88%"}}>Login</button>
                            </div>
                        </div>

                        <div className="loginButtonsContainer">
                            <div className="loginButton">
                                <button style={{position: "absolute", bottom: "10%"}}>Cancel</button>
                            </div>
                        </div>
                    </div> : <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img style={{width: "300px", height: "300px"}} src={loginComplete}></img>
                    </div>}
                </div> }
                </div> 
                : 
                <div className="loginInner registerContainer">
                    <div className="loginContainerHeader">
                        <h1>Register</h1>
                    </div>
                    <div className="loginInputContainer">
                        <div className="loginInput">
                            <div>
                                <label htmlFor="emailInput">Email</label>
                                <input ref={email} id="emailInput" type="text"></input>
                            </div>
                        </div> 
                        <div className="loginInput">
                            <div>
                                <label htmlFor="emailInput">Username</label>
                                <input ref={username} id="emailInput" type="text"></input>
                            </div>
                        </div> 
                        <div className="loginInput">
                            <div>
                                <label htmlFor="emailInput">Password</label>
                                <input ref={registerPassword} id="emailInput" type="password"></input>
                            </div>
                        </div> 
                        <div className="loginMobileInput">
                            <label htmlFor="emailInput">Mobile Number</label>
                            <PhoneInput defaultCountry="IN" value={mobileNumber} onChange={setMobileNumber} placeholder="Enter phone number" />
                            <div id="recaptcha-container"></div>
                        </div>
                    </div>

                    <div className="loginButtonsContainer">
                        <div className="loginButton">
                            <button onClick={handleRegister} style={{width: "88%"}}>Register</button>
                        </div>
                    </div>

                    <div className="loginButtonsContainer">

                            <div className="thirdPartyLoginButtonsContainer">
                                <div className="googleSigninButton">
                                    <img style={{width: "18px"}} className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                                    <span style={{fontSize: "0.8rem"}}>Connect to google</span>
                                </div>
                                <div className="facebookSigninButton">
                                    <img style={{width: "18px"}} className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/640px-Facebook_icon_2013.svg.png"/>
                                    <span style={{fontSize: "0.8rem"}}>Connect to facebook</span>
                                </div>
                                <div className="appleSigninButton">
                                    <img style={{width: "18px"}} className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg"/>
                                    <span style={{fontSize: "0.8rem"}}>Connect to apple</span>
                                </div>
                            </div>
                        </div>
                </div>
                }
            </div>
        </>
    )
}
