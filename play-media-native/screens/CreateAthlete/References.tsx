import { View } from "react-native";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { ContentFieldMedia } from "../../features/ContentFieldMedia/ContentFieldMedia";
import { theme } from "../../theme/theme";
import { useAthleteFields } from "../../hooks/useAthleteFields/useAthleteFields";

const initialRoute = "AddAthlete";

export const References = () => {
  const { athleteFields } = useAthleteFields();

  return (
    <NestableScrollContainer>
      <ContentFieldMedia
        fieldKey="featuredImage"
        fieldTitle="Featured Image"
        initialRoute={initialRoute}
        items={athleteFields.featuredImage}
        style={{ marginTop: theme.spacing.md }}
      />
      <ContentFieldMedia
        fieldKey="profilePhoto"
        fieldTitle="Profile photo"
        initialRoute={initialRoute}
        items={athleteFields.profilePhoto}
        style={{ marginTop: theme.spacing.md }}
      />
      <ContentFieldMedia
        fieldKey="relatedMedia"
        fieldTitle="Related Media"
        initialRoute={initialRoute}
        items={athleteFields.relatedMedia}
        style={{ marginTop: theme.spacing.lg }}
      />
      <View style={{ paddingBottom: 100 }} />
    </NestableScrollContainer>
  );
};
