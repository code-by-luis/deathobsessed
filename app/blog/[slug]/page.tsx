import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  getAllPosts,
  getPostBySlug,
} from "@/lib/posts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} — death obsession`,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: Props) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="articlePage">
      <div className="grain" />

      <article className="article">
        <header className="articleHeader">
          <a
            href="/blog"
            className="backLink"
          >
            ← writings
          </a>

          <span className="articleDate">
            {formatDate(post.date)}
          </span>

          <h1>
            {post.title}
          </h1>

          {post.description && (
            <p className="articleDescription">
              {post.description}
            </p>
          )}
        </header>

        <div className="articleDivider" />

        <div className="articleBody">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="articleFooter">
          <a
            href="/blog"
            className="textLink"
          >
            return to writings
          </a>
        </footer>
      </article>
    </main>
  );
}

function formatDate(date: string) {
  if (!date) {
    return "";
  }

  return date.replaceAll("-", ".");
}