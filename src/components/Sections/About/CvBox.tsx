type Props = {
    downloadUrl: string;
};

export const CvBox = ({ downloadUrl }: Props) => {
    return (
        <div style={{
            marginTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <p style={{ marginBottom: '1rem', color: '#333' }}>Want to know more? You can download my full CV below.</p>
            <a
                href={downloadUrl}
                download
                style={{
                    background: '#007AFF',
                    color: '#fff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '999px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background 0.3s',
                }}
            >
                Download CV
            </a>
        </div>
    );
};
