import { Post } from '@/.contentlayer/generated';
import PostPreview from '@/components/post/PostPreview';

interface RecentPostsProps {
  posts: Post[];
}

export default function PostList({ posts }: RecentPostsProps) {
  return (
    <div className="flex flex-col">
      {posts.map((post: Post) => {
        return (
          <PostPreview
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
