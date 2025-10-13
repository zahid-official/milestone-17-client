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
import {
  useApproveDriverMutation,
  useRejectDriverMutation,
} from "@/redux/features/admin/admin.api";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

// Interfaces for IDriverApplications, IMeta & IProps
interface IDriverApplications {
  _id: string;
  userId: {
    _id: string;
    name: string;
    role: string;
  };
  applicationStatus: string;
  licenseNumber: string;
  vehicleInfo: {
    vehicleType: string;
    vehicleModel: string;
    plateNumber: string;
  };
  createdAt: string;
}

interface IMeta {
  page: number;
  limit: number;
  totalPage: number;
  totalDocs: number;
}

interface IProps {
  data: {
    data: IDriverApplications[];
    meta: IMeta;
  };
  onPageChange: (page: number) => void;
  currentPage: number;
  onSortOrderChange: () => void;
  currentSortOrder: "asc" | "desc";
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

// DriverApplicationsTable Component
const DriverApplicationsTable = ({
  data,
  onPageChange,
  currentPage,
  onSortOrderChange,
  currentSortOrder,
  searchTerm,
  onSearchChange,
}: IProps) => {
  // RTK Query mutation hook
  const [approveDriver] = useApproveDriverMutation();
  const [rejectDriver] = useRejectDriverMutation();

  // separate datas
  const applicationData = data?.data;
  const paginationData = data?.meta;

  // Columns title
  const columnsTitle = [
    { label: "No.", value: "index" },
    { label: "Name", value: "name" },
    { label: "Role", value: "role" },
    { label: "License Number", value: "licenseNumber" },
    { label: "Vehicle Type", value: "vehicleType" },
    { label: "Vehicle Model", value: "vehicleModel" },
    { label: "Plate Number", value: "plateNumber" },
    { label: "Application Status", value: "applicationStatus" },
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
              Driver Applications
            </h1>
            <p className="text-sm text-muted-foreground">
              Review driver applications, approve or reject requests based on
              eligibility
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
                placeholder="Search license, vehicle type, model, plate"
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
            {applicationData?.map(
              (application: IDriverApplications, index: number) => (
                <TableRow
                  key={application?._id}
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

                  {/* Name */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {application?.userId?.name}
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {application?.userId?.role}
                    </div>
                  </TableCell>

                  {/* License Number */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {application?.licenseNumber}
                    </div>
                  </TableCell>

                  {/* Vehicle Type */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {application?.vehicleInfo?.vehicleType}
                    </div>
                  </TableCell>

                  {/* Vehicle Model */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {application?.vehicleInfo?.vehicleModel}
                    </div>
                  </TableCell>

                  {/* Plate Number */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {application?.vehicleInfo?.plateNumber}
                    </div>
                  </TableCell>

                  {/* Application Status */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      <Badge>{application?.applicationStatus}</Badge>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="py-3">
                    <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                      {format(new Date(application?.createdAt), "dd-MM-yyyy")}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="py-3 flex gap-2">
                    {/* Approve btn */}
                    <Confirmation
                      mutationFn={() =>
                        approveDriver(application?._id).unwrap()
                      }
                      successMessage="Driver application approved successfully"
                    >
                      <Button size="sm">Approve</Button>
                    </Confirmation>

                    {/* Reject btn */}
                    <Confirmation
                      mutationFn={() => rejectDriver(application?._id).unwrap()}
                      successMessage="Driver application approved successfully"
                    >
                      <Button size="sm" variant={"destructive"}>Reject</Button>
                    </Confirmation>
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

export default DriverApplicationsTable;
