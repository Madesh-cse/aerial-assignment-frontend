const AIResponsePanel = ({ data }: any) => {
  if (!data) {
    return (
      <div className="text-gray-400 text-sm">
        Ask AI to analyze an incident...
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="bg-gray-100 p-3 rounded-lg">
        <p className="text-sm">{data.explanation}</p>
      </div>

      <div className="text-xs text-gray-600 space-y-1">
        <p>📍 {data.focusLocation}</p>
        <p>📊 Confidence: {data.confidence}%</p>
      </div>

      <div>
        <h4 className="text-xs font-semibold mb-1">Signal Breakdown</h4>

        <div className="text-xs space-y-1">
          <div>🟢 Badge: {data.breakdown.badge}</div>
          <div>🚗 Vehicle: {data.breakdown.vehicle}</div>
          <div>🚁 Drone: {data.breakdown.drone}</div>
        </div>
      </div>

    </div>
  );
};

export default AIResponsePanel;