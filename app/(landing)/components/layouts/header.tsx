import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiShoppingBag } from "react-icons/fi";

export default function Header() {
  return (
    <header className="flex sticky top-0 z-50 bg-primary-light/20 backdrop-blur-2xl justify-around items-center h-20">
      <Link href={"/"}>
        <Image
          src="/images/logo.svg"
          alt="Logo SportOn"
          width={127}
          height={30}
        />
      </Link>
      <nav className="flex gap-20 font-medium">
        <Link href={"#"} className="relative after:content-[''] after:block after:w-8 after:h-1 after:bg-primary after:rounded-full after:absolute after:-bottom-3 after:left-1/2 after:-translate-1/2">Home</Link>
        <Link href={"#"}>Category</Link>
        <Link href={"#"}>Explore Products</Link>
      </nav>
      <div className="flex gap-10">
        <FiSearch size={24} />
        <div className="relative">
          <FiShoppingBag size={24} />
          <div className="absolute rounded-full bg-primary w-3.5 h-3.5 -right-1 -top-1 text-[9px] text-primary-light text-center">
            3
          </div>
        </div>
      </div>
    </header>
  );
}
