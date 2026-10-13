import { useState } from 'react'
import './navigatie.css'

const MENU = [
    { label: 'Over mij', href: '#over', id: 'over' },
    { label: 'Projecten', href: '#projecten', id: 'projecten' },
    { label: 'Inzichten', href: '#artikels', id: 'artikels' },
]

function Navigatie({ tema, wisselTema, actieveSectie, geplakt }) {
    const [open, setOpen] = useState(false)

    return (
        <header className={'navigatie' + (geplakt ? ' geplakt' : '')}>
            <a className="navigatie__merk" href="#home" aria-label="Dzhan Pekdzhan, naar beginpagina">
                <span className="navigatie__monogram">DP</span>
                <span>Dzhan Pekdzhan</span>
            </a>

            <button
                className={'navigatie__menuknop' + (open ? ' open' : '')}
                onClick={() => setOpen((huidig) => !huidig)}
                aria-label={open ? 'Menu sluiten' : 'Menu openen'}
                aria-expanded={open}
                aria-controls="hoofdmenu"
            >
                <span /><span /><span />
            </button>

            <nav className={'menu' + (open ? ' menu--open' : '')} id="hoofdmenu" aria-label="Hoofdnavigatie">
                <ul className="menu__lijst">
                    {MENU.map((item) => (
                        <li key={item.id}>
                            <a
                                className={'menu__link' + (actieveSectie === item.id ? ' actief' : '')}
                                href={item.href}
                                onClick={() => setOpen(false)}
                            >{item.label}</a>
                        </li>
                    ))}
                </ul>

                <div className="navigatie__acties">
                    <button className="navigatie__tema" onClick={wisselTema} aria-label={tema === 'donker' ? 'Schakel naar licht thema' : 'Schakel naar donker thema'}>
                        <span aria-hidden="true">{tema === 'donker' ? '☼' : '◐'}</span>
                    </button>
                    <a className="navigatie__contact" href="#contact" onClick={() => setOpen(false)}>Contact <span aria-hidden="true">&#8599;</span></a>
                </div>
            </nav>
        </header>
    )
}

export default Navigatie
