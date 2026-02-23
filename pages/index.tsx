import { allPosts, allNotes } from '@/.contentlayer/generated';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import PostPreview from '@/components/post/PostPreview';
import NotePreview from '@/components/note/NotePreview';
import blackIcon from '../app/diagonal-arrow-right-up-outline-svgrepo-com.svg';
import whiteIcon from '../app/white-diagonal-arrow-right-up-outline-svgrepo-com.svg';
import { useDarkMode } from '@/hook/useDarkMode';
import Link from 'next/link';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort((a, b) => {
    const dateDiff = Number(new Date(b.date)) - Number(new Date(a.date));
    return dateDiff === 0 ? b.id - a.id : dateDiff;
  });

  const notes = allNotes.sort((a, b) => {
    const dateDiff = Number(new Date(b.date)) - Number(new Date(a.date));
    return dateDiff === 0 ? b.id - a.id : dateDiff;
  });

  return {
    props: {
      post: {
        id: posts[0].id,
        date: posts[0].date,
        title: posts[0].title,
        description: posts[0].description,
        tags: posts[0].tags,
      },
      note: {
        id: notes[0].id,
        date: notes[0].date,
        title: notes[0].title,
        tags: notes[0].tags,
      },
    },
  };
};

export default function Home({ post, note }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [theme, handleTheme] = useDarkMode();
  return (
    <>
      <section className="mt-10 mb-5">
        <h1 className="text-2xl sm:text-4xl font-UhbeeSehyun">휘뚜루 마뚜루</h1>
      </section>
      <section className="mb-7 sm:mb-12">
        <p className="sm:text-xl font-UhbeeSehyun">개발하는 이야기</p>
      </section>
      
      <section className="mt-12 mb-2 sm:mb-5 flex justify-between">
        <h1 className="font-bold text-xl sm:text-2xl font-UhbeeSehyun dark:text-neutral-100 flex items-center">
          Recent Post
        </h1>
        <Link href="/posts" className="ml-2 flex items-center">
          <h6 className='text-xs font-UhbeeSehyun dark:text-neutral-100'>more</h6>
          <Image  
              src={theme === 'dark' ? whiteIcon : blackIcon}
              alt="profile"
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ width: '1em', height: '1em' }}
            />  
          </Link>
      </section>
      <PostPreview
            id={post.id}
            date={post.date}
            title={post.title}
            des={post.description}
            tags={post.tags}
            key={crypto.randomUUID()}
          />

      <section className="mt-12 mb-2 sm:mb-5 flex justify-between">
        <h1 className="font-bold text-xl sm:text-2xl font-UhbeeSehyun dark:text-neutral-100 flex items-center">
          Recent Note
        </h1>
        <Link href="/notes" className="ml-2 flex items-center">
          <h6 className='text-xs font-UhbeeSehyun dark:text-neutral-100'>more</h6>
          <Image 
              src={theme === 'dark' ? whiteIcon : blackIcon}
              alt="profile"
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ width: '1em', height: '1em' }}
            />
        </Link>
      </section>
      <NotePreview
            id={note.id}
            date={note.date}
            title={note.title}
            key={crypto.randomUUID()}
            tags={note.tags}
          />
    </>
  );
}
