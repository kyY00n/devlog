import Link from 'next/link';
import { Tag } from '@/components/Tag';

interface PostPreviewProps {
  id: number;
  date: string;
  title: string;
  des?: string;
  tags?: string[];
}

const PostPreview = ({ id, date, title, des, tags }: PostPreviewProps) => {
  return (
    <Link href={`/posts/${id}`} passHref className="w-full my-5">
      <div className="font-medium text-s transition text-gray-500 dark:text-gray-300">{date}</div>
      <div className="font-bold text-2xl sm:text-2xl mt-1 transition hover:text-rose-400">
        {title}
      </div>
      <div className="font-medium transition text-gray-600 dark:text-gray-400 mt-1">{des}</div>
      <div className="flex mt-4">{tags?.slice(0, 3).map(Tag)}</div>
    </Link>
  );
};

export default PostPreview;
