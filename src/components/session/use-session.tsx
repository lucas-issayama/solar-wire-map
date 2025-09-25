import useSWR from "swr";
import { SessionData, defaultSession } from "./lib";
import useSWRMutation from "swr/mutation";
const sessionApiRoute = "/api/session";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  try {
    const response = await fetch(input, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      ...init,
    });

    if (!response?.ok) {
      const errorText = await response.text(); // Get the error message from the response
      throw new Error(`${errorText}`);
    }
    const data = await response.json();
    return data as JSON;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

function doLogin(url: string, { arg }: { arg: any }) {
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ arg }),
  });
}

function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: "DELETE",
  });
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession,
    }
  );

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    revalidate: true,
  });
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);

  return { session, logout, login, isLoading };
}
