type Props = {
  logs: string[];
};

const getStyle = (log: string) => {
  const text = log.toLowerCase();

  if (text.includes("alert") || text.includes("🚨")) {
    return "border-red-400 bg-red-50 text-red-700";
  }

  if (text.includes("drone") || text.includes("moved")) {
    return "border-blue-400 bg-blue-50 text-blue-700";
  }

  if (text.includes("ack") || text.includes("approved")) {
    return "border-green-400 bg-green-50 text-green-700";
  }

  return "border-gray-200 bg-gray-50 text-gray-700";
};

const AuditLogPanel = ({ logs }: Props) => {
  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="bg-white rounded-2xl shadow p-4 h-60 overflow-auto">
      <h2 className="text-lg font-semibold mb-3">Audit Logs</h2>

      {logs.length === 0 ? (
        <p className="text-gray-400 text-sm">No logs yet</p>
      ) : (
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`border-l-4 p-2 rounded-md text-sm transition-all duration-200 hover:shadow-sm hover:translate-x-1 ${getStyle(
                log
              )}`}
            >
              <div className="flex justify-between text-[11px] opacity-60 mb-1">
                <span>Event {i + 1}</span>
                <span>{getTime()}</span>
              </div>

              <p className="text-sm">{log}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditLogPanel;