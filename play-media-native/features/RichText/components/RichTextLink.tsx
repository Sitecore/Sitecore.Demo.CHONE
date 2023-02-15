import { FC, useCallback } from 'react';
import { Linking, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../../theme/theme';

interface Props {
  children: string;
  href: string;
  target: string;
  accentColor?: string;
}

export const RichTextLink: FC<Props> = ({ children, href, accentColor }) => {
  const getValidLink = useCallback((href: string) => {
    const isValid = href.includes('https://') || href.includes('http://');

    if (isValid) {
      return href;
    }

    return `https://${href}`;
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Linking.openURL(getValidLink(href));
      }}
    >
      <Text
        style={{
          color: accentColor || theme.colors.blue.DEFAULT,
          textDecorationLine: 'underline',
        }}
      >
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};
