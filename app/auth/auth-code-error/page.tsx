import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground">
          There was an error during authentication. Please try again.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
