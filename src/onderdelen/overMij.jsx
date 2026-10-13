import './overMij.css'
import portret from '../assets/portfolio_foto.webp'

const TECHNOLOGIE_STACKS = [
    { titel: 'Back-end', items: 'Java / C# / Python / PostgreSQL / MySQL / Node.js' },
    { titel: 'Front-end', items: 'JavaScript / TypeScript / React / HTML / CSS' },
    { titel: 'Desktop', items: 'JavaFX / .NET' },
    { titel: 'Tools', items: 'Git / Linux / Vite / IntelliJ / VS Code' },
]

function OverMij() {
    return (
        <section className="overmij" id="over">
            <p className="kicker">Over mij</p>
            <h2 className="overmij__sectietitel">De logica achter de interface.</h2>

            <div className="overmij__grid verschijn">
                <article className="overmij__tekstkolom">
                    <p className="overmij__lead">
                        Ik ben Dzhan Pekdzhan, student Toegepaste Informatica aan de
                        Karel de Grote Hogeschool in Antwerpen.
                    </p>

                    <p className="overmij__tekst">
                        In mijn projecten combineer ik technische uitwerking met aandacht voor de mensen
                        die de software gebruiken. Ik werk graag aan de logica achter een applicatie:
                        van een heldere databankstructuur tot een interface die vanzelfsprekend aanvoelt.
                        Nieuwe technieken leer ik het liefst door ze in een concreet project toe te passen.
                    </p>

                    <ul className="stack">
                        {TECHNOLOGIE_STACKS.map((stackGroep) => (
                            <li className="stack__kaart" key={stackGroep.titel}>
                                <h3 className="stack__titel">{stackGroep.titel}</h3>
                                <p className="stack__items">{stackGroep.items}</p>
                            </li>
                        ))}
                    </ul>

                    <p className="stack__voetnoot">
                        Technologieën die ik heb toegepast in projecten en tijdens mijn opleiding.
                    </p>
                </article>

                <figure className="overmij__beeld">
                    <img className="overmij__foto" src={portret} alt="Dzhan Pekdzhan" />
                    <figcaption className="overmij__plaats">Antwerpen, BE</figcaption>
                </figure>
            </div>
        </section>
    )
}

export default OverMij
