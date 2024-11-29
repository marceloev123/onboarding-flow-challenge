import Head from "next/head";
import { OnboardingPage } from "~/features/onboarding";

export default function Home() {
  return (
    <>
      <Head>
        <title>Onboarding</title>
        <meta name="description" content="User onboarding flow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OnboardingPage />
    </>
  );
}
