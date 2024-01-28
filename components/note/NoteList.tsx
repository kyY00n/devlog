import { Note } from '@/.contentlayer/generated';
import NotePreview from '@/components/note/NotePreview';

interface RecentPostsProps {
  notes: Note[];
}

export default function NoteList({ notes }: RecentPostsProps) {
  return (
    <div className="flex flex-col">
      {notes.map((note: Note) => {
        return (
          <NotePreview
            id={note.id}
            date={note.date}
            title={note.title}
            key={crypto.randomUUID()}
            tags={note.tags}
          />
        );
      })}
    </div>
  );
}
