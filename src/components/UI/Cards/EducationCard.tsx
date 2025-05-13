import { MorphBox } from '../Boxes/MorphBox.tsx';
import { Education as EduType, EducationVariant } from '../../../api/useEducation';
import React from "react";
import {formatBullets} from "../../Helpers/FormatDots.tsx";

type Props = {
    edu: EduType;
    onReadMore: () => void;
};

export const EducationCard: React.FC<Props> = ({ edu, onReadMore }) => {
    const maxChars = 200;
    const truncated = edu.description.length > maxChars;
    const displayText = truncated
        ? edu.description.slice(0, maxChars) + '…'
        : edu.description;

    let borderClass = '';
    let shadowClass = '';

    switch (edu.variant) {
        case EducationVariant.PRIMARY:
            borderClass = 'border-red-500';
            shadowClass = 'shadow-[0_0_20px_rgba(255,59,48,0.3)]';
            break;
        case EducationVariant.SECONDARY:
            borderClass = 'border-orange-500';
            shadowClass = 'shadow-[0_0_20px_rgba(255,149,0,0.3)]';
            break;
        default:
            borderClass = 'border-gray-300';
            shadowClass = 'shadow-[0_10px_30px_rgba(0,0,0,0.1)]';
            break;
    }
    return (
        <MorphBox
            imageUrl={edu.photoPath}
            imageClassName="absolute inset-0 m-auto w-40 h-40 sm:w-52 sm:h-52 object-contain opacity-10 z-0 pointer-events-none"
            className={`relative w-full h-full flex flex-col gap-2 box-border border-2 ${borderClass} ${shadowClass}`}
        >

        <h3 className="text-xl font-semibold text-neutral-900">{edu.degree}</h3>
            <p className="text-lg text-neutral-500">{edu.institution}</p>
            <p className="text-sm text-neutral-500">{edu.period}</p>
            <div className="text-base text-neutral-900 leading-relaxed flex-grow space-y-1">
                {formatBullets(displayText)}
            </div>
            {truncated && (
                <button
                    onClick={onReadMore}
                    className="self-end text-blue-500 font-semibold text-sm hover:underline transition"
                >
                    Read more
                </button>
            )}
        </MorphBox>
    );
};
