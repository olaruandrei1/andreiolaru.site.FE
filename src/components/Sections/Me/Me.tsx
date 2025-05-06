import { useEffect, useState } from 'react';
import { useMe } from '../../../api/useMe.tsx';
import { MorphBox } from '../../UI/Boxes/MorphBox.tsx';

export const Me = () => {
    const { data, loading } = useMe();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (!loading) setAnimate(true);
    }, [loading]);

    if (loading || !data) return null;

    const { title, job, description, imageUrl } = data;

    return (
        <section id="me" className="relative h-screen w-full">
            <div
                data-scrollable
                className="h-full overflow-y-auto flex flex-col items-center justify-center min-h-[120vh] md:min-h-full"
            >

            <img
                src={imageUrl}
                alt="Andrei"
                className="max-h-[85vh] w-auto object-contain z-0"
                style={{
                    maskImage:
                        'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.85), rgba(0,0,0,0))',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.85), rgba(0,0,0,0))',
                }}
            />

            {/* Box alb, vizibil, central jos */}
            <div className="absolute bottom-16 w-full flex justify-center px-4 z-10">
                <MorphBox className="max-w-xl w-full text-center p-6 md:p-8">
                    <div
                        className={`transition-all duration-700 ${
                            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                            {title}
                        </h2>
                        <h3 className="text-lg md:text-xl font-mono text-blue-600 font-bold flex items-center justify-center mb-2">
                            {job}
                            <span className="ml-2 animate-pulse">|</span>
                        </h3>
                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </MorphBox>
            </div>
            </div>
        </section>
    );
};
