import { toDate } from '@/pages/posts/[id]';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { parseHeadersForTOC } from '@/libs/utils/markdown';
import TocSide from '@/components/TocSide';
import Comment from '@/components/Comment';
import { Tag } from '@/components/Tag';

interface LayoutProps {
  // children: ReactNode;
  post: any;
}

export default function PostLayout(props: LayoutProps) {
  const { post } = props;
  const MDXComponent = useMDXComponent(post.body.code);
  const toc = parseHeadersForTOC(post.body.raw);

  return (
    <>
      <main>
        <div className="flex relative border-b-2 mb-10">
          <div className="prose dark:prose-invert w-full max-w-none relative">
            <div className="mt-10 pb-10 prose dark:prose-invert">
              <h1 className="font-extrabold text-4xl -mb-6">{post.title}</h1>
              <h2 className="font-medium text-base dark:text-neutral-300">
                {toDate(post.date)} 작성
              </h2>
              <div className="mb-12">{post.tags?.map((tag: string) => Tag(tag, tag))}</div>
              <MDXComponent />
            </div>
          </div>
          <div className="pl-12 hidden md:block min-w-[200px] max-w-[250px]">
            <div className="sticky top-[180px] h-fit">
              <TocSide tableOfContents={toc} />
            </div>
          </div>
        </div>
      </main>
      <Comment />
    </>
  );
}
