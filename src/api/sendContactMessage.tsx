import api from './configuration/axios';
import {ApiMap} from "../constants/ApiMap.tsx";

export type ContactPayload = {
    subject: string;
    email: string;
    message: string;
};

export const sendContactMessage = async (payload: ContactPayload) => {
    await api.post(ApiMap.contact.url, payload);
};
