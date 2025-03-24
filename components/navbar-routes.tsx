"use client"

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isInstructorPage = pathname?.startsWith("/instructor");
    const isCoursePage = pathname?.includes("/course");
    const isSearchPage = pathname === "/search";

    return(
        <>
            {isSearchPage &&  (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto ">
                {isInstructorPage || isCoursePage ? (
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
        </>
    );
}