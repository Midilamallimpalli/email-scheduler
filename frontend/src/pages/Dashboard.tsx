import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ComposeModal from "../components/ComposeModal";
import SentEmails from "../components/SentEmails";
import ScheduledEmails from "../components/ScheduledEmails";

interface Email {
  id: number;
  recipient: string;
  subject: string;
  body: string;
  sentAt?: string;
  scheduledAt?: string;
}

const Dashboard: React.FC = () => {
  const [openCompose, setOpenCompose] = useState(false);
  const [activeTab, setActiveTab] = useState<"scheduled" | "sent">("scheduled");

  const [sentEmails, setSentEmails] = useState<Email[]>([]);
  const [scheduledEmails, setScheduledEmails] = useState<Email[]>([]);

  // Send immediately
  const handleSendEmail = (recipient: string, subject: string, body: string) => {
    const newEmail: Email = {
      id: sentEmails.length + 1,
      recipient,
      subject,
      body,
      sentAt: "Just now",
    };
    setSentEmails([newEmail, ...sentEmails]);
    setOpenCompose(false);
    setActiveTab("sent");
  };

  // Schedule email
  const handleScheduleEmail = (recipient: string, subject: string, body: string, scheduledAt: string) => {
    const newEmail: Email = {
      id: scheduledEmails.length + 1,
      recipient,
      subject,
      body,
      scheduledAt,
    };
    setScheduledEmails([newEmail, ...scheduledEmails]);
    setOpenCompose(false);
    setActiveTab("scheduled");
  };

  // AUTO-SEND: move scheduled emails to sent when time passes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Filter emails that are ready to send
      const readyToSend = scheduledEmails.filter(email => {
        return email.scheduledAt && new Date(email.scheduledAt) <= now;
      });

      if (readyToSend.length > 0) {
        // Move to Sent Emails
        const newSent = readyToSend.map(email => ({
          id: sentEmails.length + 1,
          recipient: email.recipient,
          subject: email.subject,
          body: email.body,
          sentAt: "Just now",
        }));

        setSentEmails(prev => [...newSent, ...prev]);
        // Remove from Scheduled Emails
        setScheduledEmails(prev => prev.filter(email => !readyToSend.includes(email)));
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [scheduledEmails, sentEmails]);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ReachInbox Dashboard</h1>
        <button
          onClick={() => setOpenCompose(true)}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          + Compose New Email
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`px-4 py-2 rounded ${activeTab === "scheduled" ? "bg-gray-700" : "bg-gray-800"}`}
        >
          Scheduled Emails
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 rounded ${activeTab === "sent" ? "bg-gray-700" : "bg-gray-800"}`}
        >
          Sent Emails
        </button>
      </div>

      {/* Email Lists */}
      <AnimatePresence exitBeforeEnter>
        {activeTab === "scheduled" ? (
          <motion.div
            key="scheduled"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScheduledEmails emails={scheduledEmails} />
          </motion.div>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SentEmails emails={sentEmails} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compose Modal */}
      {openCompose && (
        <ComposeModal
          onClose={() => setOpenCompose(false)}
          onSend={handleSendEmail}
          onSchedule={handleScheduleEmail}
        />
      )}
    </div>
  );
};

export default Dashboard;
