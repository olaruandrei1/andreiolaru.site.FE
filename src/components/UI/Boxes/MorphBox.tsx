import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
    title?: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

export const MorphBox = ({ title, children, className = '', style }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.975 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1], // Apple-style bezier
            }}
            className={`
        will-change-transform overflow-hidden
        w-full max-w-full md:max-w-xl lg:max-w-2xl
        rounded-3xl border border-white/20
        backdrop-blur-2xl bg-white/30
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        transition-all duration-300 ease-in-out
        max-h-[90vh] overflow-y-auto
        p-6 sm:p-8
        ${className}
      `}
            style={style}
        >
            {title && (
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 drop-shadow-sm">
                    {title}
                </h3>
            )}
            {children}
        </motion.div>
    );
};
