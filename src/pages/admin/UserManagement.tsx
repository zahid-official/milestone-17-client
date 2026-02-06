import UserManagementTable from "@/components/modules/admin/UserManagementTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useManageUsersQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";

const TableSkeleton = () => (
  <div className="space-y-4 px-4 py-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-8 w-28" />
    </div>
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-lg" />
      ))}
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
);

// UserManagement Component
const UserManagement = () => {
  // State from react
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 10;

  // RTK Query mutation hooks
  const { data, isLoading } = useManageUsersQuery({
    page,
    limit,
    status,
    sort: sortOrder === "desc" ? "-createdAt" : "createdAt",
    searchTerm,
  });

  // Handle pageChange
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle statusChange
  const handleStatusChange = (newStatus: string | undefined) => {
    setPage(1);
    setStatus(newStatus);
  };

  // Handle sortOrderChange
  const handleSortOrderChange = () => {
    setPage(1);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle Search Change
  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchTerm(value);
  };

  // Handle minFare change

  // Loader
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <UserManagementTable
        data={data}
        onPageChange={handlePageChange}
        currentPage={page}
        onStatusChange={handleStatusChange}
        currentStatus={status}
        onSortOrderChange={handleSortOrderChange}
        currentSortOrder={sortOrder}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
};

export default UserManagement;
