import VehicleInfoForm from "@/components/modules/driver/vechleInfo/VehicleInfoForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import {
  Bike,
  Car,
  CheckCircle2,
  Edit2,
  IdCard,
  NotepadTextDashed,
  User,
} from "lucide-react";
import { useState } from "react";

// VehicleInfo Component
const VehicleInfo = () => {
  // State form react
  const [isEditing, setIsEditing] = useState(false);

  // RTK Query mutation hook
  const { data } = useProfileInfoQuery(undefined);
  const userInfo = data?.data;

  // Display data
  const display = [
    {
      icon: IdCard,
      label: "License Number",
      value: userInfo?.licenseNumber,
    },
    {
      icon: NotepadTextDashed,
      label: "Vehicle Plate Number",
      value: userInfo?.vehicleInfo?.plateNumber,
    },
    {
      icon: Car,
      label: "Vehicle Type",
      value: userInfo?.vehicleInfo?.vehicleType,
    },
    {
      icon: Bike,
      label: "Vehicle Model",
      value: userInfo?.vehicleInfo?.vehicleModel,
    },
  ];

  if (isEditing) {
    return (
      //
      <div className="w-full max-w-lg mx-auto transition-all ease-out duration-300 min-h-[80vh] place-content-center">
        <VehicleInfoForm
          userInfo={userInfo}
          handleCancel={() => {
            setIsEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto transition-all ease-out duration-300 min-h-[87vh] place-content-center">
      <Card className="border pb-11 pt-9 px-1 shadow-sm bg-card/70 backdrop-blur-sm ">
        {/* Card header */}
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-3xl font-bold">
                Vehicle Details
              </CardTitle>
              <CardDescription className="text-sm mt-0.5">
                Detailed information about the your vehicle
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="gap-1.5 h-8 transition-all ease-out duration-200 hover:bg-primary hover:text-white"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit Info
            </Button>
          </div>
        </CardHeader>

        {/* Card content */}
        <CardContent className="space-y-5 -mt-2">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar */}
            <Avatar className="h-14 w-14 rounded-xl">
              <AvatarFallback className="bg-muted rounded-xl flex items-center justify-center">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl">{userInfo?.name}</h2>
              </div>

              {/* Role */}
              <div className="space-x-2">
                <Badge className="gap-1 bg-primary text-xs px-2 py-1 rounded-md">
                  {userInfo?.role} <Bike />
                </Badge>
                {userInfo?.isVerified && (
                  <Badge
                    variant="secondary"
                    className="gap-1 text-xs px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2.5">
            {display.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 rounded-xl border bg-card/50 hover:bg-accent/40 transition-all ease-out duration-200"
              >
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-medium truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleInfo;
