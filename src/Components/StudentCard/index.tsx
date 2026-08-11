import { useEffect, useState } from 'react';
import axios from 'axios';

import type { Student, StudentSkillBasicData } from '../../Types/student';
import { iconMap, type IconName } from '../../Utilities/iconMap';
import { images } from '../../Utilities/profileImages';

type StudentCardProps = {
    studentData: Student
}

export const StudentCard = ({ studentData }: StudentCardProps) => {
    const [topSkills, setTopSkills] = useState<StudentSkillBasicData[]>([])
    const [bottomSkills, setBottomSkills] = useState<StudentSkillBasicData[]>([])
    const [studentSkills, setStudentSkills] = useState<StudentSkillBasicData[]>([])

    useEffect(() => {
        const getStudentSkillsSummary = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/students/${studentData.id}/skills/summary`)
                const sortedSkills = [...response.data].sort((a, b) => a.independence_level - b.independence_level).reverse()

                if (sortedSkills.length > 3) {
                    const topSkillsData: StudentSkillBasicData[] = sortedSkills.slice(0, 3)
                        .map((skill) => ({
                            name: skill.name,
                            tech_icon: skill.tech_icon,
                        }));

                    const bottomSkillsData: StudentSkillBasicData[] = sortedSkills.slice(3).slice(-3)
                        .map((skill) => ({
                            name: skill.name,
                            tech_icon: skill.tech_icon,
                        }));

                    setTopSkills(topSkillsData);
                    setBottomSkills(bottomSkillsData);
                } else {
                    setStudentSkills(sortedSkills.map((skill) => ({
                        name: skill.name,
                        tech_icon: skill.tech_icon,
                    })))
                }

            } catch (e) {
                console.error(e)
            }
        }

        if (studentData) {
            getStudentSkillsSummary()
        }
    }, [studentData])

    return (
        <div className='max-w-236.5 w-full mx-auto relative gradient-border rounded-3xl mt-20 max-md:max-w-150 max-sm:max-w-90'>

            {studentData?.tag !== '-' && <div className='tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-400 font-medium animate-gradient-shift bg-size-[200%] bg-secondary-gradient absolute -top-6 text-2xl w-fit right-5 z-10 py-1 px-3 rounded-lg'>{studentData.tag}</div>}

            <div className='bg-student-card-background z-2 relative p-6 rounded-3xl grid grid-cols-[1fr_1fr_1fr] max-md:grid-cols-2 max-sm:grid-cols-1'>
                <div className='max-md:col-span-2 max-md:max-w-70 max-md:mx-auto max-md:mb-8 max-sm:col-span-1'>
                    <div className='rounded-2xl p-0.5 max-w-60 min-w-50 bg-secondary-gradient mx-auto'>
                        <img src={images[Math.floor(Math.random() * images.length)]} className='w-full max-w-75 aspect-square rounded-2xl' alt="Imagem do aluno" />
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

                    {studentSkills &&
                        <div className='flex gap-3.5 mt-10'>
                            {studentSkills && studentSkills.map(skill => {
                                const iconName = skill.tech_icon as IconName
                                const Icon = iconMap[iconName]

                                return (
                                    <Icon key={skill.name} className='icon' />)
                            })}
                        </div>
                    }

                    {topSkills.length > 0 && bottomSkills.length > 0 &&
                        <>
                            <h3>Ponto forte</h3>
                            <div className='flex gap-3.5 mt-5'>
                                {topSkills.length > 0 && topSkills.map(skill => {
                                    const iconName = skill.tech_icon as IconName
                                    const Icon = iconMap[iconName]

                                    return <Icon key={skill.name} className='icon' />
                                })}
                            </div>

                            <h3 className='mt-8'>Ponto fraco</h3>
                            <div className='flex gap-3.5 mt-5 justify-center'>
                                {bottomSkills.length > 0 && bottomSkills.map(skill => {
                                    const iconName = skill.tech_icon as IconName
                                    const Icon = iconMap[iconName]

                                    return <Icon key={skill.name} className='icon' />
                                })}
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}