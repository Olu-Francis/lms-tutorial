import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { STATUS_CODES } from "http";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request, 
    { params }: { params :{ courseId: string} }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const values = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized", STATUS_CODES);
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(course);
    }catch (error){
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}