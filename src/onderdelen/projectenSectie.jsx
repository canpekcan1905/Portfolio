import './projectenSectie.css'
import patchworkOverzicht from '../assets/patchwork-overzicht.webp'
import patchworkMenu from '../assets/patchwork-menu.webp'
import patchworkLanding from '../assets/patchwork-landing.webp'

const PROJECTEN = [
    {
        nummer: '01',
        titel: 'Patchwork',
        jaar: '2025',
        status: 'Schoolproject',
        soort: 'Desktopapplicatie · Java',
        tekst: 'Een digitale uitvoering van het bordspel Patchwork met een tegenstander op drie niveaus. Ik werkte de spelregels, scoreberekening en opslag van partijen uit.',
        tech: ['Java', 'JavaFX', 'PostgreSQL'],
        focus: ['Spelregels en scoreberekening', 'Tegenstander met drie niveaus', 'Opslag van gespeelde partijen'],
        beelden: [patchworkOverzicht, patchworkMenu, patchworkLanding],
    },
    {
        nummer: '02',
        titel: 'Bibliotheeksysteem',
        jaar: '2025',
        status: 'Schoolproject',
        soort: 'Webapplicatie · TypeScript',
        tekst: 'Een bibliotheekwebsite waar studenten de collectie kunnen doorzoeken, de beschikbaarheid bekijken en hun ontleningen opvolgen.',
        tech: ['TypeScript', 'HTML', 'CSS', 'MySQL'],
        focus: ['Collectie en beschikbaarheid', 'Ontleningen opvolgen', 'Verschillende gebruikersrollen'],
        beelden: [],
    },
    {
        nummer: '03',
        titel: 'Portfolio',
        jaar: '2026',
        status: 'In ontwikkeling',
        soort: 'Persoonlijke website · React',
        tekst: 'Een persoonlijke website om projecten te documenteren en mijn werk als software developer in opleiding overzichtelijk te presenteren.',
        tech: ['React', 'Vite', 'CSS'],
        focus: ['Responsive interface', 'Toegankelijke navigatie', 'Projectdocumentatie'],
        beelden: [],
    },
]

function Projectbeeld({ project }) {
    // Heeft het project screenshots? Toon dan een collage, anders een gekleurde cover
    if (project.beelden.length > 0) {
        return (
            <figure className="collage" aria-label={'Schermafbeeldingen van ' + project.titel}>
                {project.beelden.map((beeld, index) => (
                    <div className={'collage__vlak collage__vlak--' + index} key={beeld}>
                        <img src={beeld} alt={project.titel + ' interface'} loading="lazy" />
                    </div>
                ))}
            </figure>
        )
    }

    return (
        <div className={'project__cover project__cover--' + project.nummer} aria-hidden="true">
            <span className="project__covernummer">{project.nummer}</span>
            <span className="project__covernaam">{project.titel}</span>
            <span className="project__coversoort">{project.soort}</span>
        </div>
    )
}

function ProjectenSectie() {
    return (
        <section className="projecten" id="projecten">
            <div className="sectie-kop">
                <div>
                    <p className="kicker">Selectie uit mijn werk</p>
                    <h2>Projecten</h2>
                </div>
                <p>Van spelmechaniek tot databank en interface.</p>
            </div>

            <ol className="projecten__lijst">
                {PROJECTEN.map((project) => (
                    <li className="project verschijn" key={project.nummer}>
                        <article className="project__info">
                            <p className="project__meta">
                                <span>{project.nummer}</span>
                                <span>{project.status}</span>
                                <span>{project.jaar}</span>
                            </p>
                            <p className="project__soort">{project.soort}</p>
                            <h3 className="project__titel">{project.titel}</h3>
                            <p className="project__tekst">{project.tekst}</p>

                            <ul className="project__focus">
                                {project.focus.map((punt) => <li key={punt}>{punt}</li>)}
                            </ul>

                            <ul className="project__tech" aria-label="Gebruikte technologieën">
                                {project.tech.map((tech) => (
                                    <li className="project__tag" key={tech}>{tech}</li>
                                ))}
                            </ul>
                        </article>
                        <Projectbeeld project={project} />
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default ProjectenSectie
