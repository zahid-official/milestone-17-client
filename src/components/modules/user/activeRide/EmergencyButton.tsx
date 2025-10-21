import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import { Navigation, Phone, ShieldUser, Users } from "lucide-react";
import { toast } from "sonner";

//  Format phone number to WhatsApp-compatible format
const formatPhoneNumber = (rawNumber: string): string => {
  if (!rawNumber) return "";
  let cleaned = rawNumber.trim().replace(/[\s\-()]/g, ""); // remove symbols

  // Remove '+' if present
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1); // +880... → 880...
  }

  // If starts with "880", it's already correct
  if (cleaned.startsWith("880")) {
    return cleaned;
  }

  // If starts with "0", replace with "880"
  if (cleaned.startsWith("0")) {
    return "880" + cleaned.slice(1);
  }

  // If starts with anything else (e.g. "1"), assume it's missing 880
  return "880" + cleaned;
};

// EmergencyButton Component
const EmergencyButton = () => {
  const { data } = useProfileInfoQuery(undefined);
  const userInfo = data?.data;

  // Handle call police
  const callPolice = () => {
    window.location.href = "tel:999";
  };

  // Handle notify contact
  const notifyContact = () => {
    const contacts: string[] = [];

    if (userInfo?.emergencyContact) contacts.push(userInfo.emergencyContact);
    if (userInfo?.emergencyContact2) contacts.push(userInfo.emergencyContact2);
    if (contacts.length === 0) {
      toast.error("No emergency contacts found.");
      return;
    }

    const message = encodeURIComponent(
      `Emergency Alert!\nThis is ${userInfo?.name}. I might be in danger. Please check on me immediately.`
    );

    contacts.forEach((number) => {
      const formattedNumber = formatPhoneNumber(number);
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
  };

  // Handle share location
  const shareLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation is not supported by your browser.");
    }

    toast.loading("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        toast.dismiss();
        const { latitude, longitude } = position.coords;
        const contacts: string[] = [];

        if (userInfo?.emergencyContact)
          contacts.push(userInfo.emergencyContact);
        if (userInfo?.emergencyContact2)
          contacts.push(userInfo.emergencyContact2);
        if (contacts.length === 0) {
          return toast.error("No emergency contacts found.");
        }

        const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        const message = encodeURIComponent(
          `🚨 Emergency Location Alert!\n\n${userInfo?.name} has shared their current location:\n${mapLink}`
        );

        contacts.forEach((number) => {
          const formattedNumber = formatPhoneNumber(number);
          const whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        });
        toast.success("Live location sent to emergency contacts.");
      },
      (error) => {
        toast.dismiss();
        if (error.code === 1) {
          toast.error(
            "Location permission denied. Please enable location access from your browser settings."
          );
        } else {
          toast.error("Failed to get location: " + error.message);
        }
      }
    );
  };

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <button className="border p-3 rounded-full bg-red-700 cursor-pointer">
              <Phone />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            {/* Header */}
            <DialogHeader>
              <DialogTitle className="text-2xl">Emergency Contact</DialogTitle>
              <DialogDescription>
                Choose an action to take in case of emergency
              </DialogDescription>
            </DialogHeader>

            {/* Content */}
            <div className="grid gap-4 pt-4">
              {/* Call Police */}
              <Button onClick={callPolice} variant={"outline"}>
                <ShieldUser /> <span className="-ml-1">Call Police</span>
              </Button>

              {/* Notify Emergency Contact */}
              <Button onClick={notifyContact} variant={"secondary"}>
                <Users />
                <span className="-ml-0.5">Notify Emergency Contact</span>
              </Button>

              {/* Share Live Location */}
              <Button onClick={shareLocation} variant={"outline"}>
                <Navigation />
                <span className="-ml-0.5">Share Live Location</span>
              </Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default EmergencyButton;
