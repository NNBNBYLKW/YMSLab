import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WorkDetailClient } from "@/components/works/WorkDetailClient";
import { generateWorkStaticParams, getAllWorks, getWorkBySlug } from "@/lib/works";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
  return generateWorkStaticParams();
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const work = await getWorkBySlug(resolvedParams.slug);

  if (!work) {
    notFound();
  }

  const works = await getAllWorks();
  const currentIndex = works.findIndex((item) => item.slug === work.meta.slug);
  const prev = currentIndex > 0 ? works[currentIndex - 1] : undefined;
  const next = currentIndex < works.length - 1 ? works[currentIndex + 1] : undefined;

  return (
    <main>
      <Section>
        <Container>
          <WorkDetailClient work={work.meta} html={work.html} prev={prev} next={next} />
        </Container>
      </Section>
    </main>
  );
}
