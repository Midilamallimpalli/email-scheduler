export interface EmailJob {
  id?: number;
  to_email: string;
  subject: string;
  body: string;
  scheduled_at: Date;
  status: "scheduled" | "sent" | "failed";
  created_at?: Date;
}
