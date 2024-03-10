import { allNotes } from '@/.contentlayer/generated';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import NoteList from '@/components/note/NoteList';

export const getStaticProps: GetStaticProps = async () => {
  const notes = allNotes.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return {
    props: {
      notes,
    },
  };
};

export default function Notes({ notes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section className="mt-12 mb-10">
        <h1 className="font-bold text-2xl sm:text-4xl font-UhbeeSehyun">Notes</h1>
        <h3 className="mt-2 font-bold sm:text-xl font-UhbeeSehyun">일기, TIL, 자료 기록 등</h3>
      </section>
      <NoteList notes={notes} />
    </>
  );
}
