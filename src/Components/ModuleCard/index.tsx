import { LiaCrownSolid } from "react-icons/lia";
import { TiStarOutline } from "react-icons/ti";
import { ProgressBar } from '../Visuals/ProgressBar'
import { FaCode } from "react-icons/fa";
import { variants } from "../../Utilities/cardVariants";

interface Student {
    name: string,
    avatar: string,
    progress: number,
    topics: number
}

interface ModuleData {
    title: string
    subtitle: string
    variant: string
    topStudent: Student | null,
    secondStudent: Student | null
}

export const ModuleCard = (props: ModuleData) => {
    const { title, subtitle, variant, topStudent, secondStudent } = props

    const currentVariant = variants[variant as 'blue' | 'orange' | 'yellow' | 'green' ]

    return (
        <div className={`p-px w-full max-w-140 rounded-3xl${currentVariant.card.border}`}>
            <div
                className={`
                    text-left
                    bg-card/85
                    w-full
                    max-w-140
                    flex
                    justify-center
                    rounded-3xl
                    py-10
                    ${currentVariant.card.glow}
                `}
            >
                <div className="w-full max-w-[90%] h-90">

                    {/* Header */}
                    <div className="flex gap-5">
                        <div
                            className={`
                                text-center
                                w-10
                                h-8
                                rounded-[50%]
                                border
                                border-transparent
                                bg-origin-border
                                ${currentVariant.number.border}
                                ${currentVariant.number.background}
                            `}
                        >
                            <p className="text-lg font-medium">{title[title.length - 1]}</p>
                        </div>

                        <div className="flex justify-between w-full">
                            <div>
                                <h3 className="text-[16px]">
                                    {title}
                                </h3>

                                <p className="text-[14px] text-[#ffffff8e]">
                                    {subtitle}
                                </p>
                            </div>

                            <div
                                className={`
                                    p-3
                                    rounded-xl
                                    ${currentVariant.icon.background}
                                    ${currentVariant.icon.gradient}
                                `}
                            >
                                <FaCode className="text-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* Top Student */}
                    <div className="flex items-center gap-5 border-b border-gray-600 pb-8">
                        <div className="mt-5">
                            <LiaCrownSolid className="text-3xl m-auto mb-1" />

                            <div className={`p-px rounded-full ${currentVariant.avatar.border}`}>
                                <img
                                    src={topStudent?.avatar}
                                    alt={`Foto de perfil de ${topStudent?.name}`}
                                    className="rounded-full w-25"
                                />
                            </div>
                        </div>

                        <div className="mt-8 w-full">
                            <h4 className="text-xl font-medium">
                                {topStudent?.name}
                            </h4>

                            <p className="flex items-center gap-1 my-2 text-[14px]">
                                <TiStarOutline className="text-2xl" />
                                {topStudent?.topics && topStudent.topics < 2 ? `${topStudent.topics } tópico dominado` : `${topStudent?.topics } tópicos dominados`}  
                            </p>
                            
                            {/* Provisório */}
                            <ProgressBar
                                progress={topStudent?.progress ? topStudent?.progress * 6 : 100}
                                wrapperStyles={currentVariant.progress.wrapper}
                                progressBarStyles={currentVariant.progress.bar}
                            />
                        </div>
                    </div>

                    {/* Second Student */}
                    <div className="pt-8 flex items-center gap-6 pb-8">
                        <div className="flex items-center gap-4">
                            <p>2°</p>

                            <div className={`p-px rounded-full ${currentVariant.avatar.border}`}>
                                <img
                                    src={secondStudent?.avatar}
                                    alt={`Foto de perfil de ${secondStudent?.name}`}
                                    className="rounded-full min-w-16"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <h5>
                                {secondStudent?.name}
                            </h5>

                            <p className="text-[14px] my-1">
                                {secondStudent?.topics && secondStudent.topics < 2 ? `${secondStudent.topics } tópico dominado` : `${secondStudent?.topics } tópicos dominados`}  
                            </p>
                            
                            {/* Provisório */}
                            <ProgressBar
                                progress={secondStudent?.progress ? secondStudent?.progress * 4 : 100}
                                wrapperStyles={currentVariant.progress.wrapper}
                                progressBarStyles={currentVariant.progress.bar}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}