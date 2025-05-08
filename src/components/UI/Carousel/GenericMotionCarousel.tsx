import React, { useRef, useState, useEffect } from 'react';

export type CarouselProps = {
    children: React.ReactNode | React.ReactNode[]; // acceptă și 1 copil, și array
};

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHint, setShowHint] = useState(true);

    const items = React.Children.toArray(children);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (showHint) setShowHint(false);

            const nodes = Array.from(el.children) as HTMLElement[];
            const centerX = el.scrollLeft + el.offsetWidth / 2;
            const distances = nodes.map(node =>
                Math.abs(node.offsetLeft + node.offsetWidth / 2 - centerX)
            );
            const idx = distances.indexOf(Math.min(...distances));
            if (idx !== currentIndex) setCurrentIndex(idx);
        };

        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [currentIndex, showHint]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') scrollTo(currentIndex + 1);
            if (e.key === 'ArrowLeft') scrollTo(currentIndex - 1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    const scrollTo = (idx: number) => {
        const el = containerRef.current;
        if (!el || idx < 0 || idx >= items.length) return;
        if (showHint) setShowHint(false);

        const child = el.children[idx] as HTMLElement;
        el.scrollTo({
            left: child.offsetLeft - (el.offsetWidth - child.offsetWidth) / 2,
            behavior: 'smooth',
        });
        setCurrentIndex(idx);
    };

    return (
        <div className="relative w-full overflow-hidden pb-12">
            {showHint && (
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/30 text-white text-sm text-center px-4 py-2 rounded-md pointer-events-none">
                    ← Use arrows →
                    <br />
                    or
                    <br />
                    Trackpad
                    <br />
                    or
                    <br />
                    Pagination dots
                </div>
            )}

            <div
                ref={containerRef}
                className="
                    flex overflow-x-auto gap-[10px] md:gap-[50px] scroll-snap-x scroll-smooth no-scrollbar h-[650px]
                    px-[calc((100%-310px)/2)] md:px-[calc((100%-500px)/2)]
                "
            >
                {items.map((child, idx) => (
                    <div
                        key={idx}
                        className={`w-[310px] md:w-[500px] h-[550px] flex-none scroll-snap-center transition-opacity duration-300 ${
                            idx === currentIndex ? 'opacity-100' : 'opacity-40'
                        }`}
                        onClick={() => scrollTo(idx)}
                    >
                        {child}
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 gap-3">
                {items.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => scrollTo(idx)}
                        className={`transition-all duration-300 cursor-pointer rounded-full ${
                            idx === currentIndex
                                ? 'w-3 h-3 bg-blue-500'
                                : 'w-2 h-2 bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
