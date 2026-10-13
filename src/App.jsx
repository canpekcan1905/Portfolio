import { useEffect, useState } from 'react'
import Achtergrond from './onderdelen/achtergrond.jsx'
import Navigatie from './onderdelen/navigatie.jsx'
import HoofdSectie from './onderdelen/hoofdSectie.jsx'
import OverMij from './onderdelen/overMij.jsx'
import ProjectenSectie from './onderdelen/projectenSectie.jsx'
import Artikels from './onderdelen/artikels.jsx'
import Contact from './onderdelen/contact.jsx'
import VoetTekst from './onderdelen/voetTekst.jsx'
import useVerschijn from './haken/Verschijn.js'
import useActieveSectie from './haken/gebruikActieveSectie.js'

const SECTIE_IDS = ['home', 'over', 'projecten', 'artikels', 'contact']
const THEMA_OPSLAG_SLEUTEL = 'cp-tema-v2'

function App() {
    // Thema wordt onthouden in localStorage, met licht als standaardwaarde
    const [thema, setThema] = useState(() => {
        const opgeslagenThema = localStorage.getItem(THEMA_OPSLAG_SLEUTEL)
        const isGeldigeWaarde = opgeslagenThema === 'licht' || opgeslagenThema === 'donker'
        return isGeldigeWaarde ? opgeslagenThema : 'donker'
    })

    const {
        actieveSectieId,
        headerIsGeplakt,
        scrollVoortgangPercentage,
    } = useActieveSectie(SECTIE_IDS)

    useVerschijn()

    // Sla het thema op en werk de globale <body>-klasse bij zodra het verandert
    useEffect(() => {
        localStorage.setItem(THEMA_OPSLAG_SLEUTEL, thema)
        document.body.classList.toggle('licht', thema === 'licht')
    }, [thema])

    function wisselThema() {
        setThema((huidigThema) => (huidigThema === 'donker' ? 'licht' : 'donker'))
    }

    return (
        <div className="app" data-tema={thema}>
            <Achtergrond />
            <div className="voortgang">
                <div
                    className="voortgang__balk"
                    style={{ width: scrollVoortgangPercentage + '%' }}
                />
            </div>

            <Navigatie
                tema={thema}
                wisselTema={wisselThema}
                actieveSectie={actieveSectieId}
                geplakt={headerIsGeplakt}
            />

            <HoofdSectie />
            <OverMij />
            <ProjectenSectie />
            <Artikels />
            <Contact />
            <VoetTekst />
        </div>
    )
}

export default App
