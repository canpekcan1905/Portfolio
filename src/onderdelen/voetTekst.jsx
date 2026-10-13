import './voetTekst.css'

function VoetTekst() {
    return (
        <footer className="voet">
            <span>Ontworpen en gebouwd door Dzhan Pekdzhan</span>
            <span>&copy; {new Date().getFullYear()} Dzhan Pekdzhan</span>
        </footer>
    )
}

export default VoetTekst
