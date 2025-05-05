import { JSX, useEffect, useRef } from 'react';

export type Section = {
    id: string;
    component: JSX.Element;
    lockScroll?: boolean;
};

type Props = {
    sections: Section[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
};

export const FullpageWrapper = ({ sections, activeIndex, setActiveIndex }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);

    const scrollToIndex = (index: number) => {
        if (index < 0 || index >= sections.length) return;
        isScrollingRef.current = true;
        setActiveIndex(index);
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 900);
    };

    const isScrollAllowed = (direction: 'up' | 'down') => {
        const section = sections[activeIndex];
        if (!section.lockScroll) return true;

        const currentSectionEl = document.getElementById(section.id);
        if (!currentSectionEl) return true;

        const scrollable = currentSectionEl.querySelector('[data-scrollable]') as HTMLElement;
        if (!scrollable) return true;

        const { scrollTop, scrollHeight, clientHeight } = scrollable;

        if (direction === 'up') return scrollTop === 0;
        if (direction === 'down') return scrollTop + clientHeight >= scrollHeight - 5;

        return true;
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrollingRef.current) return;

            if (e.deltaY > 50 && isScrollAllowed('down')) {
                scrollToIndex(activeIndex + 1);
            } else if (e.deltaY < -50 && isScrollAllowed('up')) {
                scrollToIndex(activeIndex - 1);
            }
        };

        const handleTouch = (() => {
            let startY = 0;
            return {
                start: (e: TouchEvent) => (startY = e.touches[0].clientY),
                move: (e: TouchEvent) => {
                    if (isScrollingRef.current) return;

                    const deltaY = startY - e.touches[0].clientY;

                    if (Math.abs(deltaY) > 50) {
                        if (deltaY > 0 && isScrollAllowed('down')) {
                            scrollToIndex(activeIndex + 1);
                        } else if (deltaY < 0 && isScrollAllowed('up')) {
                            scrollToIndex(activeIndex - 1);
                        }
                    }
                },
            };
        })();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrollingRef.current) return;

            if (e.key === 'ArrowDown' && isScrollAllowed('down')) {
                scrollToIndex(activeIndex + 1);
            } else if (e.key === 'ArrowUp' && isScrollAllowed('up')) {
                scrollToIndex(activeIndex - 1);
            }
        };

        const node = containerRef.current;
        node?.addEventListener('wheel', handleWheel, { passive: false });
        node?.addEventListener('touchstart', handleTouch.start, { passive: false });
        node?.addEventListener('touchmove', handleTouch.move, { passive: false });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            node?.removeEventListener('wheel', handleWheel);
            node?.removeEventListener('touchstart', handleTouch.start);
            node?.removeEventListener('touchmove', handleTouch.move);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeIndex, sections]);

    useEffect(() => {
        const target = document.getElementById(sections[activeIndex]?.id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeIndex, sections]);

    return (
        <div
            ref={containerRef}
            style={{
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <div
                style={{
                    height: `${sections.length * 100}vh`,
                    transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                }}
            >
                {sections.map(({ id, component }) => (
                    <section
                        key={id}
                        id={id}
                        style={{
                            height: '100vh',
                            scrollSnapAlign: 'start',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        {component}
                    </section>
                ))}
            </div>
        </div>
    );
};
