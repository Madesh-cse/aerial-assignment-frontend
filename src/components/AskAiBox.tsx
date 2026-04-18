import { useState } from "react";

type Props = {
  onResult: (data: any) => void;
};

const AskAIBox = ({ onResult }: Props) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    const res = await fetch("https://aerial-assignment-backend-1.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    onResult(data);

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold">Chat Box</h2>

      <input
        className="w-full border rounded-lg p-2 text-sm"
        placeholder="Ask about incident..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
};

export default AskAIBox;