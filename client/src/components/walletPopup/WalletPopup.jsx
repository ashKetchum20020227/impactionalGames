import "./walletpopup.css"
import CloseIcon from '@material-ui/icons/Close';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { useContext, useState } from "react";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { ThemeContext } from "../../context/ThemeContext";

export default function WalletPopup(props) {

    const {theme, setTheme} = useContext(ThemeContext)

    const [deposit, setDeposit] = useState(1)
    const [withdraw, setWithdraw] = useState(0)

    const [crypto, setCrypto] = useState(1)
    const [fiat, setFiat] = useState(0)


    const handleDeposit = () => {
        setDeposit(1)
        setWithdraw(0)
        document.getElementsByClassName("walletdButton")[0].classList.add("transactiondwSelected")
        document.getElementsByClassName("walletwButton")[0].classList.remove("transactiondwSelected")
    }

    const handleWithdraw = () => {
        setDeposit(0)
        setWithdraw(1)
        document.getElementsByClassName("walletwButton")[0].classList.add("transactiondwSelected")
        document.getElementsByClassName("walletdButton")[0].classList.remove("transactiondwSelected")
    }

    const handleCurrencyDropdown = () => {
        document.getElementsByClassName("hiddenOptions")[0].classList.toggle("displayNone")
    }

    const handleTransactionTypeCrypto = () => {
        setCrypto(1)
        setFiat(0)
    }

    const handleTransactionTypeFiat = () => {
        setFiat(1)
        setCrypto(0)
    }

    return (
        <>
            <div className="walletPopupWrapper">
                <div className={theme == 'dark' ? "walletPopupInner" : "lightThemeWalletPopupInner"}>
                    <header>
                        <h2>Wallet</h2>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "20px"}}>
                            <div className="transactionsLink" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <HistoryRoundedIcon />
                                <p>Transactions</p>
                            </div>
                            <CloseIcon onClick={() => {props.setWalletTrigger(0)}} style={{fontWeight: "bolder", cursor: "pointer"}} />
                        </div>
                    </header>

                    <div className="walletwdButtons">
                        <div onClick={handleDeposit} className="walletdButton transactiondwSelected">
                            {theme == 'dark' ? <SavingsRoundedIcon style={deposit == 1 ? {color: "white"} : {}} /> : <SavingsRoundedIcon style={deposit == 1 ? {color: "black"} : {}} />}
                            {theme == 'dark' ? <p style={deposit == 1 ? {color: "white"} : {}}>Deposit</p> : <p style={deposit == 1 ? {color: "black"} : {}}>Deposit</p>}
                        </div>

                        <div onClick={handleWithdraw} className="walletwButton">
                            {theme == 'dark' ? <AccountBalanceRoundedIcon style={withdraw == 1 ? {color: "white"} : {}} /> : <AccountBalanceRoundedIcon style={withdraw == 1 ? {color: "black"} : {}} />}
                            {theme == 'dark' ? <p style={withdraw == 1 ? {color: "white"} : {}}>Withdraw</p> : <p style={withdraw == 1 ? {color: "black"} : {}}>Withdraw</p>}
                        </div>
                    </div>

                    <div className="transactionTypes">
                        <div id="crypto" onClick={handleTransactionTypeCrypto} className={crypto == 1 ? "transactionTypeSelected" : ""}><p>Crypto</p></div>
                        <div id="fiat" onClick={handleTransactionTypeFiat} className={fiat == 1 ? "transactionTypeSelected" : ""}><p>Fiat</p></div>
                    </div>

                    {crypto == 1 ? 
                        <div className="transactionMain">
                            <div className="transactionCurrency">
                                <div className="options" onClick={handleCurrencyDropdown}>
                                    <img src={"https://www.shareicon.net/download/2015/09/14/101012_doge.svg"}></img>
                                    <h3>DOGE</h3>
                                    <ArrowDropDownRoundedIcon />
                                </div>

                                <div className="balance">
                                    <p>Balance</p>
                                    <h4>0</h4>
                                </div>
                            </div>

                            <div className="hiddenOptions displayNone">
                                <div className="option">
                                    <div style={{display: "flex"}}>
                                        <img src={"https://www.shareicon.net/download/2015/09/14/101012_doge.svg"}></img>
                                        <h3>DOGE</h3>
                                    </div>
                                    <h4>0.000</h4>
                                </div>

                                <div className="option">
                                    <div style={{display: "flex"}}>
                                        <img src={"https://www.shareicon.net/download/2015/09/14/101012_doge.svg"}></img>
                                        <h3>DOGE</h3>
                                    </div>  
                                    <h4>0.000</h4>
                                </div>

                                <div className="option">
                                    <div style={{display: "flex"}}>
                                        <img src={"https://www.shareicon.net/download/2015/09/14/101012_doge.svg"}></img>
                                        <h3>DOGE</h3>
                                    </div>
                                    <h4>0.000</h4>
                                </div>
                            </div>

                            <div className="withdrawAddressContainer">
                                {withdraw == 1 ? <p>Beneficiary Address</p> : <p>Depositer Address</p>}
                                <input type="text" placeholder="Fill in carefully according to the currency"></input>
                            </div>

                            <div className="withdrawAmountContainer">
                                {withdraw == 1 ? <p>Withdraw amount</p> : <p>Deposit Amount</p>}
                                <input type="text"></input>
                            </div>

                            <div className="withdrawAmountContainer">
                                <p>Your Private Key</p>
                                <input type="text"></input>
                            </div>

                            <div className="procesingFee">
                                <p>Fee <span style={{fontWeight: "800", color: "#3ABE17ff"}}>0.000043 BTC</span></p>
                            </div>

                            <div className="confirmButtonContainer">
                                <button className="confirmButton">Confirm</button>
                            </div>

                            <p className="securityNotice">For security purposes, large or suspicious withdrawal may take 1-6 hours for audit process. We appreciate your patience!</p>

                            <div className="twofa"><p>To secure your assets, please <span style={{fontWeight: "800", color: "#3ABE17ff"}}>Enable 2FA</span></p></div>
                        </div> : ""
                    }

                    {fiat == 1 ? 
                        <div className="transactionMain">
                            <div className="transactionCurrency">
                                <div className="options" onClick={handleCurrencyDropdown}>
                                    <img src={"https://bc.game/coin/IDR.black.png"}></img>
                                    <h3>IDR</h3>
                                    <ArrowDropDownRoundedIcon />
                                </div> 

                                <div className="balance">
                                    <p>Balance</p>
                                    <h4>0</h4>
                                </div>
                            </div>

                            <div className="widthdrawToContainer">
                                {withdraw == 1 ? <p>Withdraw To</p> : <p>Deposit From</p>}
                                <div className="withdrawToOptions">
                                    <div className="withdrawToOption">
                                        <img src={"https://img2.bc.game/fait/08/1f/3a/165839134887253.png"}></img>
                                        <p>20,000 ~ 10,000,000 IDR</p>
                                    </div>

                                    <div className="withdrawToOption">
                                        <img src={"https://img2.bc.game/fait/08/1f/3a/165839134887253.png"}></img>
                                        <p>20,000 ~ 10,000,000 IDR</p>
                                    </div>

                                    <div className="withdrawToOption">
                                        <img src={"https://img2.bc.game/fait/08/1f/3a/165839134887253.png"}></img>
                                        <p>20,000 ~ 10,000,000 IDR</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="twofa"><p>To secure your assets, please <span style={{fontWeight: "800", color: "#3ABE17ff"}}>Enable 2FA</span></p></div>
                        </div> 
                        : ""
                    }
                </div>
            </div>
        </>
    )
}
