import RiderHistoryTable from "@/components/modules/user/rideHistory/RiderHistoryTable";
import { useRideHistoryQuery } from "@/redux/features/user/user.api";
import { useState } from "react";

// RideHistory Component
const RideHistory = () => {
  // State from react
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const limit = 10;

  // RTK Query mutation hooks
  const { data, isLoading } = useRideHistoryQuery({ page, limit, status });

  // Handle pageChange
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle statusChange
  const handleStatusChange = (newStatus: string | undefined) => {
    setPage(1); // reset to first page
    setStatus(newStatus);
  };

  // Loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="w-8 h-8 border-5 border-black/30 border-t-black dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <RiderHistoryTable
        data={data}
        onPageChange={handlePageChange}
        currentPage={page}
        onStatusChange={handleStatusChange}
        currentStatus={status}
      />
    </div>
  );
};

export default RideHistory;
