type Props = {
    title?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export const MorphBox = ({ title, children, style }: Props) => {
    return (
        <div
            style={{
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                background: 'rgba(255, 255, 255, 0.35)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '2rem',
                boxShadow:
                    '0 10px 30px rgba(0, 0, 0, 0.08), inset 0 0 0 0.5px rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                maxWidth: '100%',
                boxSizing: 'border-box',
                ...style
            }}
        >
            {title && (
                <h3
                    style={{
                        fontSize: '1.3rem',
                        marginBottom: '1rem',
                        fontWeight: 600,
                        color: '#1c1c1e',
                        textShadow: '0 1px 0 rgba(255,255,255,0.4)'
                    }}
                >
                    {title}
                </h3>
            )}
            {children}
        </div>
    )
}
