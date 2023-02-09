import { View } from "react-native";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { ContentFieldMedia } from "../../features/ContentFieldMedia/ContentFieldMedia";
import { theme } from "../../theme/theme";
import { useAthleteFields } from "../../hooks/useAthleteFields/useAthleteFields";
import { CONTENT_TYPES } from "../../constants/contentTypes";

const initialRoute = "AddAthlete";
const contentType = CONTENT_TYPES.ATHLETE;

export const References = () => {
  const { athleteFields } = useAthleteFields();

  return (
    <NestableScrollContainer>
      <ContentFieldMedia
        contentType={contentType}
        fieldKey="featuredImage"
        fieldTitle="Featured Image"
        initialRoute={initialRoute}
        items={athleteFields.featuredImage}
        style={{ marginTop: theme.spacing.md }}
      />
      <ContentFieldMedia
        contentType={contentType}
        fieldKey="profilePhoto"
        fieldTitle="Profile photo"
        initialRoute={initialRoute}
        items={athleteFields.profilePhoto}
        style={{ marginTop: theme.spacing.md }}
      />
      <ContentFieldMedia
        contentType={contentType}
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
