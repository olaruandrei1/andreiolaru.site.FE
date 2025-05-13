import PushPinIcon from '@mui/icons-material/PushPin';
import { JSX } from "react";

export const formatBullets = (text: string): JSX.Element => {
    return (
        <>
            {text
                .split('•')
                .map(part => part.trim())
                .filter(part => part.length > 0)
                .map((part, idx) => (
                    <div key={idx} className="flex items-start gap-2 mb-1">
                        <PushPinIcon fontSize="small" className="text-blue-500 mt-[2px]" />
                        <span className="text-base text-neutral-900 leading-relaxed">{part}</span>
                    </div>
                ))}
        </>
    );
};
