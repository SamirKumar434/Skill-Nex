import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTopicDoc, getAllTopicSlugs, getAdjacentTopics } from "@/data/docs";
import { TopicDocumentationView } from "@/components/electronics-dashboard/TopicDocumentationView";

interface PageProps {
  params: Promise<{
    topicId: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map((topicId) => ({ topicId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const doc = getTopicDoc(topicId);

  if (!doc) {
    return {
      title: "Topic Documentation — SkillNex",
      description: "Structured electronics and programming educational documentation.",
    };
  }

  return {
    title: `${doc.serial} ${doc.title} — SkillNex Documentation`,
    description: doc.why.slice(0, 160),
  };
}

export default async function TopicDocPage({ params }: PageProps) {
  const { topicId } = await params;
  const doc = getTopicDoc(topicId);

  if (!doc) {
    notFound();
  }

  const { prev, next } = getAdjacentTopics(topicId);

  return (
    <TopicDocumentationView
      doc={doc}
      prevDoc={prev ? { id: prev.id, title: prev.title, serial: prev.serial } : undefined}
      nextDoc={next ? { id: next.id, title: next.title, serial: next.serial } : undefined}
    />
  );
}
