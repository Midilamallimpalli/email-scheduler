import React, { useState } from "react";
import { motion } from "framer-motion";

interface ComposeModalProps {
  onClose: () => void;
  onSend: (recipient: string, subject: string, body: string) => void;
  onSchedule: (recipient: string, subject: string, body: string, scheduledAt: string) => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ onClose, onSend, onSchedule }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [schedule, setSchedule] = useState(""); // only used if isScheduled

  const handleSend = () => {
    if (!recipient || !subject || !body) return alert("Fill all fields!");

    if (isScheduled && schedule.trim() !== "") {
      onSchedule(recipient, subject, body, schedule);
    } else {
      onSend(recipient, subject, body);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-[#1a1a1a] p-6 rounded-2xl w-full max-w-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">Compose New Email</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="To"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="flex-1 p-2 rounded bg-[#0F0F0F] text-white"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 p-2 rounded bg-[#0F0F0F] text-white"
          />
        </div>

        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 rounded bg-[#0F0F0F] text-white mb-4"
          rows={5}
        />

        {/* Schedule toggle */}
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={isScheduled}
            onChange={() => setIsScheduled(!isScheduled)}
          />
          Schedule for later
        </label>

        {isScheduled && (
          <input
            type="datetime-local"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full p-2 rounded bg-[#0F0F0F] text-white mb-4"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            {isScheduled ? "Schedule" : "Send"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ComposeModal;
