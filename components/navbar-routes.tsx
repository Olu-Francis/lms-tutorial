"use client"

import React, { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isInstructor } from "@/lib/instructor";

export const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();

    const isInstructorPage = pathname?.startsWith("/instructor");
    const isCoursePage = pathname?.includes("/course");
    const isSearchPage = pathname === "/search";

    const [isInstructorUser, setIsInstructorUser] = useState(false);

    useEffect(() => {
        const checkInstructorStatus = async () => {
            if (userId) {
                const result = await isInstructor(userId);
                setIsInstructorUser(result);
            }
        };
        checkInstructorStatus();
    }, [userId]);

    return (
        <>
            {isSearchPage && (
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
                ) : isInstructorUser ? (
                    <Link href="/instructor/courses" className="mt-2">
                        <Button size={"sm"} variant={"ghost"}>
                            Instructor mode
                        </Button>
                    </Link>
                ) : null}
                <UserButton />
            </div>
        </>
    );
};