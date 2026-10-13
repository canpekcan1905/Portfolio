import './contact.css'

const CONTACT_LINKS = [
    { label: 'LinkedIn', waarde: 'linkedin.com/in/dzhan-pekdzhan-6461473a0', href: 'https://www.linkedin.com/in/dzhan-pekdzhan-6461473a0/' },
    { label: 'GitHub', waarde: 'github.com/canpekcan1905', href: 'https://github.com/canpekcan1905' },
    { label: 'E-mail', waarde: 'can664998@gmail.com', href: 'mailto:can664998@gmail.com' },
]

function Contact() {
    return (
        <section className="contact verschijn" id="contact">
            <div className="contact__grid">
                <div>
                    <p className="kicker">Contact</p>
                    <h2 className="contact__titel">Een project of stage bespreken?</h2>
                    <p className="contact__tekst">Stuur me een mail of een bericht via LinkedIn. Ik vertel je graag meer over mijn werk en projecten.</p>
                </div>
                <address className="contact__lijst">
                    <ul>
                        {CONTACT_LINKS.map((contact) => (
                            <li key={contact.label}>
                                <a
                                    className="contact__rij"
                                    href={contact.href}
                                    // Mail opent je mailprogramma, de andere links een nieuw tabblad
                                    target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
                                    rel="noreferrer"
                                >
                                    <span className="contact__label">{contact.label}</span>
                                    <span className="contact__waarde">{contact.waarde}</span>
                                    <span className="contact__pijl" aria-hidden="true">&#8599;</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </address>
            </div>
        </section>
    )
}

export default Contact
