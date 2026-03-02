import { HomeClient } from "@/components/home/HomeClient";
import { works } from "@/data/works";
import { getAllPosts } from "@/lib/blog";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <HomeClient
      recentWorks={works.slice(0, 3)}
      featuredPosts={posts.slice(0, 3)}
    />
  );
}
