import clsx from "clsx";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const Container = styled.div`
  width: 1844px;
  max-width: 100%;
  margin: auto;
  margin-top: 56px;
  margin-bottom: 56px;
`;

const AlertContainer = styled.div`
  margin-bottom: 24px;
`;

const UserInputFieldContainerStyles = styled.div`
  .input-field-container {
    border: 2px solid transparent;
    padding: 4px;
    margin-bottom: 18px;
    & > .ant-row {
      margin-bottom: 0;
    }
    &.show-border {
      border-color: rgb(251, 247, 25, 0.5);
    }
  }
`;

function UserInputFieldContainer({
  showBorder = false,
  children,
}: {
  showBorder?: boolean;
  children: any;
}) {
  return children;
  // return (
  //   <UserInputFieldContainerStyles>
  //     <div
  //       className={clsx("input-field-container", {
  //         "show-border": showBorder,
  //       })}
  //     >
  //       {children}
  //     </div>
  //   </UserInputFieldContainerStyles>
  // );
}

export { PageWrapper, Container, AlertContainer, UserInputFieldContainer };
