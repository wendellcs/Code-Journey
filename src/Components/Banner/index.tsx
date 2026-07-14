import { Aurora } from "../Aurora"
import { AnimatedArrowsIcon } from "../AnimatedArrowsIcon"

export const Banner = () => {
    return (
        <section className="banner bg-banner-gradient text-center flex justify-center flex-col aurora-container h-dvh relative before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center_65%,transparent_40%,rgba(0,0,0,0.7)_100%)]">
            <div className="absolute inset-0 overflow-hidden">
                <Aurora type={'two'} className={'top-0 left-0 animate-float-left'} />
            </div>

            <div className="relative flex gap-10 flex-col">
                <h1 className="text-[42px] text-center font-medium text-secondary-gradient">Onde o progresso dos alunos ganha vida</h1>
                <h2 className="text-xl">Acompanhe evolução, conquistas e domínio de tecnologias em um <br />ambiente moderno e interativo</h2>
                <button className="btn w-60 h-10 mx-auto btn-gradient">Explorar</button>
            </div>

            <div className="absolute inset-0 overflow-hidden">
                <Aurora type={'one'} className={'top-0 right-0 animate-float'} />
            </div>

            <AnimatedArrowsIcon position='left-[15%] bottom-30'/>
            <AnimatedArrowsIcon position='right-[15%] bottom-30'/>

            <div className="absolute -bottom-3 left-0 w-full h-10 backdrop-blur-xs z-1"></div>
        </section>
    )
}
