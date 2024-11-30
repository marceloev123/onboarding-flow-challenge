import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export const FormSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-[480px]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-[24px] w-[130px] rounded-full" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-[24px] w-[150px] rounded-full" />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid w-full items-center gap-4">
          <Skeleton className="h-[24px] w-full rounded-full" />
          <Skeleton className="h-[24px] w-full rounded-full" />
          <Skeleton className="h-[24px] w-full rounded-full" />

          <CardFooter className="flex justify-end">
            <Skeleton className="h-[36px] w-[64px] rounded-full" />
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
