
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#0d104c] px-5 py-14 text-white sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <strong className="font-[Manrope] text-lg">Jocomfy</strong>
          <p className="mt-3 text-sm text-white/65">Knowledge & Wisdom</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f2c500]">Explore</p>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            <Link href="#about">About</Link>
            <Link href="#academics">Academics</Link>
            <Link href="#student-life">Student life</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f2c500]">Admissions</p>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            <Link href="#admissions">Apply now</Link>
            <Link href="#contact">Book a visit</Link>
            <Link href="#contact">Contact us</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f2c500]">Location</p>
          <p className="mt-4 text-sm leading-6 text-white/75">
            Ghana<br />Contact details coming soon
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-[1320px] border-t border-white/20 pt-5 text-xs text-white/50">
        © {new Date().getFullYear()} Jocomfy International School
      </div>
    </footer>
  );
}
