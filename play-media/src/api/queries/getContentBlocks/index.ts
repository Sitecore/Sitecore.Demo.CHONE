import { fetchGraphQL } from '../..';
import { AllContentBlockResponse, ContentBlock } from '../../../interfaces/contentBlock';

const contentBlocksQuery = `
  query {
    allContentBlock {
      results {
        id
        title
        body
      }
    }
  }
`;

export const getAllContentBlocks = async (): Promise<Partial<ContentBlock>[] | null> => {
  try {
    const results: AllContentBlockResponse = (await fetchGraphQL(
      contentBlocksQuery
    )) as AllContentBlockResponse;
    const contentBlocks: Partial<ContentBlock>[] = [];

    results.data.allContentBlock.results.forEach((contentBlock: Partial<ContentBlock>) => {
      contentBlocks.push({
        id: contentBlock.id,
        title: contentBlock.title,
        body: contentBlock.body,
      });
    });

    return contentBlocks;
  } catch {
    return null;
  }
};
