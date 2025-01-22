import { redirect } from "react-router";
import { serverClient } from "~/lib/supabase";

export async function action({ request }: { request: Request }) {
  const supabase = serverClient({ request });
  await supabase.client.auth.signOut();

  return redirect("/login");
}
