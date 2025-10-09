import { useState } from "react";
import { calculateDistance } from "@/utils/geo";
import LocationInput from "./LocationInput";

export default function DistanceCalculator() {
  // States from react
  const [pickup, setPickup] = useState<{
    label: string;
    lat: number;
    lon: number;
  } | null>(null);
  const [dropoff, setDropoff] = useState<{
    label: string;
    lat: number;
    lon: number;
  } | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle distance calculate
  const handleCalculate = () => {
    if (!pickup || !dropoff) {
      setError("Please select both pickup and dropoff locations.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const dist = calculateDistance(pickup, dropoff);
      setDistance(dist);
    } catch (err) {
      setError("Could not calculate distance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-4">
      {/* Pickup */}
      <LocationInput
        label="Pickup location"
        onSelect={(loc) => setPickup(loc)}
      />

      {/* Dropoff */}
      <LocationInput
        label="Dropoff location"
        onSelect={(loc) => setDropoff(loc)}
      />

      {/* Distance & fare */}
      {distance && (
        <div className="text-white">
          ✅ Distance: <strong>{distance} km</strong>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200"
        disabled={loading}
      >
        {loading ? "Calculating..." : "See distance"}
      </button>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
