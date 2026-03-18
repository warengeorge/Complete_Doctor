import { CourseCreateView } from "@/features/courses";

type DraftCoursePageProps = {
  params: Promise<{ id: string }>;
};

export default async function DraftCoursePage({
  params,
}: DraftCoursePageProps) {
  const { id } = await params;
  return <CourseCreateView draftId={id} />;
}
