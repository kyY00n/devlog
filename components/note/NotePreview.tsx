import Link from 'next/link';
import { Tag } from '@/components/Tag';
import React from 'react';

interface BlogPostProps {
  id: number;
  date: string;
  title: string;
  des?: string;
  tags?: string[];
}

const NotePreview = ({ id, date, title, des, tags }: BlogPostProps) => {
  return (
    <Link href={`/notes/${id}`} passHref className="w-full my-5 block">
      <div className="font-medium text-s transition text-gray-500 dark:text-gray-300">
        {date}
      </div>
      <div className="font-bold text-2xl sm:text-2xl mt-2 transition hover:text-rose-400">
        {title}
      </div>
      <br />
      <div className="whitespace-nowrap overflow-x-auto flex">
        {tags?.slice(0, 3).map((tag) =>
          tag ? <Tag key={tag} tag={tag} /> : null
        )}
      </div>
    </Link>
  );
};

export default NotePreview;
