import { Form, redirect } from "react-router";
import type { Route } from "./+types/dashboard";
import { serverClient } from "~/lib/supabase";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - React Router App" },
    { name: "description", content: "Your personal dashboard" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const supabase = serverClient({ request });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user || null;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  console.log("loaderData: ", loaderData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <Form method="post" action="/logout">
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign out
                </button>
              </Form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to your Dashboard
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              This is a protected page. You need to be logged in to view this
              content.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
