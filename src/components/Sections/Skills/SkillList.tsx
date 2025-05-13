import {useEffect, useRef, useState} from "react";

type Skill = {
    name: string;
    icon: string;
};

export const SkillList = ({
                              skills,
                              forceFull = false,
                              onOverflow,
                          }: {
    skills: Skill[] | Record<string, string>; // acceptă și vechiul format
    forceFull?: boolean;
    onOverflow?: () => void;
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState(false);

    // normalizează la array
    const normalizedSkills: Skill[] = Array.isArray(skills)
        ? skills
        : Object.entries(skills).map(([name, icon]) => ({ name, icon }));

    useEffect(() => {
        if (contentRef.current && !forceFull) {
            const isOverflow = contentRef.current.scrollHeight > 260;
            setOverflow(isOverflow);
        }
    }, [normalizedSkills, forceFull]);

    const handleSeeMore = () => {
        if (onOverflow) onOverflow();
    };

    return (
        <div
            ref={contentRef}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[260px] overflow-hidden"
        >
            {normalizedSkills.map((skill) => (
                <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 rounded-2xl shadow-inner transition-transform duration-200 hover:scale-105"
                >
                    <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-5 h-5"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/svgs/default.svg";
                        }}
                    />
                    <span className="text-sm font-medium">{skill.name}</span>
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
