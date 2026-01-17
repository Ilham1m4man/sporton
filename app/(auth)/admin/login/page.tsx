"use client";

import { Button } from "@/app/(landing)/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [isPeek, setIsPeek] = useState(true);
  const { push } = useRouter();
  const peekHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPeek(!isPeek);
  };
  return (
    <main className="bg-[#F7F9FA] grid place-items-center min-h-screen">
      <div className="flex flex-col gap-4 bg-white border border-[#DBDBDB] border-t-4 border-t-primary rounded-[18px] p-[50px] shadow-lg">
        <div className="flex gap-1 items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="sporton logo"
            width={154}
            height={36}
          />
          <span className="italic font-bold mt-2">Admin</span>
        </div>
        <p className="text-black/50 text-sm mb-6 self-center-safe">
          Enter your credentials to access the dashboard
        </p>
        <form className="flex flex-col gap-6 min-w-[397px]">
          <div className="grid gap-2">
            <label className="font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-lg border border-[#DBDBDB] px-[18px] py-[10px] text-sm"
              type="email"
              placeholder="admin@store.com"
            />
          </div>
          <div className="grid gap-2">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border border-[#DBDBDB] px-[18px] py-[10px] text-sm"
                type={isPeek ? "password" : "text"}
                placeholder="••••••••••••••••••••"
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={peekHandler}
              >
                {isPeek ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>
          <Button
            className="rounded-lg mt-4 font-medium shadow-lg shadow-primary/30"
            onClick={() => push("/admin/products")}
          >
            Sign in
          </Button>
        </form>
      </div>
    </main>
  );
}
