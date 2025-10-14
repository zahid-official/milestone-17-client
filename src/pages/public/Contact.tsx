import { Link, useLocation } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import accountStatus from "@/constants/accountStatus";

const statusMap: Record<
  string,
  { title: string; summary: string; details: string; steps: string; action?: string }
> = {
  [accountStatus.BLOCKED]: {
    title: "Account blocked",
    summary: "Your account has been blocked.",
    details:
      "Your account has been blocked due to a violation of our terms. If you believe this is a mistake, please contact our support team and provide your registered email address.",
    steps:
      "Please email support with your registered email and a short explanation. Our team will review the case and get back to you.",
    action: "Contact support",
  },
  [accountStatus.SUSPENDED]: {
    title: "Account suspended",
    summary: "Your account is currently suspended.",
    details:
      "Your account is currently suspended while we review recent activity. Suspension may be temporary depending on the outcome of the review.",
    steps: "Contact support for details and guidance on next steps.",
    action: "Contact support",
  },
  [accountStatus.INACTIVE]: {
    title: "Account inactive",
    summary: "Your account is inactive.",
    details:
      "An inactive account usually indicates missing verification or incomplete onboarding steps. We can help you reactivate it.",
    steps: "Contact support to request reactivation and assistance with any missing steps.",
    action: "Contact support",
  },
};

const Contact = () => {
  const location = useLocation();

  // Accept status from location.state or ?status=<STATUS> query param
  let status: string | undefined = undefined;

  // location.state may be any type; coerce carefully
  const state = (location as unknown as { state?: unknown }).state;
  if (typeof state === "string") {
    status = state;
  }

  // read query param if not in state
  if (!status) {
    const search = (location as unknown as { search?: string }).search ?? "";
    const qp = new URLSearchParams(search);
    status = qp.get("status") ?? undefined;
  }

  const info = status ? statusMap[status] : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            {info ? info.title : "Contact support"}
          </CardTitle>
          <CardDescription className="text-sm mt-0.5">
            {info
              ? `We detected an account status of '${status}'. ${info.summary}`
              : "If you need help with your account or have general questions, reach out to our support team using the details below."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {info && (
              <div className="space-y-3">
                <div className="rounded-md bg-muted p-4 text-sm">
                  <strong className="block mb-1">Details</strong>
                  <p className="text-muted-foreground">{info.details}</p>
                </div>

                <div className="rounded-md bg-muted p-4 text-sm">
                  <strong className="block mb-1">What you can do</strong>
                  <p className="text-muted-foreground">{info.steps}</p>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-semibold">Support email</p>
                  <p className="text-sm text-muted-foreground">
                    support@velocia.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-semibold">Support phone</p>
                  <p className="text-sm text-muted-foreground">
                    (+880) 19960-66021
                  </p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                When contacting support, please include your registered email
                and a brief description of the issue. This helps us resolve
                requests faster.
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <a className="w-full" href="mailto:support@velocia.com">
              <Button className="w-full">
                {info?.action ?? "Contact support"}
              </Button>
            </a>

            <Link to="/" className="w-full">
              <Button className="w-full" variant="outline">
                Back to home
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Contact;
