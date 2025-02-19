"use client"

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isInstructorPage = pathname?.startsWith("/instructor");
    const isPlayerPage = pathname?.includes("/chapter");

    return(
        <div className="flex gap-x-2 ml-auto ">
            {isInstructorPage || isPlayerPage ? (
                <Link href="/" className="mt-2">
                    <Button size={"sm"} variant={"ghost"}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/instructor/courses" className="mt-2">
                    <Button size={"sm"} variant={"ghost"}>
                        Instructor mode 
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    );
}