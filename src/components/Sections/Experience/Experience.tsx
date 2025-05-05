// components/Sections/Experience/Experience.tsx
import React, { useState } from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { useExperience, Experience as ExpType } from '../../../api/useExperience';
import { Carousel } from '../../UI/Carousel/GenericMotionCarousel';

const ExperienceCard: React.FC<{
    exp: ExpType;
    onReadMore: () => void;
}> = ({ exp, onReadMore }) => {
    const maxChars = 300;
    const truncated = exp.description.length > maxChars;
    const displayText = truncated
        ? exp.description.slice(0, maxChars) + '...'
        : exp.description;

    return (
        <MorphBox style={{ width: '100%', boxSizing: 'border-box', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1d1d1f' }}>
                    {exp.title}
                </h3>
                <p style={{ fontSize: '1.125rem', color: '#6e6e73' }}>{exp.company}</p>
                <p style={{ fontSize: '1rem', color: '#6e6e73' }}>{exp.period}</p>
                <p style={{ fontSize: '1rem', color: '#1d1d1f', lineHeight: '1.6', flexGrow: 1 }}>
                    {displayText}
                </p>
                {truncated && (
                    <button
                        onClick={onReadMore}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#007AFF',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '1rem',
                            fontWeight: 600,
                            alignSelf: 'flex-end',
                        }}
                    >
                        Read more
                    </button>
                )}
            </div>
        </MorphBox>
    );
};

export const Experience: React.FC = () => {
    const { data, loading } = useExperience();
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <section id="experience" style={{ padding: '4rem 0', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <h2
                    style={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}
                >
                    My Professional Journey
                </h2>

                <Carousel>
                    {data.map((exp, idx) => (
                        <ExperienceCard
                            key={idx}
                            exp={exp}
                            onReadMore={() => setOpenIdx(idx)}
                        />
                    ))}
                </Carousel>
            </div>

            {openIdx !== null && (
                <>
                    {/* Backdrop întunecat */}
                    <div
                        onClick={() => setOpenIdx(null)}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, width: '100vw', height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 1000,
                        }}
                    />

                    {/* Container-ul modal (transparent) */}
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80vw', height: '80vh',
                            zIndex: 1001,
                            overflow: 'auto',
                            // fără background aici – doar containerul clar
                        }}
                    >
                        {/* Card-ul efectiv, solid white + umbră */}
                        <MorphBox
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: '2rem',
                                boxSizing: 'border-box',
                                // suprascriem glassmorphism pentru modal
                                background: '#ffffff',
                                backdropFilter: 'none',
                                WebkitBackdropFilter: 'none',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                                {data[openIdx].title}
                            </h3>
                            <p style={{ fontSize: '1.125rem', color: '#6e6e73' }}>
                                {data[openIdx].company}
                            </p>
                            <p style={{ fontSize: '1rem', color: '#6e6e73', marginBottom: '1rem' }}>
                                {data[openIdx].period}
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#1d1d1f' }}>
                                {data[openIdx].description}
                            </p>
                            <button
                                onClick={() => setOpenIdx(null)}
                                style={{
                                    marginTop: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#007AFF',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                }}
                            >
                                Close
                            </button>
                        </MorphBox>
                    </div>
                </>
            )}
        </section>
    );
};
