"use client";

import { Button } from "@/app/(landing)/components/ui/button";
import { login } from "@/app/services/auth.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPeek, setIsPeek] = useState(true);
  const router = useRouter();
  const peekHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPeek(!isPeek);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/products");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      if (data.token) router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong, please try again later.");
      console.log("Login error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#F7F9FA] grid place-items-center min-h-screen p-4">
      <div className="flex flex-col gap-4 bg-white border border-gray-100 border-t-3 border-t-primary rounded-[18px] p-[30px] drop-shadow-gray-100 drop-shadow-xl">
        <div className="flex gap-1 items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="sporton logo"
            width={154}
            height={36}
          />
          <span className="italic font-bold mt-2">Admin</span>
        </div>
        <p className="text-black/50 text-sm mb-6 text-center mx-8">
          Enter your credentials to access the dashboard
        </p>
        <form onSubmit={handleLogin} className="flex text-xs flex-col gap-8 ">
          <div className="grid gap-2">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-lg border border-gray-300 px-[18px] py-[10px] text-sm"
              type="email"
              placeholder="admin@store.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border border-gray-300 px-[18px] py-[10px] text-sm"
                type={isPeek ? "password" : "text"}
                placeholder="••••••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="absolute right-4 top-1/2 text-gray-400 -translate-y-1/2 cursor-pointer"
                onClick={peekHandler}
              >
                {isPeek ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>
          <Button
            className="rounded-lg mt-4 font-bold text-base shadow-lg shadow-primary/30 hover:scale-100"
            type="submit"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
