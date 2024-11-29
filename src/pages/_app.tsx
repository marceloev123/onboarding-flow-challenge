import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/layout";
import { SidebarProvider } from "~/components/ui/sidebar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SidebarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SidebarProvider>
  );
};

export default api.withTRPC(MyApp);
