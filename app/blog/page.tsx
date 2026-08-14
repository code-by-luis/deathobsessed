import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="blogPage">
      <div className="grain" />

      <header className="blogHeader">
        <a
          href="/"
          className="backLink"
        >
          ← home
        </a>

        <span className="eyebrow">
          death obsession
        </span>

        <h1>
          writings
        </h1>

        <p className="blogIntro">
          yappy yapping
        </p>
      </header>

      <div className="divider" />

      <section className="blogArchive">
        {posts.length === 0 && (
          <p className="emptyArchive">
            nothing here yet.
          </p>
        )}

        {posts.map((post) => (
          <a
            key={post.slug}
            className="blogEntry"
            href={`/blog/${post.slug}`}
          >
            <span className="blogDate">
              {formatDate(post.date)}
            </span>

            <span className="blogEntryContent">
              <span className="blogTitle">
                {post.title}
              </span>

              {post.description && (
                <span className="blogDescription">
                  {post.description}
                </span>
              )}
            </span>

            <span className="blogArrow">
              ↗
            </span>
          </a>
        ))}
      </section>

      <footer className="blogFooter">
        <span>
          pain
        </span>
      </footer>
    </main>
  );
}

function formatDate(date: string) {
  if (!date) {
    return "";
  }

  return date.replaceAll("-", ".");
}