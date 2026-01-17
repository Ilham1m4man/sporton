"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  FiBox,
  FiCreditCard,
  FiLayers,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";

export default function Sidebar() {
  const { push } = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/products", label: "Products", icon: FiBox, id: "products" },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: FiLayers,
      id: "categories",
    },
    {
      href: "/admin/transactions",
      label: "Transactions",
      icon: FiShoppingCart,
      id: "transactions",
    },
    {
      href: "/admin/bank-info",
      label: "Bank Informations",
      icon: FiCreditCard,
      id: "bank-infos",
    },
  ];
  return (
    <aside className="flex flex-col justify-between w-80 fixed top-0 left-0 max-w-[320px] min-h-screen bg-white border border-[#EEEEEE]">
      <div>
        <div className="flex max-h-[100px] px-14 py-9 gap-1 items-center justify-center border-b border-[#EEEEEE]">
          <Image
            src="/images/logo.svg"
            alt="sporton logo"
            width={154}
            height={36}
          />
          <span className="italic font-bold mt-2">Admin</span>
        </div>
        <nav className="grid w-full gap-4 px-5 mt-10">
          {navLinks.map((link) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.id}
                className={`flex gap-4 rounded-lg w-full py-[12px] pl-[18px] font-medium duration-200 ${
                  isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
                }`}
                href={link.href}
              >
                <link.icon size={24} /> <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        className="flex gap-4 cursor-pointer mx-5 my-4 py-[12px] pl-[18px] rounded-lg hover:bg-red-100 hover:text-red-400 font-medium duration-200"
        onClick={() => push("/admin/login")}
      >
        <FiLogOut size={24} /> <span>Log out</span>
      </button>
    </aside>
  );
}
