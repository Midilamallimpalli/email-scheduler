import { Worker } from "bullmq";
import { transporter } from "./services/mail.service";
import { db } from "./config/db";

console.log("🚀 Email worker started");

new Worker(
  "emailQueue",
  async (job) => {
    console.log("📥 Job received:", job.data);

    const { to, subject, body, id } = job.data;

    try {
      console.log(`📤 Sending email to ${to}`);

      await transporter.sendMail({
        from: "ReachInbox <no-reply@reachinbox.ai>",
        to,
        subject,
        text: body,
      });

      await db.query(
        "UPDATE email_jobs SET status='sent' WHERE id=?",
        [id]
      );

      console.log(`✅ Email sent & DB updated (id=${id})`);
    } catch (err) {
      console.error("❌ Email failed:", err);

      await db.query(
        "UPDATE email_jobs SET status='failed' WHERE id=?",
        [id]
      );

      throw err; // lets BullMQ retry
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
    concurrency: Number(process.env.WORKER_CONCURRENCY) || 5,
  }
);
