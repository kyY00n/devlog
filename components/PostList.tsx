import { Post } from '@/.contentlayer/generated';
import BlogPost from '@/components/BlogPost';

interface RecentPostsProps {
  posts: Post[];
}

export default function PostList({ posts }: RecentPostsProps) {
  return (
    <div className="flex flex-col">
      {posts.map((post: Post) => {
        return (
          <BlogPost
            id={post.id}
            date={post.date}
            title={post.title}
            des={post.description}
            tags={post.tags}
            key={crypto.randomUUID()}
          />
        );
      })}
    </div>
  );
}
