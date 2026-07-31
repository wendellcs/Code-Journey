import { Banner } from "../../Components/UI/Banner"
import { FaRegStar } from "react-icons/fa"
import { ModuleCard } from "../../Components/ModuleCard"
import { Students } from "../../Components/Students"

import { BsGraphUpArrow, BsPeopleFill } from "react-icons/bs"
import { IoTrophyOutline } from "react-icons/io5"
import { Aurora } from "../../Components/Visuals/Aurora"

import profileImage from '../../assets/images/profile-example.png'
import { useEffect, useState } from "react"
import axios from "axios"

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
                progress: 100,
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

    type RegisteredDataTotal = {
        total_students: number
        total_technologies: number
        total_classes: number
    }

    type Metrics = {
        techs_metrics: number
    }

    const [registeredDataTotal, setRegisteredDataTotal] = useState<RegisteredDataTotal | null>(null)
    const [metrics, setMetrics] = useState<Metrics | null>(null)

    useEffect(() => {
        async function getStudentsTotal() {
            try {
                const responseGeneral = await axios.get('http://127.0.0.1:8000/general/total')
                console.log(responseGeneral.data)
                setRegisteredDataTotal(responseGeneral.data)

                const responseMetrics = await axios.get('http://127.0.0.1:8000/general/metrics')
                setMetrics({techs_metrics: responseMetrics.data.total})
            } catch (e) {
                console.error(e)
            }
        }

        getStudentsTotal()
    }, [])

    return (
        <main className="">
            <Banner />
            <section className="text-center py-15 px-10 relative overflow-clip bg-main-aurora">
                <Aurora type={"three"} className="top-0 right-0 animate-float" />
                <Aurora type={"four"} className="animate-float left-0 max-sm:animate-none" />

                <div className="my-10 border-gradient w-70 p-2 m-auto rounded-lg flex gap-2.5 justify-center items-center flex-row">
                    <FaRegStar className="text-2xl text-pink-500" /> <h3 className="text-lg text-secondary-gradient">Alunos em destaque</h3>
                </div>

                <h2 className="text-2xl relative">Os alunos que <span className="gradient text-gradient text-2xl">mais dominam tecnologias</span></h2>

                <div className="my-20 w-full max-w-387.5 mx-auto grid gap-4 place-items-center justify-center relative 2xl:grid-cols-4 max-2xl:grid-cols-[1fr_1fr] max-2xl:gap-10 max-md:grid-cols-1">
                    {Object.values(students).map((module, index) => (
                        <ModuleCard
                            key={index}
                            {...module}
                        />
                    ))}
                </div>

                <div className="w-full relative max-w-237 gradient-border bg-student-card-background mx-auto rounded-2xl p-10 max-lg:max-w-172.5 max-md:max-w-62.5">
                    <Aurora type={"five"} className="animate-float left-0 rotate-20" />
                    <div className="text-left flex w-full justify-center gap-10 relative z-1 max-md:flex-col">
                        <div className="flex items-center gap-5 max-lg:flex-col">
                            <div className="border border-purple-icon-border bg-purple-icon-background rounded-lg">
                                <BsPeopleFill className="text-5xl m-4 text-purple-icon" />
                            </div>
                            <div className="min-w-40 flex flex-col max-lg:items-center">
                                <p className="text-[28px] font-medium">{registeredDataTotal?.total_students ?? 0}</p>
                                <p className="text-sm text-secondary">Alunos competindo</p>

                                <p className="text-increase-indicator">+{registeredDataTotal?.total_students ?? 0} essa semana</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 max-lg:flex-col">
                            <div className="border border-blue-icon-border bg-blue-icon-background rounded-lg">
                                <IoTrophyOutline className="text-5xl m-4 text-blue-icon" />
                            </div>
                            <div className="min-w-40 flex flex-col max-lg:items-center">
                                <p className="text-[28px] font-medium">{registeredDataTotal?.total_technologies ?? 0}</p>
                                <p className="text-sm text-secondary">Tecnologias dominadas</p>

                                <p className="text-increase-indicator">+{metrics?.techs_metrics ?? 0} essa semana</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 max-lg:flex-col">
                            <div className="border border-green-icon-border bg-green-icon-background rounded-lg">
                                <BsGraphUpArrow className="text-5xl m-4 text-green-icon" />
                            </div>
                            <div className="min-w-40 flex flex-col max-lg:items-center">
                                <p className="text-[28px] font-medium">100%</p>
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


