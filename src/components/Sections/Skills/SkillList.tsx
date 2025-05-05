import {useSkills} from "../../../api/useSkills.tsx";

export const SkillList = ({ category }: { category: string }) => {
    const { data, loading } = useSkills(category);

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map(skill => (
                <div
                    key={skill.name}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#f5f5f7',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <img src={skill.iconUrl} alt={skill.name} style={{ width: 20, height: 20 }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</span>
                </div>
            ))}
        </div>
    );
};
