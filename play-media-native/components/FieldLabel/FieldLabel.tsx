import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const FieldLabel = ({
  required,
  title,
  style,
}: {
  required?: boolean;
  title: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[style, { flexDirection: 'row' }]}>
      <Text
        variant="labelSmall"
        style={{
          color: theme.colors.gray.DEFAULT,
        }}
      >
        {title}
      </Text>
      {required && (
        <>
          <Text
            style={{
              color: theme.colors.pink.DEFAULT,
            }}
          >
            *
          </Text>
        </>
      )}
    </View>
  );
};
