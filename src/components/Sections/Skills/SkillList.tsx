import { useEffect, useRef, useState } from 'react';

export const SkillList = ({
                              skills,
                              forceFull = false,
                              onOverflow,
                          }: {
    skills: Record<string, string>;
    forceFull?: boolean;
    onOverflow?: () => void;
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState(false);

    useEffect(() => {
        if (contentRef.current && !forceFull) {
            const isOverflow = contentRef.current.scrollHeight > 260;
            setOverflow(isOverflow);
        }
    }, [skills, forceFull]);

// Separat: on click
    const handleSeeMore = () => {
        if (onOverflow) onOverflow();
    };


    return (
        <div
            ref={contentRef}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[260px] overflow-hidden"
        >
            {Object.entries(skills).map(([name, iconUrl]) => (
                <div
                    key={name}
                    className="flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 rounded-2xl shadow-inner transition-all duration-300"
                >

                <img src={iconUrl} alt={name} className="w-5 h-5" />
                    <span className="text-sm font-medium">{name}</span>
                </div>

            ))}
            {!forceFull && overflow && (
                <button
                    onClick={handleSeeMore}
                    className="text-blue-400 text-sm mt-2 col-span-full underline text-center flex items-center gap-1 justify-center"
                >
                    See More <span className="text-xs">↗</span>
                </button>
            )}
        </div>
    );
};