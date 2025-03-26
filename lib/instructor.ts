export const isInstructor = async (userId: string | null | undefined) => {
  return await userId === process.env.NEXT_PUBLIC_INSTRUCTOR_ID;
};
