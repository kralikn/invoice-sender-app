import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center gap-6 bg-slate-50 h-20">
      <Link href="/">Kezdőlap</Link>
      {/* <Link href="/contacts">Elérhetőségek</Link> */}
      {/* <Link href="/upload">Feltöltés</Link> */}
    </div>
  )
}
