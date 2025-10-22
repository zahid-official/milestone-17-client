import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Lock as LockIcon } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-muted p-3">
              <LockIcon className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl mt-4">Access denied</CardTitle>
          <CardDescription className="text-sm mt-0.5">
            You don't have permission to view this page. If you believe this is
            an error, contact support or return to the home page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="text-sm text-muted-foreground">
            This area is restricted. Reach out to the administrator if you need
            access.
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <Link to="/" className="w-full">
              <Button className="w-full">Back to home</Button>
            </Link>

            <a href="mailto:support@velocia.com" className="w-full">
              <Button className="w-full" variant="outline">
                Contact support
              </Button>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;
