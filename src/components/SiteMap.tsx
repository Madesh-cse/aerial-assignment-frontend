import { useEffect, useState } from "react";

type Props = {
  incidents: any[];
  aiData?: any;
  selectedIncident?: any;
};

const SiteMap = ({ incidents, aiData, selectedIncident }: Props) => {
  const [dronePos, setDronePos] = useState({ top: 50, left: 50 });

  const locationMap: any = {
    "Gate 3": { top: 80, left: 120 },
    "Yard C": { top: 180, left: 300 },
    "Block C": { top: 300, left: 500 },
  };

  // 🚨 RISK DETECTION (from incidents)
  const getRiskLevel = (location: string) => {
    const count = incidents?.filter((i) =>
      i.location.toLowerCase().includes(location.toLowerCase())
    ).length;

    if (count >= 2) return "HIGH";
    if (count === 1) return "MEDIUM";
    return "LOW";
  };

  // 🎯 AI AUTO MOVE
  useEffect(() => {
    if (!aiData?.summary) return;

    const summary = aiData.summary.toLowerCase();

    if (summary.includes("block")) setDronePos(locationMap["Block C"]);
    else if (summary.includes("yard")) setDronePos(locationMap["Yard C"]);
    else if (summary.includes("gate")) setDronePos(locationMap["Gate 3"]);
  }, [aiData]);

  // 👆 USER CLICK OVERRIDE
  useEffect(() => {
    if (!selectedIncident) return;

    const loc = selectedIncident.location;

    if (locationMap[loc]) {
      setDronePos(locationMap[loc]);
    }
  }, [selectedIncident]);

  const ZoneCard = ({
    label,
    color,
  }: {
    label: string;
    color: string;
  }) => {
    const risk = getRiskLevel(label);

    const riskColor =
      risk === "HIGH"
        ? "bg-red-500"
        : risk === "MEDIUM"
        ? "bg-yellow-400"
        : "bg-green-400";

    return (
      <div
        className={`absolute p-3 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 ${color}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold">{label}</span>

          <span
            className={`w-2 h-2 rounded-full animate-pulse ${riskColor}`}
          />
        </div>

        <p className="text-xs text-gray-600 mt-1">
          Risk: {risk}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-4 h-[420px] relative overflow-hidden border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Security Site Map</h2>

        <span className="text-xs text-gray-500">
          Live Monitoring
        </span>
      </div>

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* ZONES */}
      <div style={{ top: 80, left: 120 }}>
        <div
          className={`absolute p-3 rounded-xl border ${
            getRiskLevel("Gate 3") === "HIGH"
              ? "bg-red-100 border-red-500"
              : "bg-white"
          }`}
        >
          Gate 3
        </div>
      </div>

      <div
        className="absolute p-3 rounded-xl border bg-white"
        style={{ top: 180, left: 300 }}
      >
        Yard C
      </div>

      <div
        className="absolute p-3 rounded-xl border bg-white"
        style={{ top: 300, left: 500 }}
      >
        Block C
      </div>

      {/* DRONE (SMOOTH PREMIUM ANIMATION) */}
      <div
        className="absolute text-2xl transition-all duration-1000 ease-in-out drop-shadow-lg"
        style={{
          top: dronePos.top,
          left: dronePos.left,
        }}
      >
        🚁
      </div>

      {/* DRONE RADIUS GLOW */}
      <div
        className="absolute w-10 h-10 rounded-full bg-blue-400 opacity-30 animate-ping"
        style={{
          top: dronePos.top - 10,
          left: dronePos.left - 10,
        }}
      />

      {/* ALERT OVERLAY */}
      {aiData?.alertType === "CRITICAL" && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs animate-pulse">
          🚨 CRITICAL ZONE ACTIVE
        </div>
      )}
    </div>
  );
};

export default SiteMap;