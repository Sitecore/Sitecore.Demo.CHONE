import { FC, useMemo } from 'react';
import { BlockQuote } from './components/BlockQuote';
import { CodeBlock } from './components/CodeBlock';
import { Heading } from './components/Heading';
import { BulletList } from './components/BulletList';
import { ListItem } from './components/ListItem';
import { Paragraph } from './components/Paragraph';
import { Text } from './components/Text';
import { getComponentTree } from './utilities';
import { OrderedList } from './components/OrderdList';
import { RichTextLink } from './components/RichTextLink';
import { CodeText } from './components/CodeText';
import clsx from 'clsx';

interface Props {
  body: any;
  className?: string;
}

export const RichText: FC<Props> = ({ body, className }) => {
  const classes = useMemo(
    () => (className ? clsx('richtext', className) : 'richtext'),
    [className]
  );
  const componentMap = useMemo(
    () => ({
      heading: (context: any, children: any) => {
        return <Heading level={context.attrs.level}>{children}</Heading>;
      },
      paragraph: (context: any, children: any) => {
        return <Paragraph>{children}</Paragraph>;
      },
      bulletList: (context: any, children: any) => {
        return <BulletList>{children}</BulletList>;
      },
      listItem: (context: any, children: any) => {
        return <ListItem>{children}</ListItem>;
      },
      orderedList: (context: any, children: any) => {
        return <OrderedList>{children}</OrderedList>;
      },
      codeBlock: (context: any, children: any) => {
        return <CodeBlock>{children}</CodeBlock>;
      },
      blockquote: (context: any, children: any) => {
        return <BlockQuote>{children}</BlockQuote>;
      },
      text: (context: any) => {
        const hasMarks = !!context?.marks?.length;

        if (!hasMarks) {
          return <Text>{context.text}</Text>;
        }

        const linkMark = context.marks.find((mark: any) => mark.type === 'link');

        if (linkMark) {
          return (
            <RichTextLink href={linkMark.attrs.href} target={linkMark.attrs.target}>
              {context.text}
            </RichTextLink>
          );
        }

        const codeMark = context.marks.find((mark: any) => mark.type === 'code');

        if (codeMark) {
          return <CodeText>{context.text}</CodeText>;
        }

        return <Text marks={context.marks}>{context.text}</Text>;
      },
    }),
    []
  );

  const tree = useMemo(() => getComponentTree(body, componentMap), [body, componentMap]);

  if (!body) {
    return null;
  }

  return <section className={classes}>{tree}</section>;
};
