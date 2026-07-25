import { Aurora } from "../Aurora"
import { AnimatedArrowsIcon } from "../AnimatedArrowsIcon"

export const Banner = () => {
    return (
        <section className="banner bg-banner-gradient text-center flex justify-center flex-col aurora-container h-dvh relative before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center_65%,transparent_40%,rgba(0,0,0,0.7)_100%)]
        max-md:px-2.5">
            <div className="absolute inset-0 overflow-hidden">
                <Aurora type={'two'} className={'top-0 left-0 animate-float-left max-lg:left-[-15%]'} />
            </div>

            <div className="relative flex gap-10 flex-col z-1 max-sm:-mt-40">
                <h1 className="text-[42px] max-md:text-3xl text-center font-medium text-secondary-gradient">Onde o progresso dos alunos ganha vida</h1>
                <h2 className="text-xl w-full max-w-200 mx-auto max-md:text-lg">Acompanhe evolução, conquistas e domínio de tecnologias em um ambiente moderno e interativo</h2>
                <button className="w-60 h-10 text-lg mx-auto bg-button-primary-gradient transition duration-500 rounded-lg hover:animate-gradient-flow hover:bg-size-[150%_100%] hover:scale-102 hover:shadow-button-purple-glow">Explorar</button>
            </div>

            <div className="absolute inset-0 overflow-hidden max-md:hidden">
                <Aurora type={'one'} className={'top-0 right-0 animate-float max-lg:right-[-15%]'} />
            </div>

            <AnimatedArrowsIcon position='left-[15%] bottom-30'/>
            <AnimatedArrowsIcon position='right-[15%] bottom-30'/>

            <div className="absolute -bottom-3 left-0 w-full h-10 backdrop-blur-xs z-1"></div>
        </section>
    )
}
