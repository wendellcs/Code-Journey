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

 

//                 <div className="absolute top-[90%] left-[43.9%]">
//                     <div className="w-3.75 h-3.75  rounded-full blur-[10px] absolute -top-1.25 -left-1.25 opacity-60"></div>
//                     <div className="w-1.25 h-1.25 bg-white rounded-full blur-[2.5px] relative z-10 animate-pulse"></div>
//                 </div>

//                 <div className="absolute to-[7.0%] lef-[ 5.7%]">
//                     <div className="w-7.5 h-7.5 bg-[] rounded-full blur-[10px] absolute -top-2.5 -left-2.5 opacity-75"></div>
//                     <div className="w-2.5 h-2.5 bg-[#C3F0CB] rounded-full blur-[2.5px] relative z-10 animate-pulse [animation-delay1s]"></div>
//                 </div>

//                 <div className="absolute top-[52.0%] left-[93.2%]">
//                     <div className="w-6.25 h-6.25 bg-white rounded-full blur-[10px] absolute -top-2 -left-2 opacity-70"></div>
//                     <div className="w-2 h-2 bg-white rounded-full blur-[2.5px] relative z-10 animate-ping opacity-40 duration-1000"></div>
//                 </div>

//                 <div className="absolute top-[30.6%] left-[63.3%]">
//                     <div className="w-5 h-5 bg-[#F49DE4] rounded-full blur-[10px] absolute -top-1.5 -left-1.5 opacity-80"></div>
//                     <div className="w-[6.6px] h-[6.6px] bg-white rounded-full blur-[2.5px] relative z-10 animate-pulse [animation-delay0.5s]"></div>
//                 </div>

//                 <div className="absolute top-[45.5%] left-[46.7%]">
//                     <div className="w-6.25 h-6.25 bg-white rounded-full blur-[10px] absolute -top-2 -left-2 opacity-50"></div>
//                     <div className="w-[8.3px] h-[8.3px] bg-white rounded-full blur-[2.5px] relative z-10"></div>
//                 </div>

//                 <div className="absolute top-[14.9%] left-[25.6%]">
//                     <div className="w-5 h-5 bg-white rounded-full blur-[10px] absolute -top-1.5 -left-1.5 opacity-60"></div>
//                     <div className="w-[6.6px] h-[6.6px] bg-white rounded-full blur-[2.5px] relative z-10 animate-pulse [animation-delay1.5s]"></div>
//                 </div>
                
//                 <div className="absolute top-[19.9%] left-[2.6%]">
//                     <div className="w-5 h-5 bg-[#] rounded-full blur-[10px] absolute -top-1.5 -left-1.5 opacity-60"></div>
//                     <div className="w-[6.6px] h-[6.6px] bg-[#2cf725] rounded-full blur-[2.5px] relative z-10 animate-pulse [animation-delay1.5s]"></div>
//                 </div>

//                 <div className="absolute top-[12.0%] left-[86.9%]">
//                     <div className="w-7.5 h-7.5 bg-[#] rounded-full blur-[10px] absolute -top-2.5 -left-2.5 opacity-90 animate-pulse"></div>
//                     <div className="w-2.5 h-2.5 bg-[#D263B6] rounded-full blur-[2.5px] relative z-10 animate-ping opacity-50 duration-700"></div>
//                 </div>

//                 <div className="absolute top-[95.4%] left-[13.9%]">
//                     <div className="w-7.5 h-7.5 bg-[#b363d2] rounded-full blur-[10px] absolute -top-2.5 -left-2.5 opacity-90 animate-pulse"></div>
//                     <div className="w-2.5 h-2.5 bg-[#] rounded-full blur-[2.5px] relative z-10 animate-ping opacity-50 duration-700"></div>
//                 </div>