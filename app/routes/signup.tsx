import { Form, Link, useNavigation } from "react-router";
import type { Route } from "./+types/signup";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { serverClient } from "~/lib/supabase";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - React Router App" },
    { name: "description", content: "Create a new account" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = serverClient({ request });
  const { data, error } = await supabase.client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:5173/dashboard/",
    },
  });
  return { data, error };
}

export default function SignUp({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form method="post">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                  {actionData?.error && (
                    <p className="text-sm font-medium text-destructive">
                      {actionData.error.message}
                    </p>
                  )}
                  {!actionData?.error && actionData?.data && (
                    <p className="text-sm text-muted-foreground">
                      Email sent to {actionData.data.user?.email}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign up with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
