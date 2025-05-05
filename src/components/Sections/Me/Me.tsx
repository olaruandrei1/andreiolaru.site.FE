import { useEffect, useState } from 'react';
import {useMe} from "../../../api/useMe.tsx";

export const Me = () => {
    const { data, loading } = useMe();
    const [animate, setAnimate] = useState(false);
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        if (!loading) setAnimate(true);
    }, [loading]);

    if (loading || !data) return null;

    const { title, job, description, imageUrl } = data;

    return (
        <section
            style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isMobile ? '2rem 1.5rem' : '2rem 4rem',
                boxSizing: 'border-box',
                position: 'relative',
            }}
        >
            {/* Text */}
            <div
                style={{
                    flex: 1,
                    textAlign: isMobile ? 'center' : 'left',
                    paddingRight: isMobile ? 0 : '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease',
                }}
            >
                <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', color: '#000', lineHeight: 1.2 }}>
                    {title}
                </h2>

                <h3
                    style={{
                        fontSize: '1.6rem',
                        fontFamily: 'monospace',
                        color: '#007AFF',
                        marginBottom: '1.5rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                    }}
                >
                    {job}
                    <span
                        style={{
                            marginLeft: '6px',
                            animation: 'blink 1s infinite',
                            fontWeight: 'bold',
                        }}
                    >
            |
          </span>
                </h3>

                <p style={{ fontSize: '1rem', color: '#444', lineHeight: 1.6 }}>{description}</p>
            </div>

            {/* Image */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s ease',
                }}
            >
                <img
                    src={imageUrl}
                    alt="Me"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '85vh',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0))',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0))',
                    }}
                />
            </div>

            {/* blink animation */}
            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </section>
    );
};
