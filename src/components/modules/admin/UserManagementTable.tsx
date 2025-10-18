import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Confirmation from "@/components/ui/confirmation";
import CustomPagination from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import accountStatus from "@/constants/accountStatus";
import role from "@/constants/role";
import {
  useBlockUserMutation,
  useSuspendDriverMutation,
  useUnblockUserMutation,
  useUnsuspendDriverMutation,
} from "@/redux/features/admin/admin.api";
import { format } from "date-fns";
import { ChevronDown, ChevronDownIcon, ChevronUp, Search } from "lucide-react";

// Interfaces for IUserManagement, Meta & IProps
interface IUserManagement {
  _id: string;
  name: string;
  email: string;
  accountStatus: string;
  role: string;
  availability: string;
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
    data: IUserManagement[];
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
}

// Columns title
const columnsTitle = [
  { label: "No.", value: "index" },
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Role", value: "role" },
  { label: "Status", value: "status" },
  { label: "Date", value: "date" },
  { label: "Actions", value: "actions" },
];

// UserManagementTable Component
const UserManagementTable = ({
  data,
  onPageChange,
  currentPage,
  onStatusChange,
  currentStatus,
  onSortOrderChange,
  currentSortOrder,
  searchTerm,
  onSearchChange,
}: IProps) => {
  // RTK Query hooks
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [suspendDriver] = useSuspendDriverMutation();
  const [unsuspendDriver] = useUnsuspendDriverMutation();

  const userData = data?.data;
  const paginationData = data?.meta;

  console.log(userData);

  return (
    <>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mt-8 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-foreground">
              Manage Users
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and oversee platform users efficiently
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
                placeholder="Search name, email & role"
                className="pl-8 w-68"
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
                  {Object.values(accountStatus).map((status) => (
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
            {userData?.map((user: IUserManagement, index: number) => (
              <TableRow
                key={user?._id}
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
                    {user?.name}
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    {user?.email}
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    {user?.role}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="py-3  w-44">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    <Badge
                      variant={
                        user.accountStatus === accountStatus.BLOCKED ||
                        user.accountStatus === accountStatus.SUSPENDED
                          ? "destructive"
                          : "secondary"
                      }
                      className={`${
                        user.accountStatus === accountStatus.INACTIVE &&
                        "bg-muted-foreground/60 text-primary-foreground"
                      }`}
                    >
                      {user.accountStatus}
                    </Badge>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="py-3">
                  <div className="text-sm max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">
                    {format(new Date(user?.createdAt), "dd-MM-yyyy")}
                  </div>
                </TableCell>

                {/* Action */}
                <TableCell className="py-3 w-44">
                  {/* Block btn */}
                  {user.role === role.RIDER &&
                    user.accountStatus === accountStatus.ACTIVE && (
                      <Confirmation
                        mutationFn={() => blockUser(user?._id).unwrap()}
                        successMessage="Rider blocked successfully"
                      >
                        <Button
                          variant={"secondary"}
                          size="sm"
                          className="w-full max-w-24"
                        >
                          Block
                        </Button>
                      </Confirmation>
                    )}

                  {/* Unblock btn */}
                  {user.role === role.RIDER &&
                    user.accountStatus === accountStatus.BLOCKED && (
                      <Confirmation
                        mutationFn={() => unblockUser(user?._id).unwrap()}
                        successMessage="Rider unblocked  successfully"
                      >
                        <Button
                          variant={"default"}
                          size="sm"
                          className="w-full max-w-24"
                        >
                          Unblock
                        </Button>
                      </Confirmation>
                    )}

                  {/* Suspend btn */}
                  {user.role === role.DRIVER &&
                    user.accountStatus === accountStatus.ACTIVE && (
                      <Confirmation
                        mutationFn={() => suspendDriver(user?._id).unwrap()}
                        successMessage="Driver suspended successfully"
                      >
                        <Button
                          variant={"outline"}
                          size="sm"
                          className="w-full max-w-24"
                        >
                          Suspend
                        </Button>
                      </Confirmation>
                    )}

                  {/* Unblock btn */}
                  {user.role === role.DRIVER &&
                    user.accountStatus === accountStatus.SUSPENDED && (
                      <Confirmation
                        mutationFn={() => unsuspendDriver(user?._id).unwrap()}
                        successMessage="Driver unsuspended  successfully"
                      >
                        <Button
                          variant={"default"}
                          size="sm"
                          className="w-full max-w-24"
                        >
                          Unsuspend
                        </Button>
                      </Confirmation>
                    )}
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

export default UserManagementTable;
