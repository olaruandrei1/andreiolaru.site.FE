type Props = {
    downloadUrl: string;
};

export const CvBox = ({ downloadUrl }: Props) => {
    return (
        <div className="mt-12 flex flex-col items-center text-center">
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
    );
};
