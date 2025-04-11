"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, MapIcon } from "lucide-react";
import Header from "./Header";

interface HeaderWithNavProps {
  children?: React.ReactNode;
}

export default function HeaderWithNav({ children }: HeaderWithNavProps) {
  const pathname = usePathname();

  return (
    <Header>
      <Header.NavBox>
        {children}
        <Link
          href="/"
          className={`w-8 h-8 flex items-center justify-center hover:bg-opacity-80 transition-colors ${
            pathname === "/" ? "" : "opacity-50"
          }`}
        >
          <MapIcon className="w-5 h-5" />
        </Link>
        <Link
          className={`w-8 h-8 flex items-center justify-center hover:bg-opacity-80 transition-colors ${
            pathname?.includes("drawing-list") ? "" : "opacity-50"
          }`}
          href="/drawing-list"
        >
          <Images className="w-5 h-5" />
        </Link>
      </Header.NavBox>
    </Header>
  );
}
