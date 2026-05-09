import { Aurora } from "../Aurora"

export const Banner = () => {
    return (
        <section className="text-center flex justify-center flex-col gap-10 overflow-hidden aurora-container h-175 relative bg-[radial-gradient(61.31%_274.2%_at_20.24%_87.15%,rgba(100,46,136,0.1)_0%,rgba(102,102,102,0)_100%)]" >
            <Aurora type={'two'} className={'top-0 left-0 animate-float-left'} />

            <h1 className="text-[42px] text-center font-medium text-secondary-gradient">Onde o progresso dos alunos ganha vida</h1>
            <h2 className="text-xl">Acompanhe evolução, conquistas e domínio de tecnologias em um <br />ambiente moderno e interativo</h2>
            <button className="btn w-60 h-10 mx-auto btn-gradient">Explorar</button>

            <Aurora type={'one'} className={'top-0 right-0 animate-float'} />

            <div
                className="absolute inset-0"
                style={{
                background: `
                    radial-gradient(15px 15px at 20% 30%, white, transparent),
                    radial-gradient(9px 9px at 70% 80%, #f59a9a, transparent),
                    radial-gradient(12px 12px at 45% 10%, #f59a9a, transparent),
                    radial-gradient(15px 15px at 40% 60%, white, transparent),
                    radial-gradient(8px 8px at 90% 10%, #dcb0f5, transparent),
                    radial-gradient(6px 6px at 10% 90%, #fff, transparent)
                `
                }}
            ></div>
        </section>
    )
}
