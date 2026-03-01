import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { works, getWorkBySlug } from "@/data/works";
import { WorkDetailClient } from "@/components/works/WorkDetailClient";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const work = getWorkBySlug(resolvedParams.slug);

  if (!work) {
    notFound();
  }

  const currentIndex = works.findIndex((item) => item.slug === work.slug);
  const prev = currentIndex > 0 ? works[currentIndex - 1] : undefined;
  const next = currentIndex < works.length - 1 ? works[currentIndex + 1] : undefined;

  return (
    <main>
      <Section>
        <Container>
          <WorkDetailClient work={work} prev={prev} next={next} />
        </Container>
      </Section>
    </main>
  );
}
