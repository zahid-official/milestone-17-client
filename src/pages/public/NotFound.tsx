import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="container px-5 py-24 mx-auto flex flex-col items-center">
        {/* Error Code and Message */}
        <div className="text-center mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-3">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Oops! The page you're looking for seems to have taken a wrong turn.
            Don't worry, let's get you back on track.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="min-w-[150px]"
          >
            Go Back
          </Button>
          <Link to="/">
            <Button className="min-w-[150px]">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
