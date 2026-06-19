import logo from '../../assets/images/logo-detail.svg'
export const Footer = () => {
    return (
        <footer className="h-78 text-center py-10 primary-gradient">
            <img src={logo} alt="Nossa logo" className='mx-auto w-full max-w-60 mb-5' />
            <h2 className='text-[42px] font-medium z-1'>Code <span className='text-gradient'>Journey</span></h2>
            
            <p className='text-sm mt-10'>Code Journey &copy; Todos os direitos reservados</p>
        </footer>
    )
}