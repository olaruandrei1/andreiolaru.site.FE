import { CvBox } from './CvBox';
import { useAbout } from '../../../api/useAbout.tsx';
import { MorphBox } from '../../UI/Boxes/MorphBox.tsx';
import { useState } from 'react';

export const About = () => {
    const { data, loading } = useAbout();
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    if (loading || !data) return null;

    const blocks = [data.whoIAm, data.mindset];

    return (
        <section
            id="about"
            className="min-h-screen px-6 py-16 flex flex-col items-center max-w-6xl mx-auto"
        >
            <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-10">
                A few words about me
            </h2>

            {/* Desktop layout */}
            <div className="hidden md:flex flex-row gap-8 w-full">
                <div className="flex flex-col gap-8 flex-1">
                    {blocks.map((block, i) => {
                        const maxChars = 600;
                        const charCount = block.content.length;
                        const truncated = charCount > maxChars;
                        const fontSizeClass =
                            charCount > 1000
                                ? 'text-sm'
                                : charCount > 800
                                    ? 'text-[0.95rem]'
                                    : 'text-base';
                        const displayText = truncated
                            ? block.content.slice(0, maxChars) + '...'
                            : block.content;

                        return (
                            <MorphBox
                                key={i}
                                title={block.title}
                                className="bg-[rgba(240,245,255,0.5)] backdrop-blur-xl border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-neutral-800"
                            >
                                <p className={`${fontSizeClass} leading-relaxed`}>
                                    {displayText}
                                </p>
                                {truncated && (
                                    <button
                                        onClick={() => setOpenIdx(i)}
                                        className="text-blue-600 font-semibold mt-2 text-sm hover:underline"
                                    >
                                        Read more
                                    </button>
                                )}
                            </MorphBox>
                        );
                    })}
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <CvBox downloadUrl={data.cvDownloadUrl} />
                </div>
            </div>

            {/* Mobile layout */}
            <div className="flex flex-col gap-8 w-full md:hidden">
                {blocks.map((block, i) => {
                    const maxChars = 200;
                    const charCount = block.content.length;
                    const truncated = charCount > maxChars;
                    const fontSizeClass =
                        charCount > 1000
                            ? 'text-sm'
                            : charCount > 800
                                ? 'text-[0.95rem]'
                                : 'text-base';
                    const displayText = truncated
                        ? block.content.slice(0, maxChars) + '...'
                        : block.content;

                    return (
                        <MorphBox
                            key={i}
                            title={block.title}
                            className="bg-[rgba(240,245,255,0.5)] backdrop-blur-xl border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-neutral-800"
                        >
                            <p className={`${fontSizeClass} leading-relaxed`}>
                                {displayText}
                            </p>
                            {truncated && (
                                <button
                                    onClick={() => setOpenIdx(i)}
                                    className="text-blue-600 font-semibold mt-2 text-sm hover:underline"
                                >
                                    Read more
                                </button>
                            )}
                        </MorphBox>
                    );
                })}

                <div className="w-full">
                    <CvBox downloadUrl={data.cvDownloadUrl} />
                </div>
            </div>

            {/* Modal */}
            {openIdx !== null && (
                <>
                    <div
                        onClick={() => setOpenIdx(null)}
                        className="fixed inset-0 bg-black/50 z-50"
                    />
                    <div className="fixed top-1/2 left-1/2 w-[90vw] max-w-2xl h-[70vh] -translate-x-1/2 -translate-y-1/2 z-50 overflow-y-auto">
                        <MorphBox
                            solid
                            title={blocks[openIdx].title}
                            className="bg-white backdrop-blur-none border border-neutral-200 shadow-2xl"
                        >
                            <p className="text-base text-neutral-800 leading-relaxed whitespace-pre-wrap">
                                {blocks[openIdx].content}
                            </p>
                            <button
                                onClick={() => setOpenIdx(null)}
                                className="mt-4 text-blue-600 font-semibold text-sm hover:underline"
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
