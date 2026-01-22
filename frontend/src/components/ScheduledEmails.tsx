import React from "react";

interface Email {
  id: number;
  subject: string;
  recipient: string;
  body?: string;
  scheduledAt?: string;
}

interface ScheduledEmailsProps {
  emails: Email[];
}

const ScheduledEmails: React.FC<ScheduledEmailsProps> = ({ emails }) => {
  if (emails.length === 0) return <div className="text-gray-400">No scheduled emails yet.</div>;

  return (
    <div className="flex flex-col gap-4">
      {emails.map((email) => (
        <div key={email.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] shadow-sm flex flex-col">
          <div className="flex justify-between">
            <p className="font-medium">{email.subject}</p>
            <p className="text-gray-500 text-sm">{email.scheduledAt}</p>
          </div>
          <p className="text-gray-400 text-sm">{email.recipient}</p>
          {email.body && <p className="mt-2 text-gray-300 text-sm">{email.body}</p>}
        </div>
      ))}
    </div>
  );
};

export default ScheduledEmails;
