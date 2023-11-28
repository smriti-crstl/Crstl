import { SectionTitleLineContainer } from "./styles";

interface PublicProps {
  title?: string;
}

export const SectionTitle: React.FC<PublicProps> = ({ title }) => {
  if (!title) {
    return null;
  }

  return (
    <SectionTitleLineContainer>
      <span>{title}</span>
    </SectionTitleLineContainer>
  );
};

