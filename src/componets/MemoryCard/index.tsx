import { useState } from "react";
import style from './memory.module.css'

interface Props {
    frontContent: string;
}

export default function MemoryCard({ frontContent }: Props) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={style["flip-container"]} onClick={handleFlip}>
            <div className={`${style["flipper"]} ${isFlipped ? style["flipped"] : ""}`}>
                <div className={style["front"]}>{frontContent}</div>
                <div className={style["back"]}><h1>🕹</h1>️</div>
            </div>
        </div>
    );
};

