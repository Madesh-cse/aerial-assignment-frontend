import { useEffect, useState } from "react";
import Dashboard from "./components/DashBoard";
import IncidentTimeline from "./components/IncidentTimeLine";
import SiteMap from "./components/SiteMap";
import DroneSimulation from "./components/DroneSimulation";
import ReviewPanel from "./components/ReviewPanel";
import AuditLogPanel from "./components/AuditLog";

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/investigate")
      .then((res) => res.json())
      .then((data) => {
        setData(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Dashboard>
      {loading ? (
        <p className="text-center">
          AI is investigating overnight events...
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ✅ Pass incidents from backend */}
          <IncidentTimeline incidents={data?.incidents} onSelect={setSelectedIncident} />

          {/* (Optional later) pass incidents to map */}
          <SiteMap incidents={data?.incidents} aiData={data}  selectedIncident={selectedIncident} />

          <DroneSimulation aiData={data} onLog={(msg) => setLogs((prev) => [...prev, msg])}/>

          <AuditLogPanel logs={logs} />

          {/* ✅ Pass AI result */}
          <ReviewPanel aiData={data} />

        </div>
      )}
    </Dashboard>
  );
}

export default App;