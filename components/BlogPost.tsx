import Link from 'next/link';
import { toTag } from '@/pages/posts/[id]';

interface BlogPostProps {
  id: number;
  date: string;
  title: string;
  des: string;
  tags?: string[];
}

const BlogPost = ({ id, date, title, des, tags }: BlogPostProps) => {
  return (
    <Link href={`/posts/${id}`} passHref className="w-full my-5">
      <div className="font-medium text-xs transition text-gray-500 dark:text-gray-300">{date}</div>
      <div className="font-extrabold text-xl sm:text-2xl mt-2 transition hover:text-rose-400">
        {title}
      </div>
      <div className="font-medium text-lg transition text-gray-600 dark:text-gray-400 sm:text-xl mt-1">
        {des}
      </div>
      <div className="flex mt-2">{tags?.slice(0, 3).map(toTag)}</div>
    </Link>
  );
};

export default BlogPost;
