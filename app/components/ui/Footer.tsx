import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <p>© {new Date().getFullYear()} YMS Lab. Crafted with maintainable motion foundations.</p>
      </Container>
    </footer>
  );
}
