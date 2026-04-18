const AIResponsePanel = ({ data }: any) => {
  if (!data) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
      <h3 className="font-semibold">AI Explanation</h3>

      <p className="text-sm">{data.explanation}</p>

      <div className="text-sm text-gray-600">
        <p>📍 Location: {data.focusLocation}</p>
        <p>📊 Confidence: {data.confidence}%</p>
      </div>

      <div>
        <h4 className="font-semibold text-sm">Signal Breakdown</h4>
        <ul className="text-xs">
          <li>Badge: {data.breakdown.badge}</li>
          <li>Vehicle: {data.breakdown.vehicle}</li>
          <li>Drone: {data.breakdown.drone}</li>
        </ul>
      </div>
    </div>
  );
};

export default AIResponsePanel;