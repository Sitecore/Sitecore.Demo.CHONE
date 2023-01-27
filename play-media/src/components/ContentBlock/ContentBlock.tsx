import { ContentBlock } from '../../interfaces/contentBlock';
import { RichText } from '../RichText/RichText';

const ContentBlock = ({ contentBlock }: { contentBlock: ContentBlock | undefined }) => {
  return (
    <div className="content-block container">
      <h1 className="content-block-title">{contentBlock?.title}</h1>
      {contentBlock?.body && (
        <RichText body={contentBlock?.body.content} className="content-block-body" />
      )}
    </div>
  );
};

export default ContentBlock;
