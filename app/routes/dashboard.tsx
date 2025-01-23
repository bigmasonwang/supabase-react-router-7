import { Form, redirect } from "react-router";
import type { Route } from "./+types/dashboard";
import { serverClient } from "~/lib/supabase";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - React Router App" },
    { name: "description", content: "Your personal dashboard" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const supabase = serverClient({ request });
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return user;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  console.log("user: ", loaderData);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Form method="post" action="/auth/logout">
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </Form>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a protected page. You need to be logged in to view this
              content.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
