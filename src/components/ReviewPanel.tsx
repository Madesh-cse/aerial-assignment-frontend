import { useState } from "react";

type Props = {
  aiData: any;
};

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

const ReviewPanel = ({ aiData }: Props) => {
  const [status, setStatus] = useState<
    "PENDING" | "APPROVED" | "ESCALATED"
  >("PENDING");

  const [reason, setReason] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  if (!aiData) {
    return (
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-gray-500 text-sm">No AI data available</p>
      </div>
    );
  }

  // ✅ FULL BACKEND MAPPING
  const {
    summary,
    confidence = 0,
    alertType = "NORMAL",
    location = "Unknown",
    reasoningSteps = [],
    signals = [],
    followUp,
    timestamp,
  } = aiData;

  // 🔔 TOAST SYSTEM
  const showToast = (message: string, type: Toast["type"]) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // 🟢 APPROVE ACTION
  const handleApprove = () => {
    setStatus("APPROVED");
    setReason("");
    showToast("🟢 Incident marked as safe", "success");
  };

  // 🚨 ESCALATE WITH FEEDBACK LOOP
  const handleEscalate = () => {
    if (!reason.trim()) {
      showToast("⚠ Please provide escalation reason", "error");
      return;
    }

    setStatus("ESCALATED");
    showToast("🚨 Incident escalated successfully", "error");

    console.log("Escalation Reason:", reason);
  };

  const getAlertStyle = () => {
    switch (alertType) {
      case "CRITICAL":
        return "bg-red-100 text-red-600 border-red-400";
      case "WARNING":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      default:
        return "bg-green-100 text-green-600 border-green-300";
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-5 space-y-5 relative transition-all duration-300 border ${
        alertType === "CRITICAL"
          ? "bg-red-50"
          : alertType === "WARNING"
          ? "bg-yellow-50"
          : "bg-white"
      }`}
    >

      {/* 🔔 TOASTS */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-lg text-white text-sm shadow ${
              t.type === "success"
                ? "bg-green-600"
                : t.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          AI Investigation Review
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getAlertStyle()}`}
        >
          {alertType}
        </span>
      </div>

      {/* LOCATION + TIME */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>📍 {location}</span>
        <span>⏱ {timestamp ? new Date(timestamp).toLocaleString() : "N/A"}</span>
      </div>

      {/* SUMMARY (NOW INCLUDES TIME WINDOW FROM BACKEND) */}
      <div className="bg-gray-50 p-4 rounded-xl border">
        <p className="text-sm font-medium text-gray-800">{summary}</p>
      </div>

      {/* CONFIDENCE */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Confidence</span>
          <span className="font-semibold">{confidence}%</span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              confidence > 70
                ? "bg-green-500"
                : confidence > 40
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* 🚨 SIGNALS (IMPORTANT NEW UI PART) */}
      <div className="flex flex-wrap gap-2">
        {signals.map((s: string, i: number) => (
          <span
            key={i}
            className="text-xs px-2 py-1 bg-black text-white rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      {/* 🧠 REASONING */}
      <div>
        <h3 className="font-semibold mb-2">AI Reasoning</h3>

        {reasoningSteps.length === 0 ? (
          <p className="text-sm text-gray-400">No reasoning steps</p>
        ) : (
          <div className="space-y-2">
            {reasoningSteps.map((step: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg"
              >
                <span className="text-blue-500">•</span>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOLLOW UP */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
        <p className="text-sm">{followUp}</p>
      </div>

      {/* ESCALATION REASON INPUT */}
      {status === "PENDING" && (
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Why escalate? (required if escalating)"
          className="w-full p-2 border rounded-lg text-sm"
        />
      )}

      {/* STATUS */}
      <div className="text-xs text-gray-500">
        Status: <span className="font-semibold text-black">{status}</span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-black text-white rounded-xl"
        >
          Approve
        </button>

        <button
          onClick={handleEscalate}
          className="px-4 py-2 border rounded-xl"
        >
          Escalate
        </button>
      </div>
    </div>
  );
};

export default ReviewPanel;