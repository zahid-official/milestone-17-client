/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Confirmation from "@/components/ui/confirmation";
import CustomPagination from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import rideStatus from "@/constants/rideStatus";
import {
  useAcceptRideMutation,
  useRejectRideMutation,
} from "@/redux/features/driver/driver.api";
import type { RideStatus } from "@/types";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Interfaces for IRideRequest, Meta & IProps
interface IRideRequest {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  pickup: string;
  destination: string;
  fare: number;
  distance: number;
  status: RideStatus;
  vehicleType: "BIKE" | "CAR";
  createdAt: string;
  driverInfo: null | {
    _id: string;
    userId: {
      _id: string;
      name: string;
    };
    licenseNumber: string;
    vehicleInfo: {
      vehicleType: string;
      vehicleModel: string;
      plateNumber: string;
    };
  };
}

interface IMeta {
  page: number;
  limit: number;
  totalPage: number;
  totalDocs: number;
}

interface IProps {
  data: {
    data: IRideRequest[];
    meta: IMeta;
  };
  onPageChange: (page: number) => void;
  currentPage: number;
  onSortOrderChange: () => void;
  currentSortOrder: "asc" | "desc";
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isAvailable?: boolean;
}

// Columns title
const columnsTitle = [
  { label: "No.", value: "index" },
  { label: "Rider", value: "rider" },
  { label: "Driver", value: "driver" },
  { label: "Pickup", value: "pickup" },
  { label: "Destination", value: "destination" },
  { label: "Distance", value: "distance" },
  { label: "Vehicle", value: "vehicle" },
  { label: "Fare", value: "fare" },
  { label: "Status", value: "status" },
  { label: "Date", value: "date" },
  { label: "Actions", value: "actions" },
];

// IncomingRequestsTable Component
const IncomingRequestsTable = ({
  data,
  onPageChange,
  currentPage,
  onSortOrderChange,
  currentSortOrder,
  searchTerm,
  onSearchChange,
  isAvailable = true,
}: IProps) => {
  // RTK Query mutation hook
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();

  // Navigation hook
  const navigate = useNavigate();

  // separate datas
  const requestData = data?.data;
  const paginationData = data?.meta;

  // handle accept ride request
  const handleAccept = async (id: string) => {
    try {
      const result = await acceptRide(id).unwrap();
      console.log(result);
      navigate(`/driver/current-ride`);
      if (result.success) {
        toast.success(result.message || "Ride accepted successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mt-8 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-foreground">
              Incoming Requests
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and respond to incoming ride requests in real-time
            </p>
          </div>

          <div className="flex sm:flex-row flex-col gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search pickup, destination & vehicle type"
                className="pl-8 w-68"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="border max-w-7xl mx-auto p-4 rounded-2xl">
        <Table>
          {/* table header */}
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columnsTitle.map((column, index) => {
                if (column.value === "date") {
                  // Date column with sort toggle
                  return (
                    <TableHead
                      key={column.value}
                      className="text-foreground pb-5 cursor-pointer select-none flex items-center"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationDuration: "400ms",
                        animationFillMode: "both",
                      }}
                      onClick={onSortOrderChange}
                    >
                      <span>{column.label}</span>
                      <span className="ml-1">
                        {currentSortOrder === "asc" && (
                          <ChevronUp className="w-4 h-4" />
                        )}
                        {currentSortOrder === "desc" && (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </TableHead>
                  );
                }

                return (
                  <TableHead
                    key={column.value}
                    className="text-foreground pb-5"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationDuration: "400ms",
                      animationFillMode: "both",
                    }}
                  >
                    {column.label}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          {/* table body */}
          <TableBody>
            {requestData?.map((request: IRideRequest, index: number) => (
              <TableRow
                key={request?._id}
                className="border-b hover:bg-muted/50 cursor-pointer"
                style={{
                  animationDelay: `${index * 120}ms`,
                  animationDuration: "400ms",
                  animationFillMode: "both",
                }}
              >
                {/* No */}
                <TableCell className="pl-3">
                  <div className="text-sm">{index + 1}</div>
                </TableCell>

                {/* Rider */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis">
                    {request?.userId?.name}
                  </div>
                </TableCell>

                {/* Driver */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis">
                    {request?.driverInfo?.userId?.name || "Not assigned"}
                  </div>
                </TableCell>

                {/* Pickup */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis">
                    {request?.pickup}
                  </div>
                </TableCell>

                {/* Destination */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis">
                    {request?.destination}
                  </div>
                </TableCell>

                {/* Distance */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    {request?.distance} km
                  </div>
                </TableCell>

                {/* Vehicle */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    {request?.vehicleType}
                  </div>
                </TableCell>

                {/* Fare */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    ৳ {request?.fare}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    <Badge
                      className={`${
                        (request.status === rideStatus.CANCELLED ||
                          request.status === rideStatus.REJECTED) &&
                        "bg-muted-foreground/60 text-primary-foreground"
                      }`}
                    >
                      {request.status}
                    </Badge>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-52 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    {format(new Date(request?.createdAt), "dd-MM-yyyy")}
                  </div>
                </TableCell>

                {/* Action */}
                <TableCell className="py-3 flex gap-2">
                  {/* Ride Accept btn - hidden when driver is offline */}
                  {isAvailable && (
                    <Button
                      size="sm"
                      onClick={() => handleAccept(request?._id)}
                    >
                      Accept
                    </Button>
                  )}

                  {/* Ride Reject btn */}
                  <Confirmation
                    mutationFn={() => rejectRide(request?._id).unwrap()}
                    successMessage="Ride rejected successfully"
                  >
                    <Button size="sm" variant={"destructive"}>
                      Reject
                    </Button>
                  </Confirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="px-4 pt-5 flex items-center justify-between border-t">
          <CustomPagination
            currentPage={currentPage}
            totalPages={paginationData?.totalPage || 1}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default IncomingRequestsTable;
