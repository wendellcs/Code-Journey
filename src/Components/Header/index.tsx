import logoDetail from '../../assets/images/logo-detail.svg'

export const Header = () => {
    return (
        <header className='flex items-center justify-center h-20 gap-4 noise primary-gradient relative'>
            <img src={logoDetail} alt="Logo details" />
            <h2 className='text-[42px] font-medium z-1'>Code <span className='text-gradient'>Journey</span></h2>
            <img src={logoDetail} alt="Logo details" className='transform rotate-y-180' />
        </header>
    )
}