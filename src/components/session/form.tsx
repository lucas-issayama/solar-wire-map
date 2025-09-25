"use client";

import useSession from "./use-session";
import { defaultSession } from "./lib";
import { useRouter } from "next/navigation";
//import { redirect } from "next/navigation";
import { redirect } from "next/navigation";
export function Form() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p className="text-lg">Loading...</p>;
  }

  if (session.isLoggedIn) {
    return (
      <>
        <p className="text-lg">
          Logged in user: <strong>{session.username}</strong>
        </p>
        <p className="text-lg">
          Token: <strong>{session.token}</strong>
        </p>
        <p className="text-lg">
          Session: <strong>{JSON.stringify({ session })}</strong>
        </p>
        <LogoutButton />
      </>
    );
  }

  return <LoginForm />;
}

function LoginForm() {
  const { login } = useSession();
  const router = useRouter();
  function submit() {}

  async function callLogin() {
    //alert("will call");
    await login({
      username: "integrador@teste.com.br",
      password: "integrador",
    });

    //  router.push("/quotes");
  }

  return (
    <form
      onSubmit={function (event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
      }}
      method="POST"
    >
      <label className="block text-lg">
        <span>Username</span>
        <input
          type="text"
          name="username"
          placeholder=""
          defaultValue=""
          required
          // for demo purposes, disabling autocomplete 1password here
          autoComplete="off"
          data-1p-ignore
        />
      </label>
      <div>
        <input type="submit" value="Login" />
      </div>

      <button className="bg-blue" onClick={callLogin}>
        Call login
      </button>
    </form>
  );
}

function LogoutButton() {
  const { logout } = useSession();

  return (
    <p>
      <a
        onClick={(event) => {
          event.preventDefault();
          logout(null, {
            optimisticData: defaultSession,
          });
        }}
      >
        Logout
      </a>
    </p>
  );
}
