'use client';

import BotList from "@/components/BotList/BotList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <>
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <p className="mb-3 text-5xl text-center font-semibold">
          Dashboard
        </p>
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <BotList />
        </div>
      </section>
    </>
  );
}
