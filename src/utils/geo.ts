/* eslint-disable @typescript-eslint/no-explicit-any */
import haversine from "haversine-distance";
import { toast } from "sonner";

// Fetch coordinates from OpenStreetMap Nominatim
export const getCoordinatesFromAddress = async (address: string) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1&addressdetails=1&countrycodes=bd`,
      {
        headers: {
          "User-Agent": "velocia/1.0 (zahidul.islam7788@gmail.com)",
        },
      }
    );

    if (!res?.ok) {
      throw new Error(
        `Failed to fetch coordinates: ${res?.status} ${res?.statusText}`
      );
    }

    const data = await res?.json();

    if (!data || data?.length === 0) {
      throw new Error("Location not found. Please recheck location or try another");
    }

    return {
      lat: parseFloat(data[0]?.lat),
      lon: parseFloat(data[0]?.lon),
    };
  } catch (error: any) {
    toast.error(error?.message || "Failed to fetch coordinates");
  }
};

// Calculate distance (in km)
export const calculateDistance = (
  pickup: { lat: number; lon: number },
  destination: { lat: number; lon: number }
) => {
  const distanceInMeters = haversine(pickup, destination);
  return (distanceInMeters / 1000).toFixed(2);
};

// Get address suggestions
export const searchAddressSuggestions = async (query: string) => {
  if (!query) return [];

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=12&addressdetails=1&countrycodes=bd`,
      {
        headers: {
          "User-Agent": "velocia/1.0 (zahidul.islam7788@gmail.com)",
        },
      }
    );

    if (!res?.ok) {
      throw new Error(
        `Failed to fetch address suggestions: ${res?.status} ${res?.statusText}`
      );
    }

    const data = await res?.json();

    return data?.map((item: any) => ({
      label: item?.display_name,
      lat: parseFloat(item?.lat),
      lon: parseFloat(item?.lon),
    }));
  } catch (error: any) {
    toast.error(error?.message || "Failed to fetch address suggestions");
    // Return empty list so callers can handle "no suggestions" gracefully
    return [];
  }
};
