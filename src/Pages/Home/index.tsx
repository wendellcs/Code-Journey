import { Banner } from "../../Components/Banner"
import { FaRegStar } from "react-icons/fa"
import { ModuleCard } from "../../Components/ModuleCard"
import { Students } from "../../Components/Students"

import { BsGraphUpArrow, BsPeopleFill } from "react-icons/bs"
import { IoTrophyOutline } from "react-icons/io5"
import { Aurora } from "../../Components/Aurora"

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
        <main className="">
            <Banner />
            <section className="text-center py-15 relative overflow-clip bg-main-aurora">
                <Aurora type={"three"} className="top-0 right-0 animate-float" />
                <Aurora type={"four"} className="animate-float" />

                <div className="my-10 border-gradient w-70 p-2 m-auto rounded-lg flex gap-2.5 justify-center items-center flex-row">
                    <FaRegStar className="text-2xl text-pink-500" /> <h3 className="text-lg text-secondary-gradient">Alunos em destaque</h3>
                </div>

                <h2 className="text-2xl relative">Os alunos que <span className="gradient text-gradient text-2xl">mais dominam tecnologias</span></h2>

                <div className="my-20 px-20 flex gap-10 justify-center relative">
                    {Object.values(students).map((module, index) => (
                        <ModuleCard
                            key={index}
                            {...module}
                        />
                    ))}
                </div>

                <div className="w-min mx-auto rounded-2xl border border-transparent p-10 bg-origin-border [background:linear-gradient(var(--color-metrics-background),var(--color-metrics-background))_padding-box,linear-gradient(90deg,rgba(137,11,114,0.92)_0%,#D773FF_43%,#2E4F78_71%,#ADD2FF_96%)_border-box]">
                    <Aurora type={"five"} className="animate-float left-0 rotate-20" />
                    <div className="text-left flex justify-center gap-10 relative z-1">
                        <div className="flex items-center gap-5">
                            <div className="border border-purple-icon-border bg-purple-icon-background rounded-lg">
                                <BsPeopleFill className="text-5xl m-4 text-purple-icon" />
                            </div>
                            <div className="min-w-40">
                                <p className="text-[28px] font-medium">248</p>
                                <p className="text-sm text-secondary">Alunos competindo</p>

                                <p className="text-increase-indicator">+20 essa semana</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="border border-blue-icon-border bg-blue-icon-background rounded-lg">
                                <IoTrophyOutline className="text-5xl m-4 text-blue-icon" />
                            </div>
                            <div className="min-w-40">
                                <p className="text-[28px] font-medium">1.240</p>
                                <p className="text-sm text-secondary">Tecnologias dominadas</p>

                                <p className="text-increase-indicator">+85 essa semana</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="border border-green-icon-border bg-green-icon-background rounded-lg">
                                <BsGraphUpArrow className="text-5xl m-4 text-green-icon" />
                            </div>
                            <div className="min-w-40">
                                <p className="text-[28px] font-medium">92%</p>
                                <p className="text-sm text-secondary">Média de evolução</p>

                                <p className="text-increase-indicator">+6% essa semana</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Students />
            </section>
        </main>
    )
}


