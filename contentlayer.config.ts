import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import { Pluggable } from 'unified';

// 원하는 코드 블록 테마가 있다면 찾아서 적용하면 된다.
const options = {
  theme: 'github-dark',
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields: {
    id: { type: 'number', required: true },
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    description: { type: 'string', required: true },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
  },
}));
export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, options]] as Pluggable[], // https://stackoverflow.com/questions/77344966/next-js13-contentlayer-syntax-highlight-error-issues
  },
});
