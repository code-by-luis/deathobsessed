import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(
  process.cwd(),
  "content",
  "posts"
);

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
};

export type PostSummary = Omit<Post, "content">;

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");

      const fullPath = path.join(
        postsDirectory,
        filename
      );

      const fileContents = fs.readFileSync(
        fullPath,
        "utf8"
      );

      const { data } = matter(fileContents);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        description: String(
          data.description ?? ""
        ),
      };
    });

  return posts.sort((a, b) => {
    return (
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
    );
  });
}

export function getPostBySlug(
  slug: string
): Post | null {
  const fullPath = path.join(
    postsDirectory,
    `${slug}.md`
  );

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(
    fullPath,
    "utf8"
  );

  const { data, content } =
    matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    description: String(
      data.description ?? ""
    ),
    content,
  };
}