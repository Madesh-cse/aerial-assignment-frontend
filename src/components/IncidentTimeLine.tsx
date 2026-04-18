import { useState } from "react";

type Props = {
  incidents: any[];
  onSelect: (incident: any) => void;
};

const getTypeStyle = (type: string) => {
  const t = type.toLowerCase();

  if (t.includes("unauthorized")) return "border-red-500 bg-red-50";
  if (t.includes("vehicle")) return "border-blue-500 bg-blue-50";
  if (t.includes("badge")) return "border-green-500 bg-green-50";

  return "border-gray-300 bg-gray-50";
};

const IncidentTimeline = ({ incidents, onSelect }: Props) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleSelect = (incident: any) => {
    setActiveId(incident.id);
    onSelect(incident);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Incident Timeline
      </h2>

      <div className="space-y-3">
        {incidents?.map((incident) => {
          const isActive = activeId === incident.id;

          return (
            <div
              key={incident.id}
              onClick={() => handleSelect(incident)}
              className={`border-l-4 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:translate-x-1 ${
                isActive
                  ? "ring-2 ring-black shadow-md"
                  : ""
              } ${getTypeStyle(incident.type)}`}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">
                  {incident.type}
                </p>

                {isActive && (
                  <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              {/* LOCATION */}
              <p className="text-sm text-gray-700 mt-1">
                📍 {incident.location}
              </p>

              {/* TIME */}
              <p className="text-xs text-gray-500 mt-1">
                ⏱ {incident.time}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncidentTimeline;