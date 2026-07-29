interface ProgressBarProps {
    progress: number,
    wrapperStyles: string,
    progressBarStyles: string
}

export const ProgressBar = ({ progress, wrapperStyles, progressBarStyles }: ProgressBarProps  ) => {
    return (
        <div className="w-full text-right" >
            <p className="text-lg">{progress} %</p>
            <div className={`${wrapperStyles} w-full rounded-md h-3`}>
                <div className={`${progressBarStyles} rounded-md h-3`} style={{width: `${progress}%`}}></div>
            </div>
        </div>
    )
}