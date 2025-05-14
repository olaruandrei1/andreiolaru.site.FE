import React, { useState } from 'react';
import { MorphBox } from '../../UI/Boxes/MorphBox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSocialLinks } from '../../../api/useSocialLinks';
import { useMediaQuery } from '@mui/material';
import { Carousel } from '../../UI/Carousel/Carousel.tsx';
import { sendContactMessage } from "../../../api/sendContactMessage.tsx";
import { useMe } from "../../../api/useMe.tsx";
import {SocialLinks} from "../../UI/SharedLinks/SocialLinks.tsx";
import {LinkedInCard} from "../../UI/Cards/LinkedInCard.tsx";
import Swal from 'sweetalert2';

export const Contact: React.FC = () => {
    const { data: links, loading: linksLoading } = useSocialLinks();
    const { data: me } = useMe();

    const [form, setForm] = useState({ subject: '', email: '', message: '' });
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
        if (!form.subject.trim()) newErrors.subject = 'Subject is required';
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

            Swal.fire({
                icon: 'success',
                title: 'Message sent!',
                text: 'Thanks for reaching out — I’ll get back to you shortly.',
                confirmButtonColor: '#3085d6',
            });

            setForm({ email: '', subject: '', message: '' }); // optional: reset form
            setSubmitted(true);
        } catch (err) {
            console.error('Failed to send message:', err);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.',
                confirmButtonColor: '#d33',
            });
        }

    };

    return (
        <Box
            component="section"
            id="contact"
            className="min-h-screen py-16 px-6 flex flex-col items-center justify-start overflow-y-auto"
        >
            <Box className="max-w-2xl w-full text-center mb-12">
                <Typography variant="h4" className="!text-3xl md:!text-4xl !font-semibold !text-neutral-900 mb-4">
                    Get in Touch
                </Typography>
            </Box>

            {isMobile ? (
                <>
                    <Carousel>
                        <div>
                            <MorphBox className="p-4">
                                {submitted ? (
                                    <Typography variant="h6" className="!text-blue-600 !font-semibold">
                                        Thanks for reaching out! I’ll be in touch soon.
                                    </Typography>
                                ) : (
                                    <Box component="form" noValidate onSubmit={handleSubmit} className="grid gap-4">
                                        <Typography variant="body1" className="!text-base !text-neutral-600 text-center">
                                            Have a question or just want to say hi? <br />Fill out the form and I’ll get back to you shortly.
                                        </Typography>
                                        <TextField
                                            label="Subject"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            error={!!errors.subject}
                                            helperText={errors.subject}
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

                        <div className="flex items-center justify-center">
                            <LinkedInCard
                                name="Olaru Andrei"
                                job={me?.job ?? ''}
                                imageUrl={me?.imageUrl ?? ''}
                                linkedinUrl={links?.linkedin ?? '#'}
                            />
                        </div>

                        {!linksLoading && links && (
                            <div className="flex items-center justify-center">
                                <MorphBox className="p-6 text-center">
                                    <SocialLinks {...links} />
                                </MorphBox>
                            </div>
                        )}
                    </Carousel>

                    {!linksLoading && links && (
                        <Box className="w-full mt-10 text-center z-10 relative">
                            <SocialLinks {...links} />
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
                                            label="Subject"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            error={!!errors.subject}
                                            helperText={errors.subject}
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
                            <LinkedInCard
                                name="Olaru Andrei"
                                job={me?.job ?? ''}
                                imageUrl={me?.imageUrl ?? ''}
                                linkedinUrl={links?.linkedin ?? '#'}
                            />
                        </Box>
                    </Box>

                    {!linksLoading && links && (
                        <Box className="w-full mt-20 text-center z-10">
                            <SocialLinks {...links} />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};
