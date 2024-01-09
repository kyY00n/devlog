import { Post } from '@/.contentlayer/generated';
import PostPrivew from '@/components/post/PostPreview';

interface RecentPostsProps {
  posts: Post[];
}

export default function PostList({ posts }: RecentPostsProps) {
  return (
    <div className="flex flex-col">
      {posts.map((post: Post) => {
        return (
          <PostPrivew
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
