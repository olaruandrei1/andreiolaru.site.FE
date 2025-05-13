import React, { useRef, useEffect } from 'react';

type MiniCarouselProps = {
    children: React.ReactNode;
    speed?: number; // pixeli/secundă
    onClick?: () => void;
};

export const MiniCarousel: React.FC<MiniCarouselProps> = ({ children, speed = 30, onClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let frameId: number;
        let scrollAmount = 0;

        const step = () => {
            if (!el) return;

            el.scrollLeft += 1;
            scrollAmount += 1;

            if (scrollAmount >= el.scrollWidth / 2) {
                el.scrollLeft = 0;
                scrollAmount = 0;
            }

            frameId = requestAnimationFrame(step);
        };

        const start = () => frameId = requestAnimationFrame(step);
        const stop = () => cancelAnimationFrame(frameId);

        start();

        el.addEventListener('mouseenter', stop);
        el.addEventListener('mouseleave', start);

        return () => {
            cancelAnimationFrame(frameId);
            el.removeEventListener('mouseenter', stop);
            el.removeEventListener('mouseleave', start);
        };
    }, [speed]);

    return (
        <div
            ref={containerRef}
            className="w-full overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <div className="flex gap-2 w-max animate-none">
                {children}
                {children}
            </div>
        </div>
    );
};
