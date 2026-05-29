import { Banner } from "../../Components/Banner"
import { FaRegStar } from "react-icons/fa";
import { ModuleCard } from "../../Components/ModuleCard";

import profileImage from '../../assets/images/profile-example.png'

export const Home = () => {
    // Provisório

    // title,
    // subtitle,
    // variant,
    // topStudent,
    // secondStudent
    const students = {
        module_1: {
            title: 'Módulo 1',
            subtitle: 'Lógica de programação',
            variant: 'blue',
            topStudent: {
                name: 'Aluno 1',
                avatar: profileImage,
                progress: 93,
                topics: 8
            },
            secondStudent: {
                name: 'Aluno 2',
                avatar: profileImage,
                progress: 78,
                topics: 3
            }
        },
        module_2: {
            title: 'Módulo 2',
            subtitle: 'Desenvolvimento web',
            variant: 'orange',
            topStudent: {
                name: 'Aluno 1',
                avatar: profileImage,
                progress: 93,
                topics: 8
            },
            secondStudent: {
                name: 'Aluno 2',
                avatar: profileImage,
                progress: 78,
                topics: 3
            }
        },
        module_3: {
            title: 'Módulo 3',
            subtitle: 'Dev. web avançado',
            variant: 'yellow',
            topStudent: {
                name: 'Aluno 1',
                avatar: profileImage,
                progress: 93,
                topics: 8
            },
            secondStudent: {
                name: 'Aluno 2',
                avatar: profileImage,
                progress: 78,
                topics: 3
            }
        },
        module_4: {
            title: 'Módulo 4',
            subtitle: 'Backend',
            variant: 'green',
            topStudent: {
                name: 'Aluno 1',
                avatar: profileImage,
                progress: 93,
                topics: 8
            },
            secondStudent: {
                name: 'Aluno 2',
                avatar: profileImage,
                progress: 78,
                topics: 3
            }
        }
    } as const

    return (
        <main>
            <Banner />

            <section className="text-center py-15">
                <div className="my-10 border-gradient w-70 p-2 m-auto rounded-lg flex gap-2.5 justify-center items-center flex-row">
                    <FaRegStar className="text-2xl text-pink-500" /> <h3 className="text-lg text-secondary-gradient">Alunos em destaque</h3>
                </div>

                <h2 className="text-2xl">Os alunos que <span className="gradient text-gradient text-2xl">mais dominam tecnologias</span></h2>

                <div className="my-20 px-20 flex gap-10 justify-center">
                    {Object.values(students).map((module, index) => (
                        <ModuleCard
                            key={index}
                            {...module}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}