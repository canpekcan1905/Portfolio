import './artikels.css'

const INZICHTEN = [
    {
        tag: 'Patchwork · Java',
        titel: 'Spelregels eerst, interface daarna',
        tekst: 'Door de regels en scoreberekening los van de interface uit te werken, bleef de spelstructuur overzichtelijk toen ik meerdere niveaus voor de tegenstander toevoegde.',
    },
    {
        tag: 'Bibliotheeksysteem · MySQL',
        titel: 'Databankstructuur vanuit gebruik ontwerpen',
        tekst: 'De vragen die studenten willen beantwoorden — wat is beschikbaar en wat heb ik geleend — hielpen mij bepalen hoe collectie, beschikbaarheid en ontleningen samenhangen.',
    },
    {
        tag: 'React · JavaFX',
        titel: 'Wat ik meeneem van JavaFX naar React',
        tekst: 'Componenten en events komen in beide omgevingen terug. Het bouwen voor het web vraagt daarnaast om extra aandacht voor responsive gedrag en toegankelijkheid.',
    },
]

function Artikels() {
    return (
        <section className="artikels" id="artikels">
            <div className="artikels__kop">
                <div>
                    <p className="kicker">Werkwijze</p>
                    <h2>Wat ik meeneem uit projecten</h2>
                </div>
                <p className="artikels__sub">Korte inzichten uit het bouwen en uitwerken van software.</p>
            </div>

            <ul className="artikels__grid verschijn">
                {INZICHTEN.map((inzicht) => (
                    <li key={inzicht.titel}>
                        <article className="artikel">
                            <p className="artikel__meta"><span>{inzicht.tag}</span></p>
                            <h3 className="artikel__titel">{inzicht.titel}</h3>
                            <p className="artikel__tekst">{inzicht.tekst}</p>
                            <p className="artikel__voet">Uit mijn projectwerk</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Artikels
