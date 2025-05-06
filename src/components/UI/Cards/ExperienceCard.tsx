import { useEffect, useRef, useState } from 'react';
import { MorphBox } from '../Boxes/MorphBox.tsx';
import { Experience as ExpType } from '../../../api/useExperience.tsx';

type Props = {
    exp: ExpType;
    onReadMore: () => void;
};

export const ExperienceCard: React.FC<Props> = ({ exp, onReadMore }) => {
    const descRef = useRef<HTMLParagraphElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const el = descRef.current;
        if (!el) return;
        setIsOverflowing(el.scrollHeight > el.clientHeight + 5);
    }, [exp.description]);

    return (
        <MorphBox
            className="w-full h-full flex flex-col gap-2 box-border px-4 py-6 md:px-6 md:py-8
      max-w-[310px] sm:max-w-[320px] md:max-w-md text-sm md:text-base mx-auto"
        >
            <h3 className="text-lg md:text-xl font-semibold text-neutral-900">{exp.title}</h3>
            <p className="text-sm md:text-lg text-neutral-500">{exp.company}</p>
            <p className="text-xs md:text-sm text-neutral-500">{exp.period}</p>

            <p
                ref={descRef}
                className="text-sm md:text-base text-neutral-900 leading-relaxed flex-grow overflow-hidden line-clamp-[10]"
                style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {exp.description}
            </p>

            {isOverflowing && (
                <button
                    onClick={onReadMore}
                    className="self-end text-blue-500 font-semibold text-xs md:text-sm hover:underline transition-colors duration-200"
                >
                    Read more
                </button>
            )}
        </MorphBox>
    );
};
