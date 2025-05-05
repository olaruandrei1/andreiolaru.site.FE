import {MorphBox} from "../../UI/Boxes/MorphBox.tsx";
import {SkillList} from "./SkillList.tsx";

export const Skills = () => {
    const categories = [
        { key: 'frontend', title: 'Frontend' },
        { key: 'backend', title: 'Backend' },
        { key: 'cloud', title: 'Cloud' },
        { key: 'database', title: 'Database' },
        { key: 'ci', title: 'CI/CD' },
        { key: 'tools', title: 'Tools & Monitoring' },
        { key: 'methods', title: 'Methodologies' },
    ];

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '2rem',
            }}
        >
            {categories.map(cat => (
                <MorphBox key={cat.key} title={cat.title}>
                    <SkillList category={cat.key} />
                </MorphBox>
            ))}
        </div>
    );
};
