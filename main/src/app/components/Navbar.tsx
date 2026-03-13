
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import useModalStore from "@/lib/store/useModal";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useAuthStore } from "../../../store/authStore";
import HeaderLinks from "./HeaderLinks";

const Navbar = () => {
  const { openMenu } = useModalStore();
  const router = useRouter();

  // Use selectors for better reactivity and stability
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // Wait for client-side hydration so Zustand persist state is loaded
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isLoggedIn = hasMounted && isAuthenticated && !!user;

  useEffect(() => {
    console.log(
      "Navbar: isLoggedIn =",
      isLoggedIn,
      "user =",
      user ? user.email : null,
    );
  }, [isLoggedIn, user]);

  const handleMenu = () => {
    openMenu();
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Build initials and name (handle both firstName and firstname variants)
  const fName = user?.firstName || (user as any)?.firstname || "";
  const lName = user?.lastName || (user as any)?.lastname || "";

  const initials = user
    ? `${fName.charAt(0)}${lName.charAt(0)}`.toUpperCase()
    : "";

  const fullName = user ? `${fName} ${lName}`.trim() : "";

  return (
    <div className="flex justify-between items-center px-5 py-[30px] lg:px-20 w-full h-[86px] lg:h-20 bg-white">
      {/* Logo */}
      <Link href="/" className="lg:hidden">
        <Image
          src="/icons/complete-doc-logo.svg"
          alt="logo"
          width={125}
          height={26}
        />
      </Link>
      <Link href="/" className="hidden lg:block">
        <Image
          src="/icons/complete-doc-logo.svg"
          alt="logo"
          width={160}
          height={40}
        />
      </Link>

      {/* Header Links */}
      <HeaderLinks />

      {/* Right Section */}
      <div className="flex justify-around md:justify-between items-center gap-3 h-7 lg:h-8">
        <Link href="/cart" className="lg:p-2">
          <ShoppingCart />
        </Link>
        <span className="sm:hidden" onClick={handleMenu}>
          <HiOutlineMenuAlt2 className="cursor-pointer w-7 h-7" />
        </span>
        <Separator orientation="vertical" className="hidden md:block" />

        {/* Conditional Rendering: Avatar or Sign In Button */}
        {isLoggedIn ? (
          <span className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex relative h-10 px-0 gap-2">
                <div className="flex items-center gap-2">
                  {/* Initials Avatar */}
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#E8E8E8] flex items-center justify-center text-xs font-semibold text-[#333]">
                      {initials || "?"}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <span className="hidden lg:block text-sm text-[#151515] font-medium">
                    {fullName || user.email}
                  </span>
                </div>
                <span className="flex items-center justify-center w-[19px] h-[19px] border border-[#5C5C5C] rounded-full">
                  <ChevronDown className="w-3 h-3" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm text-[#151515] font-semibold">
                    {fullName}
                  </span>
                  <span className="text-xs text-[#898989]">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="dark:text-[#fafafa] hover:dark:bg-[#111827]">
                My Courses
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-[#fafafa] hover:dark:bg-[#111827]">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="dark:text-[#fafafa] hover:dark:bg-[#111827]"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </span>
        ) : (
          <Link
            href="/login"
            className="hidden md:flex justify-center items-center text-white text-xs h-full px-4 bg-[#007AFF] rounded-xs"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
