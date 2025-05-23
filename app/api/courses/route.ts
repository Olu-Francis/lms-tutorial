import { db } from "@/lib/db";
import { isInstructor } from "@/lib/instructor";
import { auth } from "@clerk/nextjs/server";
import { STATUS_CODES } from "http";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();

    if (!userId || !isInstructor(userId)) {
      return new NextResponse("Unauthorized", STATUS_CODES);
    }
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
