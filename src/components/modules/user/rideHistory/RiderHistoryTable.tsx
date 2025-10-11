import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/ui/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import rideStatus from "@/constants/rideStatus";
import type { RideStatus } from "@/types";
import { Link } from "react-router";

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
    data: IRideHistory[];
    meta: IMeta;
  };
  onPageChange: (page: number) => void;
  currentPage: number;
}

// RiderHistoryTable Component
const RiderHistoryTable = ({ data, onPageChange, currentPage }: IProps) => {
  const historyData = data?.data;
  const paginationData = data?.meta;

  console.log(paginationData);

  // columnsTitle
  const columnsTitle = [
    { label: "No.", value: "index" },
    { label: "Rider", value: "rider" },
    { label: "Driver", value: "driver" },
    { label: "Pickup", value: "pickup" },
    { label: "Destination", value: "destination" },
    { label: "Distance", value: "distance" },
    { label: "Fare", value: "fare" },
    { label: "Status", value: "status" },
    { label: "Actions", value: "actions" },
  ];

  return (
    <div className="border max-w-7xl mx-auto p-4 rounded-2xl mt-12">
      <Table>
        {/* table header */}
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columnsTitle?.map((column, index) => (
              <TableHead
                key={column.value}
                className="text-foreground pb-5 transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform transform-gpu animate-in fade-in slide-in-from-top-2 origin-center"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "400ms",
                  animationFillMode: "both",
                }}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* table body */}
        <TableBody>
          {historyData?.map((history: IRideHistory, index: number) => (
            <tr
              key={history?._id}
              className="border-b hover:bg-muted/50 cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform transform-gpu animate-in fade-in slide-in-from-top-2 origin-center"
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
                  {history?.driverInfo?.userId?.name
                    ? history?.driverInfo?.userId?.name
                    : "Not assigned"}
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
                <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                  {history?.distance} km
                </div>
              </TableCell>

              {/* Fare */}
              <TableCell className="py-3">
                <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                  ৳ {history?.fare}
                </div>
              </TableCell>

              {/* Fare */}
              <TableCell className="py-3">
                <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                  <Badge
                    className={`${
                      (history.status === rideStatus.CANCELLED ||
                        history.status === rideStatus.REJECTED) &&
                      " bg-muted-foreground/60 text-primary-foreground"
                    }`}
                  >
                    {history.status}
                  </Badge>
                </div>
              </TableCell>

              {/* Action */}
              <TableCell className="py-3">
                <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                  <Link to={`/ride/${history?._id}`}>
                    <Button size={"sm"}>Details</Button>
                  </Link>
                </div>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>

      <div className="px-4 pt-5 flex items-center justify-between border-t">
        <CustomPagination
          currentPage={currentPage}
          totalPages={paginationData?.totalPage || 1}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default RiderHistoryTable;
