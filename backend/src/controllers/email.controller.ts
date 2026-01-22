import { Request, Response } from "express";
import { emailQueue } from "../queues/emailQueue";
import { db } from "../config/db";

/**
 * POST /api/emails/schedule
 */
export const scheduleEmail = async (req: Request, res: Response) => {
  try {
    const { to, subject, body, scheduledAt } = req.body;

    if (!to || !subject || !body || !scheduledAt) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [result]: any = await db.query(
      "INSERT INTO email_jobs (to_email, subject, body, scheduled_at) VALUES (?,?,?,?)",
      [to, subject, body, scheduledAt]
    );

    const delay = new Date(scheduledAt).getTime() - Date.now();

    await emailQueue.add(
      "send-email",
      { to, subject, body, id: result.insertId },
      { delay }
    );

    res.json({ message: "Email scheduled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to schedule email" });
  }
};

/**
 * GET /api/emails/scheduled
 */
export const getScheduledEmails = async (_: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM email_jobs WHERE status='scheduled' ORDER BY scheduled_at ASC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch scheduled emails" });
  }
};

/**
 * GET /api/emails/sent
 */
export const getSentEmails = async (_: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM email_jobs WHERE status='sent' ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sent emails" });
  }
};
