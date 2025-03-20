import Head from "next/head";
import Image from "next/image";
import licotron1 from "@/images/giphy (2).gif";

export default function Fallback() {
  return (
    <>
      <Head>
        <title>Internet error </title>
        <h1>This is offline fallback page</h1>
        <h2>When offline, any page route will fallback to this page</h2>
        <p>This is an fallback page in Pages/ </p>
        <Image src={licotron1.src} width={100} height={200} alt="none" />
      </Head>
    </>
  );
}
