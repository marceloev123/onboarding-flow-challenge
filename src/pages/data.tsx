import Head from "next/head";
import { UsersPage } from "~/features/users";

export default function Users() {
  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UsersPage />
    </>
  );
}
