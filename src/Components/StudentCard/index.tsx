import imageExample from '../../assets/images/profile-example.png'
import { FaReact, FaHtml5, FaCss3Alt, FaPython, FaGitAlt, FaFigma } from "react-icons/fa";
import type { Student } from '../../Types/student';

type StudentCardProps = {
    studentData: Student
}


export const StudentCard = ({ studentData }: StudentCardProps) => {

    return (
        <div className='max-w-236.5 w-full mx-auto relative gradient-border rounded-3xl mt-20 max-md:max-w-150 max-sm:max-w-90'>

            {studentData?.tag !== '-' && <div className='tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-400 font-medium animate-gradient-shift bg-size-[200%] bg-secondary-gradient absolute -top-6 text-2xl w-fit right-5 z-10 py-1 px-3 rounded-lg'>{studentData.tag}</div>}
            
            <div className='bg-student-card-background z-2 relative p-6 rounded-3xl grid grid-cols-[1fr_1fr_1fr] max-md:grid-cols-2 max-sm:grid-cols-1'>
                <div className='max-md:col-span-2 max-md:max-w-70 max-md:mx-auto max-md:mb-8 max-sm:col-span-1'>
                    <div className='rounded-2xl p-0.5 max-w-60 min-w-50 bg-secondary-gradient mx-auto'>
                        <img src={imageExample} className='w-full max-w-75 aspect-square rounded-2xl' alt="Imagem do aluno" />
                    </div>
                    <h3 className='mt-4 text-3xl'>{studentData.first_name + ' ' + studentData.last_name}</h3>
                </div>

                <div className='flex flex-col text-left gap-5 ml-2 max-md:col-end-2 max-md:text-center max-md:ml-0 max-sm:col-end-auto max-sm:mb-8'>
                    <h3 className='text-2xl'>Dados do aluno</h3>

                    <ul className='grid gap-4 text-lg  p-2 rounded-lg'>
                        <li>Módulo: {studentData.current_module}</li>
                        <li>Ranking da turma <br /> <span>#3</span></li>
                        <li>Ranking geral <br /> <span>#15</span></li>
                    </ul>
                </div>

                <div className='flex flex-col items-center border-l max-sm:border-0'>
                    <h3 className='text-2xl'>Atributos</h3>
                    <div className='mt-4'>
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