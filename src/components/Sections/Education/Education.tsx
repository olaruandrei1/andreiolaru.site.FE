import React, { useState } from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import { useEducation } from '../../../api/useEducation';
import { Carousel } from '../../UI/Carousel/GenericMotionCarousel';
import {EducationCard} from "../../UI/Cards/EducationCard.tsx";

export const Education: React.FC = () => {
    const {data, loading} = useEducation();
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    if (loading) {
        return (
            <section id="education" className="py-16 text-center">
                <p className="text-gray-500 text-base">Loading...</p>
            </section>
        );
    }
        return (
            <section id="education" className="py-16 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-center text-neutral-900 mb-8">
                        Education & Credentials
                    </h2>

                    <Carousel>
                        {data!.map((edu, idx) => (
                            <EducationCard
                                key={idx}
                                edu={edu}
                                onReadMore={() => setOpenIdx(idx)}
                            />
                        ))}
                    </Carousel>
                </div>

                {/* Modal */}
                {openIdx !== null && data && (
                    <>
                        <div
                            onClick={() => setOpenIdx(null)}
                            className="fixed inset-0 bg-black/50 z-50"
                        />

                        <div
                            className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl max-h-[80vh] overflow-y-auto">
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    padding: '2rem',
                                    background: '#fff',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                }}
                            >
                                <MorphBox>
                                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                                        {data[openIdx].degree}
                                    </h3>
                                    <p className="text-lg text-neutral-500">{data[openIdx].institution}</p>
                                    <p className="text-sm text-neutral-500 mb-4">{data[openIdx].period}</p>
                                    <p className="text-base text-neutral-900 leading-relaxed whitespace-pre-wrap">
                                        {data[openIdx].description}
                                    </p>

                                    <button
                                        onClick={() => setOpenIdx(null)}
                                        className="mt-6 text-blue-500 font-semibold hover:underline transition"
                                    >
                                        Close
                                    </button>
                                </MorphBox>
                            </div>
                        </div>
                    </>
                )}

            </section>
        );
};