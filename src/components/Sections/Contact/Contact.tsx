// components/Sections/Contact/Contact.tsx
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
import {useSocialLinks} from "../../../api/useSocialLinks.tsx";

export const Contact: React.FC = () => {
    const { data: links, loading: linksLoading } = useSocialLinks();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ [K in keyof typeof form]?: string }>({});
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErr = validate();
        if (Object.keys(newErr).length) {
            setErrors(newErr);
            return;
        }
        // TODO: axios/fetch
        setSubmitted(true);
    };

    return (
        <Box
            component="section"
            id="contact"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 4,
                px: 2,
                py: 6,
                minHeight: '80vh',
                maxWidth: 1200,
                mx: 'auto',
            }}
        >
            {/* Left text */}
            <Box sx={{ flex: '1 1 300px', minWidth: 280 }}>
                <Typography variant="h4" gutterBottom>
                    Get in Touch
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Have a question or just want to say hi? Fill out the form on the right and I’ll get back to%
                    you shortly.
                </Typography>
            </Box>

            {/* Right form */}
            <Box sx={{ flex: '1 1 350px', minWidth: 280 }}>
                <MorphBox sx={{ p: 3 }}>
                    {submitted ? (
                        <Typography variant="h6" color="primary">
                            Thanks for reaching out! I’ll be in touch soon.
                        </Typography>
                    ) : (
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
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

            {/* Social links */}
            {!linksLoading && links && (
                <Box sx={{ width: '100%', mt: 4, textAlign: 'center' }}>
                    <Typography variant="body1" gutterBottom>
                        Also, you can find me on:
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <IconButton component="a" href={links.linkedin} target="_blank">
                            <LinkedInIcon fontSize="large" />
                        </IconButton>
                        <IconButton component="a" href={links.github} target="_blank">
                            <GitHubIcon fontSize="large" />
                        </IconButton>
                        <IconButton component="a" href={links.x} target="_blank">
                            <TwitterIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
};
