const colors = ['amber', 'pink', 'rose', 'red', 'orange']
const bullshit: {[key: typeof colors[number]]: {bg:string; text: string; darkGb: string; darkText: string;}} = {
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    darkGb: 'dark:bg-amber-900',
    darkText: 'dark:text-amber-200',
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    darkGb: 'dark:bg-pink-900',
    darkText: 'dark:text-pink-200',
  },
  rose: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    darkGb: 'dark:bg-rose-900',
    darkText: 'dark:text-rose-200',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    darkGb: 'dark:bg-red-900',
    darkText: 'dark:text-red-200',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    darkGb: 'dark:bg-orange-900',
    darkText: 'dark:text-orange-200',
  },
}

const colorHash = (name: string) => {
  const color = colors[(name.length + 1) % colors.length]
  return bullshit[color]
}

export const Tag = (tag: string) => {
  const { bg, text, darkGb, darkText} = colorHash(tag)
  return (
    <>
      <span
        className={`font-uhbeeZziba ${bg} ${text} text-s font-light me-2 px-2.5 pt-0.5 rounded-full ${darkGb} ${darkText}`}
        key={tag}
      >
        {tag}
      </span>
    </>
  );
};
