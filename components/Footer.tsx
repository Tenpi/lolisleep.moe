import React, {useState, useEffect} from "react"
import laffey from "../assets/images/laffeychibi.png"
import logo2 from "../assets/icons/logo2.png"
import logo2Hover from "../assets/icons/logo2-hover.png"
import "../styles/footer.less"

interface Props {
    track?: string
}

const Footer: React.FunctionComponent<Props> = (props: Props) => {
    let [logoHoverOn, setLogoHover] = useState(false)

    const download = () => {
        if (props.track) {
            const a = document.createElement("a")
            a.href = props.track
            const arr = props.track.split("/")
            a.download = arr[arr.length - 1]
            document.documentElement.appendChild(a)
            a.click()
            setTimeout(() => {document.documentElement.removeChild(a)}, 1000)
        }
    }

    return (
        <>
        <footer className="footer">
            <div className="footer-column">
                <img src={logoHoverOn ? logo2Hover : logo2} className="footer-logo" width="385" height="87"
                onClick={() => window.location.href = "/"} onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)}/>
                <p className="footer-text">Listen to soft loli breathing and moaning. <br/>Have a good time sleeping!</p>
                <p className="footer-text active" onClick={download}>Download</p>
                <p className="footer-text active" onClick={() => window.open("https://github.com/Tenpi/lolisleep.moe", "__blank")}>Source</p>
                <p className="footer-text active" onClick={() => window.open("https://moebooru.moe", "__blank")}>moebooru.moe</p>
                <p className="footer-text active" onClick={() => window.open("https://kisaragi.moe", "__blank")}>kisaragi.moe</p>
                <p className="footer-text-small">Copyright © {new Date().getFullYear()} Tenpi</p>
            </div>
            <img src={laffey} className="laffey" width="240" height="288"/>
        </footer>
        </>
    )
}

export default Footer