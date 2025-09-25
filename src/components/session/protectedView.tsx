"use client"

import useSession from "@/components/session/use-session";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedView({children}: {children: React.ReactNode}) {
    const { session, isLoading } = useSession();
    const { user } = session;
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !session.isLoggedIn) {
            redirect("/login");
        }
    },[isLoading, session.isLoggedIn, router])

    return <>{children}</>
}