import { useEffect } from 'react';

type Section = {
    id: string;
    label: string;
};

type Props = {
    sections: Section[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    theme?: 'light' | 'dark';
};

export const ScrollNav = ({ sections, activeIndex, setActiveIndex, theme = 'light' }: Props) => {
    // const isDark = theme === 'dark';

    const scrollTo = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const handleScrollSpy = () => {
            // disabled: handled by FullpageWrapper
        };
        window.addEventListener('scroll', handleScrollSpy);
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '2rem',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 1000,
                gap: '0.5rem',
            }}
        >
            {sections.map(({ id, label }, index) => {
                const isActive = index === activeIndex;

                return (
                    <div
                        key={id}
                        onClick={() => scrollTo(index)}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* Dot */}
                        <div
                            style={{
                                width: isActive ? '16px' : '10px',
                                height: isActive ? '16px' : '10px',
                                borderRadius: '50%',
                                backgroundColor: isActive ? '#007AFF' : '#D1D1D6',
                                transition: 'all 0.3s ease',
                                marginBottom: '0.3rem',
                            }}
                        />

                        {/* Label */}
                        <div
                            style={{
                                fontSize: isActive ? '0.9rem' : '0.6rem',
                                padding: isActive ? '2px 6px' : '0px',
                                color: isActive ? '#007AFF' : '#8E8E93',
                                fontWeight: isActive ? 600 : 400,
                                backgroundColor: isActive ? 'rgba(0,122,255,0.1)' : 'transparent',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {label}
                        </div>

                        {/* Line to next */}
                        {index < sections.length - 1 && (
                            <div
                                style={{
                                    width: '2px',
                                    height: '32px',
                                    backgroundColor: '#D1D1D6',
                                    marginTop: '0.3rem',
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
