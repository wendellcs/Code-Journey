import { useEffect, useState } from 'react'
import logoDetail from '../../../assets/images/logo-detail.svg'
import { Link } from 'react-router-dom'
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


    const headerDivClasses = clsx(
        'flex gap-4 w-fit mx-auto transition-all items-center',
        scrolled ? 'my-1' : 'my-2'
    )

    const titleClasses = clsx(
        'font-medium z-1 transition-all max-sm:text-2xl',
        scrolled ? 'text-2xl max-sm:text-lg' : 'text-[42px] '
    )

    const imgClasses = clsx(
        'max-sm:w-22',
        scrolled && 'w-30 max-sm:w-20'
    )

    return (
        <header className='fixed w-full z-2 transition-all noise bg-primary-gradient'>
            <div className={ headerDivClasses }>
                <img src={logoDetail} alt="Logo details" className={imgClasses}/>
                <h2 className={titleClasses}><Link to={'/'}>Code <span className='text-gradient'>Journey</span></Link></h2>
                <img src={logoDetail} alt="Logo details" className={`transform rotate-y-180 ${imgClasses}`}/>
            </div>
        </header>
    )
}