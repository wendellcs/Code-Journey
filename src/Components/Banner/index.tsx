import { Aurora } from "../Aurora"

export const Banner = () => {
    return (
        <section className="aurora-container min-h-dvh relative" >
            <Aurora type={'two'} className = {'top-0 left-0'}/>
            <h1>Onde o progresso dos alunos ganha vida</h1>
            <h2>Acompanhe evolução, conquistas e domínio de tecnologias em um <br />ambiente moderno e interativo</h2>
            <button>Explorar</button>
            <Aurora type={'one'} className = {'top-0 right-0'}/>
        </section>
    )
}