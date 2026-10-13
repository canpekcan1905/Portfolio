import { useEffect, useState } from 'react'

/**
 * Houdt bij:
 * - welke sectie momenteel in beeld is (actieveSectieId)
 * - of de pagina voldoende gescrold is om de header "geplakt" te tonen
 * - hoeveel procent van de pagina al gescrold is (scrollVoortgangPercentage)
 *
 * @param {string[]} sectieIds - de HTML id's van de secties die je wilt volgen
 */
export default function useActieveSectie(sectieIds) {
    const [actieveSectieId, setActieveSectieId] = useState(sectieIds[0])
    const [headerIsGeplakt, setHeaderIsGeplakt] = useState(false)
    const [scrollVoortgangPercentage, setScrollVoortgangPercentage] = useState(0)

    useEffect(() => {
        const drempelVoorGeplakteHeader = 40 // pixels vanaf de top
        const drempelVoorActieveSectie = 0.4 // 40% van de schermhoogte vanaf boven

        function berekenScrollStatus() {
            // 1. Bereken hoeveel procent van de pagina gescrold is
            const totaalScrollbareHoogte =
                document.documentElement.scrollHeight - window.innerHeight

            const nieuwePercentage =
                totaalScrollbareHoogte > 0
                    ? Math.min(1, window.scrollY / totaalScrollbareHoogte) * 100
                    : 0

            setScrollVoortgangPercentage(nieuwePercentage)

            // 2. Bepaal of de header "geplakt" moet worden (na een beetje scrollen)
            setHeaderIsGeplakt(window.scrollY > drempelVoorGeplakteHeader)

            // 3. Zoek welke sectie nu het meest "actief" is
            //    (de laatste sectie waarvan de bovenkant al voorbij de drempel is gescrold)
            let huidigeActieveSectie = sectieIds[0]

            for (const sectieId of sectieIds) {
                const sectieElement = document.getElementById(sectieId)
                if (!sectieElement) continue

                const afstandTotBovenkantScherm =
                    sectieElement.getBoundingClientRect().top

                const isSectieVoldoendeInBeeld =
                    afstandTotBovenkantScherm < window.innerHeight * drempelVoorActieveSectie

                if (isSectieVoldoendeInBeeld) {
                    huidigeActieveSectie = sectieId
                }
            }

            setActieveSectieId(huidigeActieveSectie)
        }

        window.addEventListener('scroll', berekenScrollStatus, { passive: true })
        berekenScrollStatus() // meteen uitvoeren bij het laden

        return () => window.removeEventListener('scroll', berekenScrollStatus)
    }, [sectieIds])

    return {
        actieveSectieId,
        headerIsGeplakt,
        scrollVoortgangPercentage,
    }
}