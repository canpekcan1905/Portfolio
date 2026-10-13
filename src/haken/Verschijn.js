import { useEffect } from 'react'

// De CSS-klasse die wordt toegevoegd zodra een element in beeld scrolt.
// Pas deze aan als je CSS een andere naam gebruikt (bv. "in-beeld").
const ZICHTBARE_KLASSE = 'zichtbaar'

// Vanaf hoeveel procent van het element zichtbaar moet zijn voor we het
// als "verschenen" beschouwen.
const ZICHTBAARHEID_DREMPEL = 0.15

/**
 * Geeft elk element met de klasse "verschijn" een fade/slide-in effect
 * zodra het voor het eerst in beeld scrolt. Dit gebeurt door de klasse
 * ZICHTBARE_KLASSE toe te voegen, waarna de eigenlijke animatie in CSS
 * geregeld wordt (bv. via een transition op opacity/transform).
 *
 * Elk element wordt maar één keer geanimeerd: zodra het zichtbaar is
 * geworden, stoppen we met het te observeren.
 */
export default function useVerschijn() {
    useEffect(() => {
        const teObserverenElementen = document.querySelectorAll('.verschijn')

        // Als de browser geen IntersectionObserver ondersteunt, toon alles
        // meteen in plaats van de animatie te laten mislukken.
        if (!('IntersectionObserver' in window)) {
            teObserverenElementen.forEach((element) => element.classList.add(ZICHTBARE_KLASSE))
            return
        }

        const observer = new IntersectionObserver(
            (entries, huidigeObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return

                    entry.target.classList.add(ZICHTBARE_KLASSE)
                    huidigeObserver.unobserve(entry.target)
                })
            },
            { threshold: ZICHTBAARHEID_DREMPEL }
        )

        teObserverenElementen.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [])
}