import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';

interface SocialLinksProps {
    linkedin?: string;
    github?: string;
    x?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ linkedin, github, x }) => {
    if (!linkedin && !github && !x) return null;

    const iconStyle = `transition-transform duration-200 transform hover:scale-125`;

    return (
        <Box className="text-center">
            <Typography variant="body1" className="mb-2 text-gray-600">
                You can also find me here:
            </Typography>
            <Box className="flex justify-center gap-6 text-2xl">
                {linkedin && (
                    <IconButton
                        component="a"
                        href={linkedin}
                        target="_blank"
                        className={`${iconStyle} hover:text-blue-600`}
                    >
                        <LinkedInIcon fontSize="large" />
                    </IconButton>
                )}
                {github && (
                    <IconButton
                        component="a"
                        href={github}
                        target="_blank"
                        className={`${iconStyle} hover:text-gray-900`}
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                )}
                {x && (
                    <IconButton
                        component="a"
                        href={x}
                        target="_blank"
                        className={`${iconStyle} hover:text-blue-400`}
                    >
                        <XIcon fontSize="large" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};
