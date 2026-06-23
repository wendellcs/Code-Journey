interface StarConfig {
    size: 'big' | 'medium' | 'small',
    color: string,
    position_top: string,
    position_left: string
}

interface StarProps {
    starType: StarConfig
}


export const Star = ({starType}: StarProps) => {
    const outsideSize = starType.size === 'big' ? 'w-8 h-8' : starType.size === 'medium' ? 'w-6 h-6' : 'w-5 h-5';
    const internalSize = starType.size === 'big' ? 'w-3 h-3' : 'w-2 h-2';

    return (
        <div className="absolute" style={{ top: starType.position_top, left: starType.position_left }}>
        <div className={`${outsideSize} rounded-full blur-[10px] absolute -top-2.5 -left-2.5 opacity-80 animate-pulse`} style={{ backgroundColor: starType.color }}></div>
            <div className={`${internalSize} rounded-full blur-[2.5px] relative z-10`} style={{ backgroundColor: starType.color }}></div>
        </div>
    )
}