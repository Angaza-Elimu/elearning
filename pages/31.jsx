import Image from "next/image";
import { Breadcomb, Button, Header, Layout } from "../components";
import happyFace from "../public/images/happyFace.svg";

export default function Page31() {
  return (
    <Layout>
      <Breadcomb />

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-2/3 h-96">
          <Image src={happyFace} layout="fill" />
        </div>

        <div className="text-center my-6 space-y-4">
          <Header text="Yaay! great progress Alice." />

          <p className="text-lg w-full lg:w-2/3 mx-auto">
            You are now ready to take a quiz and review your progress so far.
          </p>

          <Button name="Start Quiz" />
        </div>
      </div>
    </Layout>
  );
}
