import { MorphBox } from '../Boxes/MorphBox.tsx';
import { Education as EduType, EducationVariant } from '../../../api/useEducation';
import React from "react";

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

    const variantStyles = {
        [EducationVariant.PRIMARY]: {
            borderColor: 'border-red-500',
            shadow: 'shadow-[0_0_20px_rgba(255,59,48,0.3)]',
        },
        [EducationVariant.SECONDARY]: {
            borderColor: 'border-orange-500',
            shadow: 'shadow-[0_0_20px_rgba(255,149,0,0.3)]',
        },
        [EducationVariant.CLASSIC]: {
            borderColor: 'border-gray-300',
            shadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.1)]',
        },
    };

    const { borderColor, shadow } = variantStyles[edu.variant || EducationVariant.CLASSIC];

    return (
        <MorphBox className={`w-full h-full flex flex-col gap-2 box-border border-2 ${borderColor} ${shadow}`}>
            <h3 className="text-xl font-semibold text-neutral-900">{edu.degree}</h3>
            <p className="text-lg text-neutral-500">{edu.institution}</p>
            <p className="text-sm text-neutral-500">{edu.period}</p>
            <p className="text-base text-neutral-900 leading-relaxed flex-grow">{displayText}</p>

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
