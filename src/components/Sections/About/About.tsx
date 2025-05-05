import { CvBox } from './CvBox';
import {useAbout} from "../../../api/useAbout.tsx";
import {MorphBox} from "../../UI/Boxes/MorphBox.tsx";

export const About = () => {
    const { data, loading } = useAbout();

    if (loading || !data) return null;

    return (
        <section id="about" style={{
            minHeight: '100vh',
            padding: '4rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '960px',
            margin: '0 auto',
        }}>
            <h2 style={{
                fontSize: '2.2rem',
                marginBottom: '2rem',
                color: '#000',
                textAlign: 'center'
            }}>
                A few words about me
            </h2>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                width: '100%'
            }}>
                {data.textBlocks.map((block, i) => (
                    <MorphBox key={i} title={block.title}>
                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#1c1c1e' }}>{block.content}</p>
                    </MorphBox>
                ))}

                <CvBox downloadUrl={data.cvDownloadUrl} />
            </div>
        </section>
    );
};
