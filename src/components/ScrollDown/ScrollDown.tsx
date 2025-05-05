import { useEffect, useState } from 'react';

type Props = {
    direction?: 'down' | 'up';
};

export const ScrollDown = ({ direction = 'down' }: Props) => {
    const [visible, setVisible] = useState(false);
    const isDown = direction === 'down';

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                bottom: isDown ? '3rem' : undefined,
                top: !isDown ? '3rem' : undefined,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#8E8E93',
                fontSize: '0.85rem',
                userSelect: 'none',
                pointerEvents: 'none',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                animation: visible ? 'appear 0.6s ease forwards' : 'none'
            }}
        >
            <span style={{ marginBottom: '0.5rem' }}>{isDown ? 'Scroll Down' : 'Scroll Up'}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        style={{
                            opacity: 0,
                            animation: visible
                                ? `arrow-fade-${direction} 1.5s ${i * 0.2}s infinite`
                                : 'none',
                            fontSize: '1rem',
                        }}
                    >
            {isDown ? '↓' : '↑'}
          </span>
                ))}
            </div>

            <style>{`
        @keyframes arrow-fade-down {
          0% { opacity: 0; transform: translateY(-4px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(4px); }
        }

        @keyframes arrow-fade-up {
          0% { opacity: 0; transform: translateY(4px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }

        @keyframes appear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};
