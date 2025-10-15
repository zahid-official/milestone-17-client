import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/ui/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronUp, ChevronDown, Search } from "lucide-react";
import rideStatus from "@/constants/rideStatus";
import type { RideStatus } from "@/types";
import { Link } from "react-router";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

// Interfaces for IRideHistory, Meta & IProps
interface IRideHistory {
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
  driverInfo?: null | {
    name: string;
    email: string;
    accountStatus: string;
    role: string;
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
    data: IRideHistory[];
    meta: IMeta;
  };
  onPageChange: (page: number) => void;
  currentPage: number;
  onStatusChange: (status: string | undefined) => void;
  currentStatus: string | undefined;
  onSortOrderChange: () => void;
  currentSortOrder: "asc" | "desc";
  searchTerm: string;
  onSearchChange: (value: string) => void;

  // props for min max date filter
  minFare?: number | undefined;
  maxFare?: number | undefined;
  onMinFareChange: (value: string) => void;
  onMaxFareChange: (value: string) => void;
  dateRange?: "today" | "week" | "month" | "year" | undefined;
  onDateRangeChange: (
    dateRange: "today" | "week" | "month" | "year" | undefined
  ) => void;
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

// Date range options
const dateRangeOptions: Array<{
  label: string;
  value: "today" | "week" | "month" | "year" | undefined;
}> = [
  { label: "All Time", value: undefined },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

// RiderHistoryTable Component
const RiderHistoryTable = ({
  data,
  onPageChange,
  currentPage,
  onStatusChange,
  currentStatus,
  onSortOrderChange,
  currentSortOrder,
  searchTerm,
  onSearchChange,

  minFare,
  maxFare,
  onMinFareChange,
  onMaxFareChange,
  dateRange,
  onDateRangeChange,
}: IProps) => {
  const historyData = data?.data;
  const paginationData = data?.meta;

  return (
    <>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mt-8 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-foreground">
              Ride Histories
            </h1>
            <p className="text-sm text-muted-foreground">
              Browse your ride history with filtering and search options
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

            {/* Filter by min-max*/}
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min Fare"
                value={minFare !== undefined ? minFare : ""}
                onChange={(e) => onMinFareChange(e.target.value)}
                min={0}
                className="w-24"
              />
              <Input
                type="number"
                placeholder="Max Fare"
                value={maxFare !== undefined ? maxFare : ""}
                onChange={(e) => onMaxFareChange(e.target.value)}
                min={0}
                className="w-24"
              />
            </div>

            {/* Dropdown Filter by status */}
            <div className="w-36">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                  <Button variant="outline">
                    {currentStatus ? currentStatus : "All Status"}
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onStatusChange(undefined)}>
                    All Status
                  </DropdownMenuItem>
                  {Object.values(rideStatus).map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => onStatusChange(status)}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Dropdown Filter by date range */}
            <div className="w-40">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                  <Button variant="outline">
                    {dateRange
                      ? dateRangeOptions.find((opt) => opt.value === dateRange)
                          ?.label
                      : "All Time"}
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dateRangeOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.label}
                      onClick={() => onDateRangeChange(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
            {historyData?.map((history: IRideHistory, index: number) => (
              <TableRow
                key={history?._id}
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
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    {history?.userId?.name}
                  </div>
                </TableCell>

                {/* Driver */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    {history?.driverInfo?.name || "Not assigned"}
                  </div>
                </TableCell>

                {/* Pickup */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    {history?.pickup}
                  </div>
                </TableCell>

                {/* Destination */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    {history?.destination}
                  </div>
                </TableCell>

                {/* Distance */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    {history?.distance} km
                  </div>
                </TableCell>

                {/* Vehicle */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    {history?.vehicleType}
                  </div>
                </TableCell>

                {/* Fare */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    ৳ {history?.fare}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    <Badge
                      className={`${
                        (history.status === rideStatus.CANCELLED ||
                          history.status === rideStatus.REJECTED) &&
                        "bg-muted-foreground/60 text-primary-foreground"
                      }`}
                    >
                      {history.status}
                    </Badge>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis text-center">
                    {format(new Date(history?.createdAt), "dd-MM-yyyy")}
                  </div>
                </TableCell>

                {/* Action */}
                <TableCell className="py-3">
                  <Link
                    to={`/user/ride/${history?._id}`}
                    className=" text-center"
                  >
                    <Button size="sm">Details</Button>
                  </Link>
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

export default RiderHistoryTable;
