import imageExample from '../../assets/images/profile-example.png'
import { FaReact, FaHtml5, FaCss3Alt, FaPython, FaGitAlt, FaFigma } from "react-icons/fa";

export const StudentCard = () => {
    return (
        <div className='max-w-236.5 w-full mx-auto p-px border rounded-3xl mt-20 border-transparent [background:linear-gradient(var(--color-metrics-background),var(--color-metrics-background))_padding-box,linear-gradient(90deg,rgba(137,11,114,0.92)_0%,#D773FF_43%,#2E4F78_71%,#ADD2FF_96%)_border-box] max-md:max-w-150 max-sm:max-w-90'>
            <div className='bg-student-card-background p-5 rounded-3xl grid grid-cols-[1fr_1fr_1fr] max-md:grid-cols-2 max-sm:grid-cols-1'>
                <div className='max-md:col-span-2 max-md:max-w-70 max-md:mx-auto max-md:mb-8 max-sm:col-span-1'>
                    <h3>Nome do aluno</h3>
                    <div className='rounded-2xl p-0.5 bg-secondary-gradient'>
                        <img src={imageExample} className='w-full h-50 rounded-2xl' alt="Imagem do aluno" />
                    </div>
                </div>

                <div className='flex flex-col justify-center gap-5 max-md:col-end-2 max-sm:col-end-auto max-sm:mb-8'>
                    <h3>Turma</h3>

                    <div>
                        <h4>Ranking</h4>

                        <div className='flex gap-10 mt-2.5 justify-center'>
                            <div>
                                <h5>Turma</h5>
                                <p>1°</p>
                            </div>
                            <div>
                                <h5>Geral</h5>
                                <p>3°</p>
                            </div>
                        </div>
                    </div>

                    <h4>Tecnologias aprendidas</h4>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <div>
                        {/* Criar um gradient nos ícones ( mudar para a cor original da logo com o hover? ) */}
                        <h3>Ponto forte</h3>
                        <div className='flex gap-3.5 mt-2.5'>
                            <FaReact className='icon' />
                            <FaHtml5 className='icon' />
                            <FaCss3Alt className='icon' />
                        </div>
                    </div>
                    <div className='mt-10'>
                        <h3>Ponto fraco</h3>
                        <div className='flex gap-3.5 mt-2.5'>
                            <FaPython className='icon' />
                            <FaGitAlt className='icon' />
                            <FaFigma className='icon' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}