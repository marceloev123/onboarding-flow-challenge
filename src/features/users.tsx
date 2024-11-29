import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";

export const UsersPage = () => {
  const users = [
    {
      email: "johndoe@gmail.com",
      about: "Software Engineer",
      address: "1234 Elm Street",
      birthdate: "01/01/1990",
    },
    {
      email: "jane@gmail.com",
      about: "Designer",
      address: "1234 Elm Street",
      birthdate: "01/01/1990",
    },
    {
      email: "test@gmail.com",
      about: "Tester",
      address: "1234 Elm Street",
      birthdate: "01/01/1990",
    },
  ];

  return (
    <div className="p-4">
      <Table>
        <TableCaption>Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>About</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Birthdate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.about}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.birthdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
