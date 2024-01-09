import { allNotes } from '@/.contentlayer/generated';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import PostLayout from '@/components/post/PostLayout';
import Head from 'next/head';

const Note = ({ note }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{`${note.title}`}</title>
      </Head>
      <PostLayout post={note} />
    </>
  );
};

export const toDate = (date: string) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allNotes.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const note = allNotes.find((p) => String(p.id) === params?.id);
  return {
    props: {
      note,
    },
  };
};

export default Note;
