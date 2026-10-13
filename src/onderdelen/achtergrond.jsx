import {useEffect, useRef} from 'react'
import './achtergrond.css'

/**
 * Achtergrondanimatie met langzaam driftende "plusjes" (kleine kruisjes),
 * die licht meebewegen met de muis (parallax-effect).
 */
function Achtergrond() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvasElement = canvasRef.current
        if (!canvasElement) return

        const tekenContext = canvasElement.getContext('2d')

        // --- Instellingen ---
        const aantalPlusjes = 90
        const gebruikerWilMinderBeweging = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const snelheidVanMuisVolgen = 0.05 // hoe snel de parallax de muis "inhaalt"
        const tijdStapPerFrame = 0.12
        const maxParallaxVerschuivingX = 34
        const maxParallaxVerschuivingY = 26
        const golfHoogte = 6 // verticale golfbeweging van elk plusje
        const golfSnelheid = 0.02

        // --- Genereer de plusjes met willekeurige positie, diepte en grootte ---
        // x/y zijn relatieve posities (0 tot 1), diepte bepaalt hoe sterk de
        // parallax en drift werken, grootte is de straal van het plusje in pixels.
        const plusjes = Array.from({length: aantalPlusjes}, () => ({
            x: Math.random(), y: Math.random(), diepte: 0.4 + Math.random() * 0.8, grootte: 3 + Math.random() * 4,
        }))

        // Huidige en doel-muispositie (relatief, 0 tot 1), voor vloeiende parallax
        let huidigeMuisX = 0.5
        let huidigeMuisY = 0.5
        let doelMuisX = 0.5
        let doelMuisY = 0.5
        let verstrekenTijd = 0
        let animatieFrameId = 0

        // Haalt de achtergrondkleur van het huidige thema op,
        // met een lichtgrijze fallback als die niet gevonden wordt.
        function haalPlusjesKleurOp() {
            const themaElement = document.querySelector('[data-tema]')
            const themaKleur = themaElement && getComputedStyle(themaElement).getPropertyValue('--canvaskleur').trim()

            return themaKleur || 'rgba(244,244,243,0.16)'
        }

        // Zet de canvas-grootte gelijk aan het scherm, rekening houdend met
        // scherpe (retina) schermen, tot een maximum van 2x pixel-dichtheid.
        function pasCanvasGrootteAan() {
            const pixelDichtheid = Math.min(window.devicePixelRatio || 1, 2)
            canvasElement.width = window.innerWidth * pixelDichtheid
            canvasElement.height = window.innerHeight * pixelDichtheid
            tekenContext.setTransform(pixelDichtheid, 0, 0, pixelDichtheid, 0, 0)
        }

        // Onthoudt waar de muis naartoe beweegt, als relatieve positie (0 tot 1)
        function onthoudMuisPositie(event) {
            doelMuisX = event.clientX / window.innerWidth
            doelMuisY = event.clientY / window.innerHeight
        }

        // Eén animatieframe: beweeg alles een klein beetje en teken opnieuw
        function tekenFrame() {
            const schermBreedte = window.innerWidth
            const schermHoogte = window.innerHeight

            // Vloeiend naar de muispositie toe bewegen (in plaats van abrupt springen)
            huidigeMuisX += (doelMuisX - huidigeMuisX) * snelheidVanMuisVolgen
            huidigeMuisY += (doelMuisY - huidigeMuisY) * snelheidVanMuisVolgen

            if (!gebruikerWilMinderBeweging) {
                verstrekenTijd += tijdStapPerFrame
            }

            tekenContext.clearRect(0, 0, schermBreedte, schermHoogte)
            tekenContext.strokeStyle = haalPlusjesKleurOp()
            tekenContext.lineWidth = 1

            plusjes.forEach((plusje, index) => {
                // Horizontale positie: drift naar rechts die "wrapt" om het scherm,
                // plus een kleine verschuiving op basis van de muispositie (parallax)
                const parallaxX = (huidigeMuisX - 0.5) * maxParallaxVerschuivingX * plusje.diepte
                const positieX = ((plusje.x * schermBreedte + verstrekenTijd * plusje.diepte) % (schermBreedte + 60)) - 30 + parallaxX

                // Verticale positie: lichte golfbeweging plus parallax op basis van de muis
                const golfBeweging = Math.sin((verstrekenTijd * golfSnelheid + index) * 0.6) * golfHoogte
                const parallaxY = (huidigeMuisY - 0.5) * maxParallaxVerschuivingY * plusje.diepte
                const positieY = plusje.y * schermHoogte + golfBeweging + parallaxY

                // Teken een plusje als twee gekruiste lijntjes
                tekenContext.beginPath()
                tekenContext.moveTo(positieX - plusje.grootte, positieY)
                tekenContext.lineTo(positieX + plusje.grootte, positieY)
                tekenContext.moveTo(positieX, positieY - plusje.grootte)
                tekenContext.lineTo(positieX, positieY + plusje.grootte)
                tekenContext.stroke()
            })

            animatieFrameId = requestAnimationFrame(tekenFrame)
        }

        pasCanvasGrootteAan()
        tekenFrame()

        window.addEventListener('resize', pasCanvasGrootteAan)
        window.addEventListener('pointermove', onthoudMuisPositie, {passive: true})

        return () => {
            cancelAnimationFrame(animatieFrameId)
            window.removeEventListener('resize', pasCanvasGrootteAan)
            window.removeEventListener('pointermove', onthoudMuisPositie)
        }
    }, [])

    return <canvas className="achtergrond" ref={canvasRef} aria-hidden="true"/>
}

export default Achtergrond
