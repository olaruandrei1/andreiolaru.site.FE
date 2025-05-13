import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Typography } from '@mui/material';

interface LinkedInCardProps {
    name: string;
    job: string;
    imageUrl: string;
    linkedinUrl: string;
}

export const LinkedInCard: React.FC<LinkedInCardProps> = ({ name, job, imageUrl, linkedinUrl }) => (
    <Box className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white p-6 border border-neutral-200 text-center space-y-4">
        {/* header dots */}
        <div className="flex space-x-2 justify-start">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></span>
        </div>

        {/* imagine */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mx-auto border border-neutral-300 shadow-sm">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="LinkedIn profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/svgs/default-profile.svg";
                    }}
                />
            ) : (
                <img
                    src="/svgs/default-profile.svg"
                    alt="Default profile"
                    className="w-full h-full object-cover"
                />
            )}
        </div>

        {/* titlu */}
        <div className="flex items-center justify-center gap-2 text-neutral-900">
            <span className="text-xl font-semibold">Let's connect on</span>
            <LinkedInIcon fontSize="medium" className="text-blue-600" />
        </div>

        {/* nume */}
        <Typography variant="h6" className="!text-neutral-900">
            {name}
        </Typography>

        {/* rol/job */}
        <Typography variant="body2" className="!text-neutral-500 leading-relaxed">
            {job}
        </Typography>

        {/* buton */}
        <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-5 py-2 rounded-full shadow-sm"
        >
            Connect on LinkedIn ↗
        </a>
    </Box>
);
