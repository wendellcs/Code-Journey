import { Aurora } from "../Aurora"

export const Banner = () => {
    return (
        <section className="bg-banner-gradient text-center flex justify-center flex-col overflow-hidden aurora-container h-175 relative" >
            <Aurora type={'two'} className={'top-0 left-0 animate-float-left'} />

            <div className="relative flex gap-10 flex-col">
                <h1 className="text-[42px] text-center font-medium text-secondary-gradient">Onde o progresso dos alunos ganha vida</h1>
                <h2 className="text-xl">Acompanhe evolução, conquistas e domínio de tecnologias em um <br />ambiente moderno e interativo</h2>
                <button className="btn w-60 h-10 mx-auto btn-gradient">Explorar</button>
            </div>
            <Aurora type={'one'} className={'top-0 right-0 animate-float'} />
        </section>
    )
}
