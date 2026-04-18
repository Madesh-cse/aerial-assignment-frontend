import { useEffect, useState } from "react";

type Props = {
  incidents: any[];
  aiData?: any;
  selectedIncident?: any;
  resolved: string[];
};

const SiteMap = ({ incidents, aiData, selectedIncident , resolved }: Props) => {
  const [dronePos, setDronePos] = useState({ top: 50, left: 50 });

  // 🧭 NORMALIZED MAP (0–100%)
  const locationMap: any = {
    "Gate 3": { top: 20, left: 20 },
    "Yard C": { top: 50, left: 55 },
    "Block C": { top: 75, left: 75 },
  };

  const isResolved = resolved.includes("Block C");

  // RISK LEVEL
  const getRiskLevel = (location: string) => {
    const count = incidents?.filter((i) =>
      i.location.toLowerCase().includes(location.toLowerCase()),
    ).length;

    if (count >= 2) return "HIGH";
    if (count === 1) return "MEDIUM";
    return "LOW";
  };

  //  AI AUTO MOVE
  useEffect(() => {
    if (!aiData?.summary) return;

    const summary = aiData.summary.toLowerCase();

    if (summary.includes("block")) setDronePos(locationMap["Block C"]);
    else if (summary.includes("yard")) setDronePos(locationMap["Yard C"]);
    else if (summary.includes("gate")) setDronePos(locationMap["Gate 3"]);
  }, [aiData]);

  //  USER OVERRIDE
  useEffect(() => {
    if (!selectedIncident) return;

    const loc = selectedIncident.location;
    if (locationMap[loc]) {
      setDronePos(locationMap[loc]);
    }
  }, [selectedIncident]);

  //  ZONE COMPONENT
  const Zone = ({
    name,
    top,
    left,
  }: {
    name: string;
    top: number;
    left: number;
  }) => {
    const risk = getRiskLevel(name);

    const riskColor =
      risk === "HIGH"
        ? "bg-red-500"
        : risk === "MEDIUM"
          ? "bg-yellow-400"
          : "bg-green-400";

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-md border"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-sm">{name}</span>

          <span className={`w-2 h-2 rounded-full ${riskColor}`} />
        </div>

        <p className="text-xs text-gray-500 mt-1">Risk: {risk}</p>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[420px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden border">
      {/* HEADER */}
      <div className="absolute top-3 left-4 right-4 flex justify-between items-center z-10">
        <h2 className="text-lg font-semibold">Security Site Map</h2>
        <span className="text-xs text-gray-500">Live Monitoring</span>
      </div>

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* ZONES */}
      <Zone name="Gate 3" top={20} left={20} />
      <Zone name="Yard C" top={50} left={55} />
      <Zone name="Block C" top={75} left={75} />

      {/* 🚁 DRONE */}
      <div
        className="absolute text-2xl transition-all duration-1000 ease-in-out drop-shadow-lg"
        style={{
          top: `${dronePos.top}%`,
          left: `${dronePos.left}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        🚁
      </div>

      {/* 🔵 DRONE PULSE */}
      <div
        className="absolute w-8 h-8 bg-blue-400 opacity-30 rounded-full animate-ping"
        style={{
          top: `${dronePos.top}%`,
          left: `${dronePos.left}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 🚨 ALERT */}
      {aiData?.alertType === "CRITICAL" && !isResolved &&(
        <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs animate-pulse">
          🚨 CRITICAL ZONE ACTIVE
        </div>
      )}
    </div>
  );
};

export default SiteMap;
