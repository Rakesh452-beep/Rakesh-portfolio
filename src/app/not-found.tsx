import Link from "next/link";
import Navbar from "@/components/awake/Navbar";

export default function NotFound() {
  return (
    <div className="notfound-wrap">
      <div className="notfound-navRow">
        <Navbar variant="dev" />
      </div>

      <section className="notfound-panel">
        <span className="notfound-code">Error 404 — page not found</span>

        <h1 className="notfound-title">Lost the thread</h1>

        <p className="notfound-body">
          That link doesn&rsquo;t lead anywhere. Everything here is one page deep — start from the
          index, or jump straight into the work.
        </p>

        <div className="notfound-links">
          <Link href="/" className="notfound-pill notfound-pillSolid">
            Back to the index
          </Link>
          <Link href="/projects" className="notfound-pill">
            See the work
          </Link>
        </div>
      </section>
    </div>
  );
}
