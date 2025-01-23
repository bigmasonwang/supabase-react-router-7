import type { Route } from "./+types/home";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-2xl w-full">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="text-center space-y-6">
            <div className="space-y-2">
              <CardTitle className="text-4xl font-bold tracking-tight">
                React Router + Supabase Demo
              </CardTitle>
              <CardDescription className="text-lg">
                A modern authentication demo using React Router and Supabase
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="/login">Sign In</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href="/signup">Create Account</a>
              </Button>
            </div>
            <footer className="mt-8 text-sm text-center text-muted-foreground">
              Built with React Router and Supabase
            </footer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
