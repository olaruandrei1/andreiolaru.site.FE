import { useState } from "react";

type Section = {
    id: string;
    label: string;
};

type Props = {
    sections: Section[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    theme?: "light" | "dark";
};

export const ScrollNav = ({ sections, activeIndex, setActiveIndex }: Props) => {
    const [open, setOpen] = useState(false);

    const scrollTo = (index: number) => {
        setActiveIndex(index);
        setOpen(false); // închide meniul pe mobil după click
    };

    return (
        <>
            {/* Desktop Nav */}
            <div className="hidden md:fixed md:flex md:flex-col md:items-center md:left-8 md:top-1/2 md:-translate-y-1/2 md:gap-3 md:z-50">
                {sections.map(({ id, label }, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={id}
                            onClick={() => scrollTo(index)}
                            className="flex flex-col items-center cursor-pointer group"
                        >
                            {/* Dot */}
                            <div
                                className={`rounded-full transition-all ${
                                    isActive ? "w-4 h-4 bg-blue-500" : "w-2.5 h-2.5 bg-gray-300"
                                }`}
                            />
                            {/* Label */}
                            <div
                                className={`mt-1 text-xs px-2 py-0.5 rounded-xl transition-all ${
                                    isActive
                                        ? "bg-blue-100 text-blue-600 font-semibold"
                                        : "text-gray-500 group-hover:opacity-80"
                                }`}
                            >
                                {label}
                            </div>
                            {/* Line */}
                            {index < sections.length - 1 && (
                                <div className="w-px h-8 bg-gray-300 mt-2" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Mobile Button */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 text-2xl"
            >
                🧭
            </button>

            {/* Mobile Overlay + Modal Nav */}
            {open && (
                <div className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    {/* Modal Nav */}
                    <div
                        className="flex flex-col items-center gap-6 scale-90 opacity-0 animate-fadeInModal"
                    >
                        {sections.map(({ id, label }, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={id}
                                    onClick={() => scrollTo(index)}
                                    className="flex flex-col items-center cursor-pointer group"
                                >
                                    <div
                                        className={`rounded-full transition-all ${
                                            isActive ? "w-4 h-4 bg-blue-500" : "w-2.5 h-2.5 bg-gray-300"
                                        }`}
                                    />
                                    <div
                                        className={`mt-1 text-sm px-3 py-1 rounded-xl transition-all ${
                                            isActive
                                                ? "bg-blue-100 text-blue-600 font-semibold"
                                                : "text-gray-600 group-hover:opacity-80"
                                        }`}
                                    >
                                        {label}
                                    </div>
                                    {index < sections.length - 1 && (
                                        <div className="w-px h-8 bg-gray-300 mt-2" />
                                    )}
                                </div>
                            );
                        })}

                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="mt-8 px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 text-sm"
                        >
                            Close ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style>{`
        @keyframes fadeInModal {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-fadeInModal {
          animation: fadeInModal 0.4s ease-out forwards;
        }
      `}</style>
        </>
    );
};
