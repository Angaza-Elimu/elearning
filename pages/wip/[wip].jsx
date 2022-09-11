import Image from "next/image";
import Link from "next/link";
import { Button, Layout } from "../../components";
import developingImage from "../../public/images/developing.svg";

export default function WIPPage() {
  return (
    <Layout>
      <div className="flex flex-col my-auto gap-16 items-center justify-between">
        <div className="relative h-96 w-2/3">
          <Image src={developingImage} layout="fill" />
        </div>
        <div className="flex flex-col items-center gap-5 w-full lg:w-4/5 text-lg">
          <p>Oh my, you've caught us! We are still developing this page.</p>
          <Link passHref href="/learn">
            <Button name="Back to learning" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
