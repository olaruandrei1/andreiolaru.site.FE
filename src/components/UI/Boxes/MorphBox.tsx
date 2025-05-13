import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
type Props = {
    title?: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    solid?: boolean;
    imageUrl?: string;
    imageClassName?: string;
};

export const MorphBox = ({ title, children, className = '', style, solid, imageUrl, imageClassName }: Props) => {
    const baseStyle = solid
        ? 'bg-white border border-neutral-200 shadow-2xl'
        : 'bg-white/30 border border-white/20 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.975 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={`
                will-change-transform overflow-hidden
                relative
                w-full max-w-full md:max-w-xl lg:max-w-2xl
                rounded-3xl
                transition-all duration-300 ease-in-out
                max-h-[90vh] overflow-y-auto
                p-6 sm:p-8
                ${baseStyle}
                ${className}
            `}
            style={style}
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Decor"
                    className={imageClassName ?? "absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-90 z-20 pointer-events-none"}
                    loading="lazy"
                />
            )}

            {title && (
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 drop-shadow-sm">
                    {title}
                </h3>
            )}
            {children}
        </motion.div>
    );
};
