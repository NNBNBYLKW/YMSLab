import Link from "next/link";
import { Container } from "@/components/ui/Container";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <Link href="/" className="brand">
          YMS Lab
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
