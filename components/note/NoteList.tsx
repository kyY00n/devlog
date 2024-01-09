import { Note } from '@/.contentlayer/generated';
import NotePreview from '@/components/note/NotePreview';

interface RecentPostsProps {
  notes: Note[];
}

export default function NoteList({ notes }: RecentPostsProps) {
  return (
    <div className="flex flex-col">
      {notes.map((post: Note) => {
        return (
          <NotePreview
            id={post.id}
            date={post.date}
            title={post.title}
            key={crypto.randomUUID()}
          />
        );
      })}
    </div>
  );
}
