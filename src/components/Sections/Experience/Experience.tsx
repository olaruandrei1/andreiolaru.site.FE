import React, {useEffect, useState} from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { useExperience } from '../../../api/useExperience';
import { Carousel } from '../../UI/Carousel/GenericMotionCarousel';
import { ExperienceCard } from '../../UI/Cards/ExperienceCard.tsx';

type Props = {
    setDisableScroll: (val: boolean) => void;
};

export const Experience: React.FC<Props> = ({ setDisableScroll }) => {

    const { data, loading } = useExperience();
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    useEffect(() => {
        setDisableScroll(openIdx !== null);
    }, [openIdx, setDisableScroll]);


    if (loading) {
        return (
            <section id="experience" className="py-16 text-center">
                <p className="text-gray-500 text-base">Loading...</p>
            </section>
        );
    }

    return (
        <section id="experience" className="py-16 relative">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-center text-neutral-900 mb-8">
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

            {/* Modal */}
            {openIdx !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={(e) => {
                        if ((e.target as HTMLElement).id === 'experience-modal-wrapper') {
                            setOpenIdx(null);
                        }
                    }}
                    id="experience-modal-wrapper"
                >
                    <div
                        className="w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-zoomIn border border-neutral-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MorphBox
                            className="bg-transparent border-none shadow-none text-neutral-900"
                            style={{ padding: '2rem' }}
                        >
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                                {data[openIdx].title}
                            </h3>
                            <p className="text-lg text-neutral-500">{data[openIdx].company}</p>
                            <p className="text-sm text-neutral-500 mb-4">{data[openIdx].period}</p>
                            <div
                                data-scroll-lock="true"
                                className="max-h-[300px] overflow-y-auto pr-2 text-base text-neutral-900 leading-relaxed whitespace-pre-wrap"
                            >
                                {data[openIdx].description}
                            </div>
                            <button
                                onClick={() => setOpenIdx(null)}
                                className="mt-6 text-blue-500 font-semibold hover:underline transition"
                            >
                                Close
                            </button>
                        </MorphBox>
                    </div>
                </div>
            )}
        </section>
    );
};
