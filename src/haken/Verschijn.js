import { useEffect } from 'react'

// Elementen met de klasse "verschijn" faden in zodra ze in beeld komen.
// De animatie zelf staat in index.css.
export default function useVerschijn() {
    useEffect(() => {
        const observer = new IntersectionObserver((items) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.classList.add('zichtbaar')
                    observer.unobserve(item.target) // maar één keer animeren
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('.verschijn').forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])
}
