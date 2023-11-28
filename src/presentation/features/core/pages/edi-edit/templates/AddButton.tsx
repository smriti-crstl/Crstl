import { PlusOutlined } from "@ant-design/icons";
import { MouseEventHandler } from "react";
import { ButtonContainer, StyledButton } from "./styles";

interface PublicProps {
  title: string;
  onAddClick: MouseEventHandler;
}

export const AddButton: React.FC<PublicProps> = ({ title, onAddClick }) => {
  return (
    <ButtonContainer>
      <StyledButton
        htmlType="button"
        onClick={onAddClick}
        icon={<PlusOutlined />}
      >
        Add {title}
      </StyledButton>
    </ButtonContainer>
  );
};

