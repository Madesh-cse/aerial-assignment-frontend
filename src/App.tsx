import { useEffect, useState } from "react";
import Dashboard from "./components/DashBoard";
import IncidentTimeline from "./components/IncidentTimeLine";
import SiteMap from "./components/SiteMap";
import DroneSimulation from "./components/DroneSimulation";
import ReviewPanel from "./components/ReviewPanel";
import AuditLogPanel from "./components/AuditLog";
import AskAIBox from "./components/AskAiBox";
import AIResponsePanel from "./components/AIResponsePanel";

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [resolved, setResolved] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/investigate")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Dashboard>
      {loading ? (
        <p className="text-center">AI is investigating overnight events...</p>
      ) : (
        <div className="flex gap-4 h-[calc(100vh-80px)]">
          {/* 🧠 LEFT MAIN SYSTEM */}
          <div className="flex-1 grid grid-cols-2 gap-4 overflow-auto pr-2">
            <IncidentTimeline
              incidents={data?.incidents}
              onSelect={setSelectedIncident}
            />

            <SiteMap
              incidents={data?.incidents}
              aiData={data}
              selectedIncident={selectedIncident}
              resolved={resolved}
            />

            <DroneSimulation
              aiData={data}
              onLog={(msg) => setLogs((prev) => [...prev, msg])}
            />

            <AuditLogPanel logs={logs} />

            <ReviewPanel
              aiData={data}
              onResolve={(location) =>
                setResolved((prev) => [...prev, location])
              }
            />
          </div>

          {/* 🤖 RIGHT COPILOT PANEL */}
          <div className="w-[300px] border-l bg-white flex flex-col">
            {/* Ask Box */}
            <div className="p-3 border-b">
              <AskAIBox onResult={setAiResponse} />
            </div>

            {/* Response Panel */}
            <div className="flex-1 overflow-auto p-3">
              <AIResponsePanel data={aiResponse} />
            </div>
          </div>
        </div>
      )}
    </Dashboard>
  );
}
export default App;
