import {
  POChangeDocInvalidStateContainer,
  POChangeDocMetadataContainer,
  POChangeDocsListContainer,
  POEmojiContainer,
} from "./styles";

export const ExternalPONote: React.FC = () => {
  return (
    <POChangeDocsListContainer>
      <POChangeDocMetadataContainer>
        <POChangeDocInvalidStateContainer>
          <POEmojiContainer>
            <span role="img" aria-label="wave">
              👋
            </span>
          </POEmojiContainer>
          <div>
            <p>
              The original PO is not in Crstl. As a result, you cannot Accept or
              Reject the PO changes; you can view the changes below.
            </p>
            <p>
              This usually happens if the original PO was received by your
              previous EDI solution. For additional questions, please reach out
              using the support chat on the right corner below. Thank you.
            </p>
          </div>
        </POChangeDocInvalidStateContainer>
      </POChangeDocMetadataContainer>
    </POChangeDocsListContainer>
  );
};

