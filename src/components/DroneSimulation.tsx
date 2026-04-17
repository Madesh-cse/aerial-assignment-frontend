import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  aiData?: any;
  onLog?: (log: string) => void;
};

const DroneSimulation = ({ aiData, onLog }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertLocation, setAlertLocation] = useState<string | null>(null);

  const [acknowledged, setAcknowledged] = useState(false);
  const [tracking, setTracking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const locations = ["Gate 3", "Yard C", "Block C"];
  const positions = ["10%", "45%", "80%"];

  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  // 🔊 INIT AUDIO
  useEffect(() => {
    const audio = new Audio("/alert.mp3");
    audio.preload = "auto";
    audio.loop = true;

    audioRef.current = audio;

    const unlock = async () => {
      try {
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
      } catch {}
    };

    window.addEventListener("click", unlock, { once: true });

    return () => window.removeEventListener("click", unlock);
  }, []);

  // 🚨 DETECT ALERT
  useEffect(() => {
    if (!aiData?.summary) return;

    const summary = aiData.summary.toLowerCase();

    let detected: string | null = null;

    if (summary.includes("block")) detected = "Block C";
    else if (summary.includes("yard")) detected = "Yard C";
    else if (summary.includes("gate")) detected = "Gate 3";

    if (detected) {
      setAlertLocation(detected);
      setAcknowledged(false);
      setTracking(false);

      onLog?.(`🚨 ALERT DETECTED at ${detected}`);
    }
  }, [aiData]);

  // 🔁 DRONE LOOP (FIXED - NEVER BREAKS)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % locations.length;
        return next;
      });
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 📍 MOVEMENT LOGGER (WORKS ALWAYS WHEN TRACKING ON)
  useEffect(() => {
    if (!tracking) return;

    const log = `🚁 Drone moved to ${locations[currentIndex]} at ${getTime()}`;
    onLog?.(log);
  }, [currentIndex, tracking]);

  // 🚨 ALERT TRIGGER SOUND
  useEffect(() => {
    if (!alertLocation) return;

    if (locations[currentIndex] === alertLocation && !acknowledged) {
      audioRef.current?.play().catch(() => {});
      onLog?.(`🚨 DRONE REACHED ALERT LOCATION: ${alertLocation}`);
    }
  }, [currentIndex, alertLocation, acknowledged]);

  // ✅ ACKNOWLEDGE
  const handleAcknowledge = () => {
    setAcknowledged(true);

    // 🔥 remove alert immediately
    setAlertLocation(null);

    // 🔥 start tracking mode
    setTracking(true);

    audioRef.current?.pause();

    onLog?.(
      `✅ ALERT ACKNOWLEDGED at ${locations[currentIndex]} (${getTime()})`
    );
  };

  // 🔇 MUTE
  const handleMute = () => {
    audioRef.current?.pause();
    onLog?.("🔇 ALARM MUTED");
  };

  // 🎯 OVERRIDE
  const handleOverride = () => {
    setTracking(true);
    setAcknowledged(false);

    onLog?.("🎯 OVERRIDE ACTIVATED - FULL TRACKING RESUMED");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 h-52 relative overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">
        Drone Patrol Control Room
      </h2>

      {/* LOCATIONS */}
      <div className="flex justify-between px-6">
        {locations.map((loc) => (
          <div key={loc} className="text-center">
            <div
              className={`w-4 h-4 rounded-full mx-auto ${
                alertLocation === loc
                  ? "bg-red-500 animate-pulse"
                  : "bg-blue-500"
              }`}
            />
            <p className="text-xs">{loc}</p>
          </div>
        ))}
      </div>

      {/* DRONE */}
      <motion.div
        animate={{ left: positions[currentIndex] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-6 h-6 bg-black rounded-full absolute top-[55%]"
      />

      {/* ALERT UI */}
      {alertLocation && (
        <p className="absolute bottom-2 left-2 text-xs text-red-600 font-semibold">
          🚨 Alert at {alertLocation}
        </p>
      )}

      {/* CONTROLS */}
      {alertLocation && (
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={handleMute}
            className="px-2 py-1 text-xs bg-gray-200 rounded"
          >
            🔇 Mute
          </button>

          <button
            onClick={handleAcknowledge}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded"
          >
            ✅ Ack
          </button>

          <button
            onClick={handleOverride}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
          >
            🎯 Override
          </button>
        </div>
      )}
    </div>
  );
};

export default DroneSimulation;