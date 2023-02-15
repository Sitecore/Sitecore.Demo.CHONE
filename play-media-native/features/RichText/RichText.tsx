import { FC, useMemo } from 'react';
import { View } from 'react-native';

import { BlockQuote } from './components/BlockQuote';
import { BulletList } from './components/BulletList';
import { CodeBlock } from './components/CodeBlock';
import { CodeText } from './components/CodeText';
import { Heading } from './components/Heading';
import { HorizontalRule } from './components/HorizontalRule';
import { ListItem } from './components/ListItem';
import { OrderedList } from './components/OrderdList';
import { Paragraph } from './components/Paragraph';
import { RichTextLink } from './components/RichTextLink';
import { SimpleText } from './components/SimpleText';
import { getComponentTree } from './utilities';

interface Props {
  body: any;
  accentColor?: string;
}

export const RichText: FC<Props> = ({ body, accentColor }) => {
  const componentMap = useMemo(
    () => ({
      heading: (context: any, children: any, key: string) => {
        return (
          <Heading level={context.attrs.level} key={key}>
            {children}
          </Heading>
        );
      },
      paragraph: (context: any, children: any, key: string) => {
        return <Paragraph key={key}>{children}</Paragraph>;
      },
      bulletList: (context: any, children: any, key: string) => {
        return <BulletList key={key}>{children}</BulletList>;
      },
      listItem: (context: any, children: any, key: string) => {
        return <ListItem key={key}>{children}</ListItem>;
      },
      orderedList: (context: any, children: any, key: string) => {
        return <OrderedList key={key}>{children}</OrderedList>;
      },
      codeBlock: (context: any, children: any, key: string) => {
        return <CodeBlock key={key}>{children}</CodeBlock>;
      },
      blockquote: (context: any, children: any, key: string) => {
        return (
          <BlockQuote key={key} accentColor={accentColor}>
            {children}
          </BlockQuote>
        );
      },
      horizontalRule: (context: any, children: any, key: string) => {
        return <HorizontalRule key={key} />;
      },
      text: (context: any, children: any, key: string) => {
        const hasMarks = !!context?.marks?.length;

        if (!hasMarks) {
          return <SimpleText key={key}>{context.text}</SimpleText>;
        }

        const linkMark = context.marks.find((mark: any) => mark.type === 'link');

        if (linkMark) {
          return (
            <RichTextLink
              href={linkMark.attrs.href}
              target={linkMark.attrs.target}
              key={key}
              accentColor={accentColor}
            >
              {context.text}
            </RichTextLink>
          );
        }

        const codeMark = context.marks.find((mark: any) => mark.type === 'code');

        if (codeMark) {
          return <CodeText key={key}>{context.text}</CodeText>;
        }

        return (
          <SimpleText marks={context.marks} key={key}>
            {context.text}
          </SimpleText>
        );
      },
    }),
    [accentColor]
  );

  const tree = useMemo(() => getComponentTree(body, componentMap), [body, componentMap]);

  if (!body) {
    return null;
  }

  return <View>{tree}</View>;
};
