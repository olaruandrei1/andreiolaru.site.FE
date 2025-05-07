import React, { useState } from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSocialLinks } from '../../../api/useSocialLinks';
import { useMediaQuery } from '@mui/material';
import { Carousel } from '../../UI/Carousel/GenericMotionCarousel';
import {sendContactMessage} from "../../../api/sendContactMessage.tsx";
import {useMe} from "../../../api/useMe.tsx";

export const Contact: React.FC = () => {
    const { data: links, loading: linksLoading } = useSocialLinks();
    const { data: me } = useMe();

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ [K in keyof typeof form]?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = 'Invalid email';
        if (!form.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErr = validate();
        if (Object.keys(newErr).length) {
            setErrors(newErr);
            return;
        }

        try {
            await sendContactMessage(form);
            setSubmitted(true);
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Oops! Something went wrong. Please try again later.');
        }
    };

    return (
        <Box
            component="section"
            id="contact"
            className="min-h-screen py-16 px-6 flex flex-col items-center justify-start overflow-y-auto"
        >
            {/* Header text */}
            <Box className="max-w-2xl w-full text-center mb-12">
                <Typography variant="h4" className="!text-3xl md:!text-4xl !font-semibold !text-neutral-900 mb-4">
                    Get in Touch
                </Typography>
            </Box>

            {/* Form + LinkedIn Card */}
            {isMobile ? (
                <>
                    <Carousel>
                        {/* Slide 1 - Form */}
                        <div>
                            <MorphBox className="p-4">
                                {submitted ? (
                                    <Typography variant="h6" className="!text-blue-600 !font-semibold">
                                        Thanks for reaching out! I’ll be in touch soon.
                                    </Typography>
                                ) : (
                                    <Box component="form" noValidate onSubmit={handleSubmit} className="grid gap-4">
                                        <Typography variant="body1" className="!text-base !text-neutral-600 text-center">
                                            Have a question or just want to say hi? <br/>Fill out the form and I’ll get back to you shortly.
                                        </Typography>
                                        <TextField
                                            label="Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows={5}
                                            value={form.message}
                                            onChange={handleChange}
                                            error={!!errors.message}
                                            helperText={errors.message}
                                            fullWidth
                                        />
                                        <Button type="submit" variant="contained" size="large" fullWidth>
                                            Send Message
                                        </Button>
                                    </Box>
                                )}
                            </MorphBox>
                        </div>

                        {/* Slide 2 - Card */}
                        <div className="flex items-center justify-center">
                            <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-6 border border-neutral-200 text-center">
                                <img
                                    src="https://avatars.githubusercontent.com/u/000000?v=4"
                                    alt="LinkedIn profile"
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-lg font-semibold text-neutral-900">
                                    {me?.title}
                                </h3>
                                <p className="text-sm text-neutral-600 mb-4">
                                    {me?.job}
                                </p>
                                <a
                                    href={links?.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
                                >
                                    Connect on LinkedIn ↗
                                </a>
                            </div>
                        </div>

                        {/* Slide 3 - Social Icons */}
                        {!linksLoading && links && (
                            <div className="flex items-center justify-center">
                                <MorphBox className="p-6 text-center">
                                    <Typography variant="body1" className="mb-4 text-gray-600">
                                        You can also find me here:
                                    </Typography>
                                    <Box className="flex justify-center gap-6 text-gray-700 text-2xl">
                                        <IconButton component="a" href={links.linkedin} target="_blank" className="hover:text-blue-600 transition">
                                            <LinkedInIcon fontSize="large" />
                                        </IconButton>
                                        <IconButton component="a" href={links.github} target="_blank" className="hover:text-gray-900 transition">
                                            <GitHubIcon fontSize="large" />
                                        </IconButton>
                                        <IconButton component="a" href={links.x} target="_blank" className="hover:text-blue-400 transition">
                                            <TwitterIcon fontSize="large" />
                                        </IconButton>
                                    </Box>
                                </MorphBox>
                            </div>
                        )}

                    </Carousel>

                    {/* Social Links on mobile explicitly rendered */}
                    {!linksLoading && links && (
                        <Box className="w-full mt-10 text-center z-10 relative">
                            <Typography variant="body1" className="mb-2 text-gray-600">
                                You can also find me here:
                            </Typography>
                            <Box className="flex justify-center gap-6 text-gray-700 text-2xl">
                                <IconButton component="a" href={links.linkedin} target="_blank" className="hover:text-blue-600 transition">
                                    <LinkedInIcon fontSize="large" />
                                </IconButton>
                                <IconButton component="a" href={links.github} target="_blank" className="hover:text-gray-900 transition">
                                    <GitHubIcon fontSize="large" />
                                </IconButton>
                                <IconButton component="a" href={links.x} target="_blank" className="hover:text-blue-400 transition">
                                    <TwitterIcon fontSize="large" />
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                </>
            ) : (
                <>
                    <Box className="grid grid-cols-2 gap-8 w-full max-w-6xl">
                        <Box>
                            <MorphBox className="p-6">
                                {submitted ? (
                                    <Typography variant="h6" className="!text-blue-600 !font-semibold">
                                        Thanks for reaching out! I’ll be in touch soon.
                                    </Typography>
                                ) : (
                                    <Box component="form" noValidate onSubmit={handleSubmit} className="grid gap-4">
                                        <TextField
                                            label="Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows={5}
                                            value={form.message}
                                            onChange={handleChange}
                                            error={!!errors.message}
                                            helperText={errors.message}
                                            fullWidth
                                        />
                                        <Button type="submit" variant="contained" size="large" fullWidth>
                                            Send Message
                                        </Button>
                                    </Box>
                                )}
                            </MorphBox>
                        </Box>
                        <Box className="flex items-center justify-center">
                            <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-6 border border-neutral-200 text-center">
                                <img
                                    src="https://avatars.githubusercontent.com/u/000000?v=4"
                                    alt="LinkedIn profile"
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-lg font-semibold text-neutral-900">
                                    {me?.title}
                                </h3>
                                <p className="text-sm text-neutral-600 mb-4">
                                    {me?.job}
                                </p>
                                <a
                                    href={links?.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
                                >
                                    Connect on LinkedIn ↗
                                </a>
                            </div>
                        </Box>
                    </Box>

                    {/* Social Links */}
                    {!linksLoading && links && (
                        <Box className="w-full mt-10 text-center z-10">
                            <Typography variant="body1" className="mb-2 text-gray-600">
                                You can also find me here:
                            </Typography>
                            <Box className="flex justify-center gap-6 text-gray-700 text-2xl">
                                <IconButton component="a" href={links.linkedin} target="_blank" className="hover:text-blue-600 transition">
                                    <LinkedInIcon fontSize="large" />
                                </IconButton>
                                <IconButton component="a" href={links.github} target="_blank" className="hover:text-gray-900 transition">
                                    <GitHubIcon fontSize="large" />
                                </IconButton>
                                <IconButton component="a" href={links.x} target="_blank" className="hover:text-blue-400 transition">
                                    <TwitterIcon fontSize="large" />
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};
