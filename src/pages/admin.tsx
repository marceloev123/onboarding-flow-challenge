import Head from "next/head";
import { AdminPage } from "~/features/admin/admin";

export default function Admin() {
  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminPage />
    </>
  );
}
