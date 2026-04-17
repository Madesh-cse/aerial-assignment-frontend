type Props = {
  incidents: any[];
  onSelect: (incident: any) => void;
};

const IncidentTimeline = ({ incidents, onSelect }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Incident Timeline</h2>

      <div className="space-y-3">
        {incidents?.map((incident) => (
          <div
            key={incident.id}
            onClick={() => onSelect(incident)}
            className="border-l-4 border-black pl-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <p className="font-semibold">{incident.type}</p>
            <p>{incident.location}</p>
            <p className="text-sm text-gray-500">{incident.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentTimeline;