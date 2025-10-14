import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="flex items-center justify-center">
                        <div className="rounded-full bg-destructive/10 p-3">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl mt-4">Unexpected Application Error!</CardTitle>
                    <CardDescription className="text-sm mt-0.5">
                        Something went wrong while loading the application. Try refreshing
                        the page or contact support if the problem persists.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="text-sm text-muted-foreground">
                        If you recently performed an action, it might not have completed.
                        You can try again or reach out to support with details about what
                        happened.
                    </div>
                </CardContent>

                <CardFooter>
                    <div className="w-full flex flex-col sm:flex-row gap-2">
                        <Button className="flex-1" onClick={() => navigate(0)}>Refresh</Button>

                        <Link to="/" className="flex-1">
                            <Button className="w-full" variant="outline">Back to home</Button>
                        </Link>

                        <a className="flex-1" href="mailto:support@velocia.com">
                            <Button className="w-full" variant="outline">Contact support</Button>
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Error;