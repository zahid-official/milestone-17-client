import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import type { PaymentMethod, RideStatus, Timestamp } from "@/types";

import { format } from "date-fns";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Link } from "react-router";

// Interfaces for IRideOversightTable, Meta & IProps
interface IRideOversightTable {
  timestamps: Timestamp;
  paymentMethod: PaymentMethod;

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
    data: IRideOversightTable[];
    meta: IMeta;
  };
  onPageChange: (page: number) => void;
  currentPage: number;
  onSortOrderChange: () => void;
  currentSortOrder: "asc" | "desc";
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

// RideOversightTable Component
const RideOversightTable = ({
  data,
  onPageChange,
  currentPage,
  onSortOrderChange,
  currentSortOrder,
  searchTerm,
  onSearchChange,
}: IProps) => {
  // RTK Query mutation hook

  // separate datas
  const managementData = data?.data;
  const paginationData = data?.meta;

  console.log(managementData);

  // Columns title
  const columnsTitle = [
    { label: "No.", value: "index" },
    { label: "Rider", value: "rider" },
    { label: "Driver", value: "driver" },
    { label: "Pickup", value: "pickup" },
    { label: "Destination", value: "destination" },
    { label: "Distance", value: "distance" },
    { label: "Fare", value: "fare" },
    { label: "Status", value: "status" },
    { label: "Date", value: "date" },
    { label: "Actions", value: "actions" },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mt-10 pb-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-foreground">
              Ride Oversight
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitor and manage every ride across the platform in real time
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
                placeholder="Search name, email"
                className="pl-8 w-xs"
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
            {managementData?.map(
              (management: IRideOversightTable, index: number) => (
                <TableRow
                  key={management?._id}
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
                      {management?.userId?.name}
                    </div>
                  </TableCell>

                  {/* Driver */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {management?.driverInfo?.userId?.name || "Not assigned"}
                    </div>
                  </TableCell>

                  {/* Pickup */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {management?.pickup}
                    </div>
                  </TableCell>

                  {/* Destination */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {management?.destination}
                    </div>
                  </TableCell>

                  {/* Distance */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {management?.distance} km
                    </div>
                  </TableCell>

                  {/* Fare */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      ৳ {management?.fare}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      <Badge
                        className={`${
                          (management?.status === rideStatus.CANCELLED ||
                            management?.status === rideStatus.REJECTED) &&
                          "bg-muted-foreground/60 text-primary-foreground"
                        }`}
                      >
                        {management?.status}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {format(new Date(management?.createdAt), "dd-MM-yyyy")}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="py-3">
                    <Link to={`/user/ride/${management?._id}`}>
                      <Button size="sm">Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
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

export default RideOversightTable;
