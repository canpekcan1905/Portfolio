import { useEffect, useRef } from 'react'
import './achtergrond.css'

// Kleine plusjes die traag over het scherm bewegen
// en een beetje meeschuiven met de muis.
function Achtergrond() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const stilstaan = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // x en y zijn tussen 0 en 1, zodat ze bij elke schermgrootte passen
        const plusjes = []
        for (let i = 0; i < 90; i++) {
            plusjes.push({
                x: Math.random(),
                y: Math.random(),
                diepte: 0.4 + Math.random() * 0.8,
                grootte: 3 + Math.random() * 4,
            })
        }

        const muis = { x: 0.5, y: 0.5 }
        const doel = { x: 0.5, y: 0.5 }
        let tijd = 0
        let frame
        let thema = null
        let kleur = ''

        function pasGrootteAan() {
            const dichtheid = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = window.innerWidth * dichtheid
            canvas.height = window.innerHeight * dichtheid
            ctx.setTransform(dichtheid, 0, 0, dichtheid, 0, 0)
        }

        function volgMuis(e) {
            doel.x = e.clientX / window.innerWidth
            doel.y = e.clientY / window.innerHeight
        }

        function teken() {
            const breedte = window.innerWidth
            const hoogte = window.innerHeight

            // Muis langzaam volgen in plaats van meteen te springen
            muis.x += (doel.x - muis.x) * 0.05
            muis.y += (doel.y - muis.y) * 0.05
            if (!stilstaan) tijd += 0.12

            ctx.clearRect(0, 0, breedte, hoogte)
            // Kleur enkel opnieuw opvragen als het thema gewisseld is
            if (document.documentElement.dataset.thema !== thema) {
                thema = document.documentElement.dataset.thema
                kleur = getComputedStyle(document.documentElement).getPropertyValue('--canvaskleur')
            }
            ctx.strokeStyle = kleur
            ctx.lineWidth = 1

            plusjes.forEach((p, i) => {
                const x = ((p.x * breedte + tijd * p.diepte) % (breedte + 60)) - 30
                    + (muis.x - 0.5) * 34 * p.diepte
                const y = p.y * hoogte
                    + Math.sin((tijd * 0.02 + i) * 0.6) * 6
                    + (muis.y - 0.5) * 26 * p.diepte

                ctx.beginPath()
                ctx.moveTo(x - p.grootte, y)
                ctx.lineTo(x + p.grootte, y)
                ctx.moveTo(x, y - p.grootte)
                ctx.lineTo(x, y + p.grootte)
                ctx.stroke()
            })

            frame = requestAnimationFrame(teken)
        }

        pasGrootteAan()
        teken()
        window.addEventListener('resize', pasGrootteAan)
        window.addEventListener('pointermove', volgMuis, { passive: true })

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('resize', pasGrootteAan)
            window.removeEventListener('pointermove', volgMuis)
        }
    }, [])

    return <canvas className="achtergrond" ref={canvasRef} aria-hidden="true" />
}

export default Achtergrond
