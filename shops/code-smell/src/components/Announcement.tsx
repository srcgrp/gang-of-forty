import { useEffect } from "react"
import Typed from "typed.js"

type AnnouncementProps = {
    notice: string
}

export default function Announcement({ notice }: AnnouncementProps) {
    useEffect(function () {
        const typed = new Typed("#announcement", {
            strings: [notice],
            typeSpeed: 30,
            loop: true,
            showCursor: false,
            contentType: "null"
        })

        return function () {
            typed.destroy()
        }
    }, [notice])

    return <p className="announcement" id="announcement" />
}