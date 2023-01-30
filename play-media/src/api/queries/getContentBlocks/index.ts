import { fetchGraphQL } from '../..';
import {
  AllContentBlockResponse,
  ContentBlock,
  ContentBlockResponse,
} from '../../../interfaces/contentBlock';

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

const getContentBlockByIdQuery = (id: string) => {
  return `
    query {
      contentBlock (id: "${id}") {
        id
        title
        body
      }
    }`;
};

export const getContentBlockById = async (
  id: string
): Promise<{ contentBlock: Partial<ContentBlock> }> => {
  const contentBlockResponse: ContentBlockResponse = (await fetchGraphQL(
    getContentBlockByIdQuery(id)
  )) as ContentBlockResponse;

  return {
    contentBlock: contentBlockResponse.data.contentBlock,
  };
};
