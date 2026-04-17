type Props = {
  logs: string[];
};

const AuditLogPanel = ({ logs }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 h-52 overflow-auto">
      <h2 className="text-lg font-semibold mb-3">Audit Logs</h2>

      {logs.length === 0 ? (
        <p className="text-gray-400 text-sm">No logs yet</p>
      ) : (
        logs.map((log, i) => (
          <div key={i} className="text-xs text-gray-700 border-b py-1">
            • {log}
          </div>
        ))
      )}
    </div>
  );
};

export default AuditLogPanel;