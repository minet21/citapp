import { Button } from "@/components/ui/button";
import JobsClient from "./components/JobsClient";
import { PenSquare } from "lucide-react";
import Link from "next/link";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { queryFn } from "@/hooks/useTanstackQuery";

type JobsPageProps = {
  params: { role: string };
};
const JobsPage = async ({ params }: JobsPageProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["jobs"],
    queryFn: () => queryFn("/posts", { type: "jobs" }),
  });

  // this roles can post a job
  const allowedRoles = ["admin", "bulsu_partner", "peso"];

  return (
    <div className="flex flex-col p-5 md:p-10 pb-0">
      {allowedRoles.includes(params.role) && (
        <Link href={`/${params.role}/jobs/create`} className="self-end pb-2">
          <Button className="w-fit dark:text-white">
            <PenSquare className="w-5 h-5 mr-2" /> Post a job.{" "}
          </Button>
        </Link>
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JobsClient />
      </HydrationBoundary>
    </div>
  );
};
export default JobsPage;
