import { Navbar } from "~/components/Navbar";
import { Feed } from "~/components/Feed";
import { PageHead } from "~/components/PageHead";

export default function Home() {
  return (
    <>
      <PageHead title="Home | tinofind" />

      <Navbar />
      <main>
        <div className="pt-5">
          <Feed />
        </div>
      </main>
    </>
  );
}
