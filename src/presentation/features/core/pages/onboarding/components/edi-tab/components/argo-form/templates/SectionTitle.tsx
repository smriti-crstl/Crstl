import { SectionTitleContainer } from "../styles";

interface PublicProps {
  title?: string;
}

const titlesToHide = ["heading", "detail", "summary"];

export const SectionTitle: React.FC<PublicProps> = ({ title }) => {
  if (!title || titlesToHide.includes(title.toLowerCase())) {
    return null;
  }

  return (
    <SectionTitleContainer>
      <span>{title}</span>
    </SectionTitleContainer>
  );
};

