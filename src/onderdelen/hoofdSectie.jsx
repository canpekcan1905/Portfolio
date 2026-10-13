import './hoofdSectie.css'
import portret from '../assets/portfolio_foto.webp'

function HoofdSectie() {
    return (
        <section className="hero" id="home">
            <div className="hero__inhoud">
                <div className="hero__tekst">
                    <p className="hero__kicker">
                        <span className="hero__stip" />
                        Student Toegepaste Informatica <span aria-hidden="true">·</span> Antwerpen
                    </p>

                    <h1 className="hero__titel"><span>Dzhan</span><em>Pekdzhan</em></h1>

                    <p className="hero__rol">Software developer in opleiding</p>

                    <p className="hero__intro">
                        Ik bouw applicaties van databank tot interface. Mijn focus ligt op heldere logica,
                        bruikbare details en code die ook voor een ander goed te volgen is.
                    </p>

                    <div className="hero__acties">
                        <a className="knop knop--primair" href="#projecten">
                        Bekijk projecten <span aria-hidden="true">&#8599;</span>
                        </a>
                        <a className="knop knop--secundair" href="#contact">Neem contact op</a>
                    </div>

                    <ul className="hero__stack" aria-label="Technologieën">
                        <li>Java</li><li>C#</li><li>React</li><li>PostgreSQL</li>
                    </ul>
                </div>

                <figure className="hero__portret">
                    <img src={portret} alt="Dzhan Pekdzhan in Antwerpen" fetchPriority="high" />
                    <figcaption>
                        <span>Dzhan Pekdzhan</span>
                        <span>Antwerpen, België</span>
                    </figcaption>
                </figure>
            </div>
            <a className="hero__verder" href="#over">Scroll om verder te ontdekken <span aria-hidden="true">&#8595;</span></a>
        </section>
    )
}

export default HoofdSectie
