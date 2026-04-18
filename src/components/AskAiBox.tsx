import { useState } from "react";

type Props = {
  onResult: (data: any) => void;
};

const AskAIBox = ({ onResult }: Props) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question) return;

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    onResult(data);
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-3">
      <h2 className="font-semibold">Ask AI About Incident</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="e.g. Why is Block C suspicious?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Ask AI"}
      </button>
    </div>
  );
};

export default AskAIBox;