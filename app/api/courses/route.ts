import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { STATUS_CODES } from "http";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();

    if (!userId) {
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
    console.log("[COURSES]", error); // Just to catch an error in the console, it help while developing
    return new NextResponse("Internal Error", { status: 500 });
  }
}
