import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "react-router";
import { serverClient } from "~/lib/supabase";
import type { Route } from "./+types/confirm";

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/";
  const headers = new Headers();

  if (token_hash && type) {
    const supabase = serverClient({ request });

    const { error } = await supabase.client.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect(next, { headers });
    }
  }

  // return the user to an error page with instructions
  return redirect("/auth/auth-code-error", { headers });
}

export default function Confirm() {
  return null;
}
