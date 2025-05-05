// components/Carousel/Carousel.tsx
import React, { useRef, useState, useEffect } from 'react';

export type CarouselProps = {
    children: React.ReactNode[];
};

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHint, setShowHint] = useState(true);

    // Dimensions
    const boxWidth = 500;
    const boxHeight = 550;
    const gap = 50;

    // hide hint on first scroll
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const handleScroll = () => {
            if (showHint) {
                setShowHint(false);
            }
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

    const scrollTo = (idx: number) => {
        const el = containerRef.current;
        if (!el || idx < 0 || idx >= children.length) return;
        if (showHint) {
            setShowHint(false);
        }
        const child = el.children[idx] as HTMLElement;
        el.scrollTo({
            left: child.offsetLeft - (el.offsetWidth - child.offsetWidth) / 2,
            behavior: 'smooth',
        });
        setCurrentIndex(idx);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                paddingBottom: '3rem',
            }}
        >
            {showHint && (
                <div
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.3)',  // mai puțin transparent decât înainte
                        color: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontFamily: 'sans-serif',
                        pointerEvents: 'none',
                        textAlign: 'center',
                    }}
                >
                    ← Use arrows →
                    <br/>
                    or
                    <br/>
                    Trackpad
                    <br/>
                    or
                    <br/>
                    Pagination dots
                </div>
            )}

            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    gap: `${gap}px`,
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    padding: `0 calc((100% - ${boxWidth}px) / 2)`,
                    height: `${boxHeight + 100}px`,
                    scrollbarWidth: 'none',
                }}
            >
                {children.map((child, idx) => (
                    <div
                        key={idx}
                        style={{
                            width: `${boxWidth}px`,
                            height: `${boxHeight}px`,
                            flex: '0 0 auto',
                            scrollSnapAlign: 'center',
                            opacity: idx === currentIndex ? 1 : 0.4,
                            transition: 'opacity 0.3s ease',
                        }}
                        onClick={() => scrollTo(idx)}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                    gap: '0.75rem',
                }}
            >
                {children.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => scrollTo(idx)}
                        style={{
                            width: idx === currentIndex ? '12px' : '8px',
                            height: idx === currentIndex ? '12px' : '8px',
                            borderRadius: '50%',
                            backgroundColor: idx === currentIndex ? '#007AFF' : '#D1D1D6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
