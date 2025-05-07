import { useEffect, useState } from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { SkillList } from './SkillList';
import { Carousel } from '../../UI/Carousel/GenericMotionCarousel';
import { useSkills } from '../../../api/useSkills';

export const Skills = ({ setDisableScroll }: { setDisableScroll?: (val: boolean) => void }) => {
    const { data, loading } = useSkills();
    const categories = data ?? [];
    const [pages, setPages] = useState<string[][]>([]);
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setDisableScroll?.(openIdx !== null);
    }, [openIdx, setDisableScroll]);

    const maxItemsPerBox = isMobile ? 4 : 9;

    useEffect(() => {
        if (loading || categories.length === 0) return;

        const grouped: string[][] = [];
        let currentGroup: string[] = [];

        categories.forEach(cat => {
            currentGroup.push(cat.id);
            if (currentGroup.length === 2) {
                grouped.push(currentGroup);
                currentGroup = [];
            }
        });

        if (currentGroup.length > 0) grouped.push(currentGroup);
        setPages(grouped);
    }, [categories, loading]);

    if (loading || categories.length === 0) {
        return <p className="text-center text-sm">Loading...</p>;
    }

    return (
        <section id="skills" className="min-h-screen py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-12">
                    Development stack
                </h2>

                <Carousel>
                    {pages.map((group, i) => (
                        <div key={i} className="flex flex-col gap-6">
                            {group.map(id => {
                                const cat = categories.find(c => c.id === id);
                                if (!cat) return null;

                                const skillEntries = Object.entries(cat.skills);
                                const shouldShowButton = skillEntries.length > maxItemsPerBox;
                                const shownSkills = shouldShowButton
                                    ? Object.fromEntries(skillEntries.slice(0, maxItemsPerBox))
                                    : cat.skills;

                                return (
                                    <MorphBox
                                        key={cat.id}
                                        title={cat.categoryName}
                                        className="bg-white/90 backdrop-blur-md border border-neutral-200 shadow-[0_8px_24px_rgba(0,0,0,0.05)] text-neutral-900"
                                    >
                                        <SkillList skills={shownSkills} />
                                        {shouldShowButton && (
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => setOpenIdx(categories.indexOf(cat))}
                                                    className="text-blue-600 font-semibold text-sm hover:underline mt-2"
                                                >
                                                    See More
                                                </button>
                                            </div>
                                        )}
                                    </MorphBox>
                                );
                            })}
                        </div>
                    ))}
                </Carousel>

                {/* Modal */}
                {openIdx !== null && categories[openIdx] && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        onClick={(e) => {
                            if ((e.target as HTMLElement).id === 'skill-modal-wrapper') {
                                setOpenIdx(null);
                            }
                        }}
                        id="skill-modal-wrapper"
                    >
                        <div
                            className="w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto
                            bg-white rounded-2xl shadow-2xl animate-zoomIn border border-neutral-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MorphBox
                                title={categories[openIdx]?.categoryName}
                                className="bg-transparent shadow-none border-none text-neutral-900"
                            >
                                <SkillList skills={categories[openIdx]?.skills ?? {}} forceFull />
                                <button
                                    onClick={() => setOpenIdx(null)}
                                    className="mt-4 text-blue-600 font-semibold text-sm hover:underline"
                                >
                                    Close
                                </button>
                            </MorphBox>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
