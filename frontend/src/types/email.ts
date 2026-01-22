export interface EmailJob {
  id: number;
  to_email: string;
  subject: string;
  body: string;
  scheduled_at: string;
  status: "scheduled" | "sent" | "failed";
  created_at: string;
}
