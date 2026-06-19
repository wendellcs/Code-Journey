import { useEffect, useState } from 'react'
import logoDetail from '../../assets/images/logo-detail.svg'
import clsx from 'clsx'

export const Header = () => {
    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const headerClasses = clsx(
        'fixed w-full z-2 transition-all noise',
        scrolled ? 'bg-primary-gradient' : 'bg-primary-gradient-transparent'
    )

    const headerDivClasses = clsx(
        'flex gap-4 w-fit mx-auto transition-all items-center',
        scrolled ? 'my-1' : 'my-2'
    )

    const titleClasses = clsx(
        'font-medium z-1 transition-all',
        scrolled ? 'text-2xl' : 'text-[42px] '
    )

    const imgClasses = clsx(
        scrolled && 'w-30'
    )

    return (
        <header className={headerClasses}>
            <div className={ headerDivClasses }>
                <img src={logoDetail} alt="Logo details" className={imgClasses}/>
                <h2 className={titleClasses}>Code <span className='text-gradient'>Journey</span></h2>
                <img src={logoDetail} alt="Logo details" className={`transform rotate-y-180 ${imgClasses}`}/>
            </div>
        </header>
    )
}