import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { formatAddress, formatBirthDate } from "~/lib/utils";
import { api } from "~/utils/api";

export const UsersPage = () => {
  const { data, isPending } = api.user.find.useQuery();

  return (
    <div className="p-4">
      <Card className="w-full max-w-screen-lg">
        <CardHeader>Users List</CardHeader>
        <CardContent>
          {isPending || !data ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <Skeleton className="h-[24px] w-full rounded-full" />
                <Skeleton className="h-[24px] w-full rounded-full" />
                <Skeleton className="h-[24px] w-full rounded-full" />
                <Skeleton className="h-[24px] w-full rounded-full" />
              </div>
              <Skeleton className="h-[24px] w-full rounded-full" />
              <Skeleton className="h-[24px] w-full rounded-full" />
              <Skeleton className="h-[24px] w-full rounded-full" />
              <Skeleton className="h-[24px] w-full rounded-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>About</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Birthdate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell className="text-left">No users found</TableCell>
                  </TableRow>
                ) : null}
                {data.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.about ?? "No information"}</TableCell>
                    <TableCell>{formatAddress(user.address)}</TableCell>
                    <TableCell>{formatBirthDate(user.birthDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
