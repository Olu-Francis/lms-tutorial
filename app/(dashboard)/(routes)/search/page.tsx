import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import dynamic from "next/dynamic";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

const SearchInput = dynamic(() => import("@/components/search-input"), {
  loading: () => <div>Loading search...</div>,
});

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { userId } = await auth();
  const resolvedSearchParams = await searchParams;
  const { categoryId, title } = resolvedSearchParams;

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    title: title as string,
    categoryId: categoryId as string,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
