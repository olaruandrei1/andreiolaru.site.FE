type Props = {
    downloadUrl: string;
};

export const CvBox = ({ downloadUrl }: Props) => {
    return (
        <div className="mt-12 flex justify-center w-full">
            <div
                className="bg-white rounded-2xl p-6 max-w-md w-full text-center border border-neutral-200"
                style={{
                    boxShadow:
                        'inset 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 -4px 12px rgba(0, 0, 0, 0.06)',
                }}
            >
                <p className="mb-4 text-gray-700">
                    Want to know more? You can download my full CV below.
                </p>
                <a
                    href={downloadUrl}
                    download
                    className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300"
                >
                    Download CV
                </a>
            </div>
        </div>
    );
};
