import api from './configuration/axios';

export type ContactPayload = {
    name: string;
    email: string;
    message: string;
};

export const sendContactMessage = async (payload: ContactPayload) => {
    await api.post('/contact', payload);
};
