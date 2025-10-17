/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import availability from "@/constants/availability";
import { useAvailableDriverMutation } from "@/redux/features/driver/driver.api";
import { toast } from "sonner";

// ToggleAvailability Component
const ToggleAvailability = () => {
  // RTK Query hook
  const { data } = useProfileInfoQuery(undefined);
  const [setAvailability] = useAvailableDriverMutation();
  const isAvailable = data?.data?.availability === availability.ONLINE;

  // State from react
  const [checked, setChecked] = useState<boolean>(isAvailable ?? false);
  const id = useId();

  // handleAvailability
  const handleAvailability = async (value: boolean) => {
    const availabilityStatus = value
      ? availability.ONLINE
      : availability.OFFLINE;

    try {
      const result = await setAvailability({
        availability: availabilityStatus,
      }).unwrap();
      console.log(result);
      toast.success(
        result.message || "Driver availability updated successfully"
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (data?.data?.availability) {
      setChecked(data.data.availability === availability.ONLINE);
    }
  }, [data]);

  return (
    <div className="inline-flex items-center gap-2 [--primary:var(--color-green-500)] [--ring:var(--color-green-300)] in-[.dark]:[--primary:var(--color-green-500)] in-[.dark]:[--ring:var(--color-green-900)]">
      <Label htmlFor={id} className="text-sm font-medium">
        {checked ? "Avilable" : "Not Available"}
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={(value) => {
          setChecked(value);
          handleAvailability(value);
        }}
        aria-label="Toggle switch"
        className="cursor-pointer"
      />
    </div>
  );
};

export default ToggleAvailability;
