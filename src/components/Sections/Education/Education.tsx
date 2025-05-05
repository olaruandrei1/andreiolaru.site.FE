import React from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { useEducation, Education as EduType, EducationVariant } from '../../../api/useEducation';
import { Carousel } from '../../UI/Carousel/GenericMotionCarousel';

const EducationCard: React.FC<{
    edu: EduType;
    onReadMore: () => void;
}> = ({ edu, onReadMore }) => {
    // alege stilul în funcţie de variantă

    let borderColor = '#D1D1D6';
    let boxShadow  = '0 10px 30px rgba(0,0,0,0.1)';

    switch (edu.variant) {
        case EducationVariant.PRIMARY:
            borderColor = '#FF3B30';   // roșu puternic (iOS destructive)
            boxShadow  = '0 0 20px rgba(255,59,48,0.3)';
            break;
        case EducationVariant.SECONDARY:
            borderColor = '#FF9500';   // portocaliu mediu
            boxShadow  = '0 0 20px rgba(255,149,0,0.3)';
            break;
        case EducationVariant.CLASSIC:
        default:
            borderColor = '#D1D1D6';   // gri clasic
            boxShadow  = '0 10px 30px rgba(0,0,0,0.1)';
    }

    const maxChars = 200;
    const truncated = edu.description.length > maxChars;
    const displayText = truncated
        ? edu.description.slice(0, maxChars) + '…'
        : edu.description;

    return (
        <MorphBox
            style={{
                width: '100%',
                boxSizing: 'border-box',
                height: '100%',
                border: `2px solid ${borderColor}`,
                boxShadow,
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1d1d1f' }}>
                    {edu.degree}
                </h3>
                <p style={{ fontSize: '1.125rem', color: '#6e6e73' }}>{edu.institution}</p>
                <p style={{ fontSize: '1rem', color: '#6e6e73' }}>{edu.period}</p>
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

export const Education: React.FC = () => {
    const { data, loading } = useEducation();
    const [openIdx, setOpenIdx] = React.useState<number | null>(null);

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <section id="education" style={{ padding: '4rem 0', position: 'relative' }}>
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
                    Education & Credentials
                </h2>

                <Carousel>
                    {data.map((edu, idx) => (
                        <EducationCard
                            key={idx}
                            edu={edu}
                            onReadMore={() => setOpenIdx(idx)}
                        />
                    ))}
                </Carousel>
            </div>

            {/* modal/backdrop... (la fel ca înainte) */}
            {openIdx !== null && (
                <>
                    <div
                        onClick={() => setOpenIdx(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 1000,
                        }}
                    />
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80vw',
                            height: '60vh',
                            zIndex: 1001,
                            overflowY: 'auto',
                        }}
                    >
                        <MorphBox
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: '2rem',
                                boxSizing: 'border-box',
                                background: '#fff',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                                {data[openIdx].degree}
                            </h3>
                            <p style={{ fontSize: '1.125rem', color: '#6e6e73' }}>
                                {data[openIdx].institution}
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
