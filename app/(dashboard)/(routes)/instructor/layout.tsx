import { isInstructor } from "@/lib/instructor";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const { userId } = await auth();
    const instructorStatus = await isInstructor(userId);
    if (!instructorStatus) {
      return redirect("/");
    }
    return <>{children}</>;
  } catch (error) {
    console.error("Error verifying instructor status:", error);
    return redirect("/");
  }
};

export default TeacherLayout;
