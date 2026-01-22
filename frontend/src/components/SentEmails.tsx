import React from "react";
import { motion } from "framer-motion";

interface Email {
  id: number;
  subject: string;
  recipient: string;
  body?: string;
  sentAt?: string;
}

interface SentEmailsProps {
  emails: Email[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const SentEmails: React.FC<SentEmailsProps> = ({ emails }) => {
  if (emails.length === 0) return <div className="text-gray-400">No sent emails yet.</div>;

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {emails.map((email) => (
        <motion.div
          key={email.id}
          className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] shadow-sm flex flex-col"
          variants={item}
        >
          <div className="flex justify-between">
            <p className="font-medium">{email.subject}</p>
            <p className="text-gray-500 text-sm">{email.sentAt}</p>
          </div>
          <p className="text-gray-400 text-sm">{email.recipient}</p>
          {email.body && <p className="mt-2 text-gray-300 text-sm">{email.body}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SentEmails;
