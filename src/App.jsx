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

const SECTIES = ['home', 'over', 'projecten', 'artikels', 'contact']

function App() {
    // Donker thema is de standaard, tenzij de bezoeker eerder licht koos
    const [thema, setThema] = useState(localStorage.getItem('thema') || 'donker')
    const { actieveSectie, geplakt, voortgang } = useActieveSectie(SECTIES)

    useVerschijn()

    // Het thema staat op <html>, zodat de kleuren overal op de pagina werken
    useEffect(() => {
        document.documentElement.dataset.thema = thema
        localStorage.setItem('thema', thema)
    }, [thema])

    function wisselThema() {
        setThema(thema === 'donker' ? 'licht' : 'donker')
    }

    return (
        <div className="app">
            <Achtergrond />

            <div className="voortgang">
                <div className="voortgang__balk" style={{ width: voortgang + '%' }} />
            </div>

            <Navigatie
                thema={thema}
                wisselThema={wisselThema}
                actieveSectie={actieveSectie}
                geplakt={geplakt}
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
