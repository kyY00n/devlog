import { allPosts } from '@/.contentlayer/generated';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import PostLayout from '@/components/PostLayout';
import Head from 'next/head';

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{`${post.title}`}</title>
      </Head>
      <PostLayout post={post} />
    </>
  );
};

export const toTag = (tag: string) => {
  return (
    <>
      <span
        className="font-uhbeeZziba bg-red-100 text-red-800 text-s font-light me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-200"
        key={tag}
      >
        {tag}
      </span>
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
    paths: allPosts.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = allPosts.find((p) => String(p.id) === params?.id);
  return {
    props: {
      post,
    },
  };
};

export default Post;
