import axios from "axios";

const API_URL = "http://localhost:5000/api/emails";

export const scheduleEmailAPI = (data: {
  to: string;
  subject: string;
  body: string;
  scheduledAt: string;
}) => axios.post(`${API_URL}/schedule`, data);

export const getScheduledEmails = () => axios.get(`${API_URL}/scheduled`);
export const getSentEmails = () => axios.get(`${API_URL}/sent`);
