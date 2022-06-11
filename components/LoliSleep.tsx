import React, {useEffect, useState, useRef} from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import softBreathing from "../assets/icons/softbreathing.png"
import softBreathingChecked from "../assets/icons/softbreathing-checked.png"
import softMoaning from "../assets/icons/softmoaning.png"
import softMoaningChecked from "../assets/icons/softmoaning-checked.png"
import softNoises from "../assets/icons/softnoises.png"
import softNoisesChecked from "../assets/icons/softnoises-checked.png"
import softNoises2 from "../assets/icons/softnoises2.png"
import softNoises2Checked from "../assets/icons/softnoises2-checked.png"
import loli1 from "../assets/images/loli1.png"
import loli2 from "../assets/images/loli2.jpg"
import loli3 from "../assets/images/loli3.jpg"
import loliBreathingTrack from "../assets/lolibreathing.mp3"
import loliMoaningTrack from "../assets/lolimoaning.mp3"
import loliSoundsTrack from "../assets/lolisounds.mp3"
import loliSounds2Track from "../assets/lolisounds2.mp3"
import "../styles/lolisleep.less"

const images = [loli1, loli2, loli3]

let lastPos = 0

const LoliSleep: React.FunctionComponent = (props) => {
    const progressBar = useRef(null) as React.RefObject<HTMLProgressElement>
    let [track, setTrack] = useState("")
    let [image, setImage] = useState(loli1)
    let [playTrigger, setPlayTrigger] = useState(false)

    useEffect(() => {
        if (playTrigger) play()
    })

    useEffect(() => {
        document.title = "Soft Loli Breathing"

        window.setInterval(() => {
            const audio = document.getElementById("loli-audio") as HTMLAudioElement
            let percent = (audio.currentTime / audio.duration) * 100
            if (Number.isNaN(percent)) return
            progressBar.current!.value = percent
        }, 1000)
    }, [])

    const getTrack = () => {
        if (track === "soft-breathing") return loliBreathingTrack
        if (track === "soft-moaning") return loliMoaningTrack
        if (track === "soft-noises") return loliSoundsTrack
        if (track === "soft-noises2") return loliSounds2Track
        return ""
    }

    const changeImageInit = (event: any) => {
        lastPos = event.clientY
    }

    const changeImage = (event: any) => {
        if (Math.abs(lastPos - event.clientY) > 3) return
        let index = images.findIndex((i) => i === image)
        if (index >= images.length - 1) index = -1
        setImage(images[index + 1])
    }
    
    const play = async () => {
        const audio = document.getElementById("loli-audio") as HTMLAudioElement
        if (track) audio.play()
        setPlayTrigger(false)
    }

    const changeTrack = (name: string) => {
        if (track === name) {
            setTrack("")
        } else {
            setTrack(name)
        }
        setPlayTrigger(true)
    }

    const seek = (event: React.MouseEvent<HTMLProgressElement>) => {
        let percent = event.nativeEvent.offsetX / progressBar.current!.offsetWidth
        const audio = document.getElementById("loli-audio") as HTMLAudioElement
        audio.currentTime = percent * audio.duration
    }

    return (
        <>
        <NavBar/>
        <section className="lolisleep">
            <p className="loli-text">Soft loli breathing and moaning.</p>
            <div className="loli-checkmarks">
                <img className="loli-checkmark" src={track === "soft-breathing" ? softBreathingChecked : softBreathing} width="207" height="36" onClick={() => changeTrack("soft-breathing")}/>
                <img className="loli-checkmark" src={track === "soft-moaning" ? softMoaningChecked : softMoaning} width="207" height="36" onClick={() => changeTrack("soft-moaning")}/>
                <img className="loli-checkmark" src={track === "soft-noises" ? softNoisesChecked : softNoises} width="207" height="36" onClick={() => changeTrack("soft-noises")}/>
                <img className="loli-checkmark" src={track === "soft-noises2" ? softNoises2Checked : softNoises2} width="207" height="36" onClick={() => changeTrack("soft-noises2")}/>
            </div>
            <audio id="loli-audio" src={getTrack()} loop></audio>
            <div className="progress-container">
                <progress ref={progressBar} max="100" onClick={(event) => seek(event)} defaultValue="0" value="0" style={{display: track ? "flex" : "none"}}></progress>
            </div>
            <div className="loli-img-container">
                <img className="loli-image" src={image} onMouseDown={changeImageInit} onMouseUp={changeImage}/>
            </div>
        </section>
        <Footer track={getTrack()}/>
        </>
    )
}

export default LoliSleep