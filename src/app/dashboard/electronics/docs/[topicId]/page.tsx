import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getTopicDoc, getAllTopicSlugs, getAdjacentTopics } from "@/data/docs";
import { isTopicAdminOnly } from "@/data/electronics-roadmap";
import { getVerifiedUserRole } from "@/lib/auth/require-admin";
import { TopicDocumentationView } from "@/components/electronics-dashboard/TopicDocumentationView";

interface PageProps {
  params: Promise<{
    topicId: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  // Never statically generate admin-only topics in the public build artifact
  return slugs
    .filter((topicId) => !isTopicAdminOnly(topicId))
    .map((topicId) => ({ topicId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topicId } = await params;

  // Protect admin-only topic metadata from unauthorized clients
  if (isTopicAdminOnly(topicId)) {
    const { isAdmin } = await getVerifiedUserRole();
    if (!isAdmin) {
      return {
        title: "Topic Documentation — SkillNex",
        description: "Structured electronics and programming educational documentation.",
      };
    }
  }

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

  // Enforce server-side authorization for admin-only topics
  if (isTopicAdminOnly(topicId)) {
    const { role, isAdmin } = await getVerifiedUserRole();
    if (role === "guest") {
      redirect(`/sign-in?redirect_url=${encodeURIComponent(`/dashboard/electronics/docs/${topicId}`)}`);
    }
    if (!isAdmin) {
      notFound();
    }
  }

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
