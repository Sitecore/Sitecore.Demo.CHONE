import { FC, useMemo } from "react";
import { Text, StyleSheet } from "react-native";
import { theme } from "../../../theme/theme";

interface Props {
  children: string;
  marks?: Array<{ type: string }>;
}

export const SimpleText: FC<Props> = ({ children, marks = [] }) => {
  const styles = StyleSheet.create({
    bold: {
      fontFamily: theme.fontFamily.bold,
    },
    italic: {
      fontFamily: theme.fontFamily.italic,
    },
    underline: {
      textDecorationLine: "underline",
    },
    strike: {
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
    },
  });

  const calcAllStyles = () => {
    let allStyles = {};

    if (marks.some((mark) => mark.type === "bold")) {
      allStyles = { ...allStyles, ...styles.bold };
    }

    if (marks.some((mark) => mark.type === "italic")) {
      allStyles = { ...allStyles, ...styles.italic };
    }

    if (marks.some((mark) => mark.type === "underline")) {
      allStyles = { ...allStyles, ...styles.underline };
    }

    if (marks.some((mark) => mark.type === "strike")) {
      allStyles = { ...allStyles, ...styles.strike };
    }

    return allStyles;
  };

  return <Text style={calcAllStyles()}>{children}</Text>;
};
