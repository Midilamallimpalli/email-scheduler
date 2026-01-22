// frontend/src/services/email.service.ts
import axios from "axios";

const API_BASE = "http://localhost:5000/api/emails"; // backend URL

export interface Email {
  id: number;
  to_email: string;
  subject: string;
  body: string;
  scheduled_at: string;
  status: "scheduled" | "sent" | "failed";
  created_at: string;
}

// Fetch scheduled emails
export const fetchScheduledEmails = async (): Promise<Email[]> => {
  const response = await axios.get<Email[]>(`${API_BASE}/scheduled`);
  return response.data;
};

// Fetch sent emails
export const fetchSentEmails = async (): Promise<Email[]> => {
  const response = await axios.get<Email[]>(`${API_BASE}/sent`);
  return response.data;
};

// Schedule a new email
export const scheduleEmail = async (email: {
  to: string;
  subject: string;
  body: string;
  scheduledAt: string;
}): Promise<{ message: string }> => {
  const response = await axios.post(`${API_BASE}/schedule`, email, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
