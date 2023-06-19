
import "./footer.css"
import { useContext, useRef } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { addReviewCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import { ClientThemeContext } from "../../context/ClientThemeContext"

export default function Footer() {

    const {theme} = useContext(ThemeContext)

    const { clientTheme } = useContext(ClientThemeContext)

    const { user, dispatch } = useContext(AuthContext);

    const review = useRef()

    const handleAddReview = async () => {
        if(user) {
            addReviewCall({_id: user._id, review: review.current.value})
            alert("Feedback received. Thanks for taking out your time")
            review.current.value = ""
        }

        else {
            alert("Sign in and then try again")
            review.current.value = ""
        }
    }

    return (
        <footer id={clientTheme == 'Christmas' ? "christmasThemeFooter" : ""} className={theme == 'dark' ? "footer" : "lightThemeFooter"}>
            <div className="feedback">
                <div>
                    <h2 style={{display: "flex", alignItems: "center"}}>Crypto Online Casino {clientTheme == 'Christmas' ? <iconify-icon icon="emojione-v1:santa-claus" style={{fontSize: "40px", color: "tomato"}}></iconify-icon> : ""}</h2>
                    <p>Casinos online have not always been around, but we can safely say that online casinos have been used a lot since they 
                        came on the market. And it's not in short demand nor options, and now in 2022, we have 1000s and 1000s to pick from – 
                        it's just a matter of what you like and what payment options you would like to see at the casino.
                        Players are always looking for something new, which will help make the gaming experience so much better and more accessible. 
                        Allowing the player to focus on the absolute fun of a casino, that's right, the games themselves.</p>
                </div>

                <div>
                    <h2>Help us improve Product Experience</h2>
                    <textarea ref={review} className="feedbackInput" type="text" placeholder="If you find any bugs or usability difficulties Please let us know. Leave your messages right here"></textarea>
                    <div style={{display: "flex", marginTop: "20px", alignItems: "center"}}>
                        <button onClick={handleAddReview} className="feedbackSubmitButton">Leave a Message</button>
                        <p style={{fontSize: "0.8rem"}}>Now get rewarded for valuable feedback</p>
                    </div>
                    <p style={{fontSize: "0.8rem", marginTop: "5px"}}>Or Email us: dddd@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}
