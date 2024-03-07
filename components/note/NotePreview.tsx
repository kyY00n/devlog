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
      {' '}
      {/* Link 컴포넌트 내부에 a 태그 추가 및 className 적용 */}
      <div className="font-medium text-xs sm:text-s transition text-gray-500 dark:text-gray-300">
        {date}
      </div>
      <div className="font-bold text-2xl sm:text-2xl mt-2 transition hover:text-rose-400">
        {title}
      </div>
      <div className="font-medium text-xl transition text-gray-600 dark:text-gray-400 mt-1">
        {des}
      </div>
      <div className="whitespace-nowrap overflow-x-auto flex">
        {tags?.slice(0, 3).map((tag) => Tag(tag, tag))}
      </div>
    </Link>
  );
};

export default NotePreview;
