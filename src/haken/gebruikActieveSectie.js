import { useEffect, useState } from 'react'

// Houdt bij welke sectie in beeld is, of de header een rand moet krijgen
// en hoe ver de bezoeker al gescrold heeft (voor de balk bovenaan).
export default function useActieveSectie(secties) {
    const [actieveSectie, setActieveSectie] = useState(secties[0])
    const [geplakt, setGeplakt] = useState(false)
    const [voortgang, setVoortgang] = useState(0)

    useEffect(() => {
        function bijScrollen() {
            const scrollbaar = document.documentElement.scrollHeight - window.innerHeight
            setVoortgang(scrollbaar > 0 ? (window.scrollY / scrollbaar) * 100 : 0)

            setGeplakt(window.scrollY > 40)

            // De actieve sectie is de laatste waarvan de bovenkant
            // al boven 40% van het scherm zit
            let actief = secties[0]
            for (const id of secties) {
                const sectie = document.getElementById(id)
                if (sectie && sectie.getBoundingClientRect().top < window.innerHeight * 0.4) {
                    actief = id
                }
            }
            setActieveSectie(actief)
        }

        bijScrollen()
        window.addEventListener('scroll', bijScrollen, { passive: true })
        return () => window.removeEventListener('scroll', bijScrollen)
    }, [secties])

    return { actieveSectie, geplakt, voortgang }
}
