import styled from "styled-components";

const PageHeader = styled.h3`
  font-size: 20px;
  line-height: 20px;
  margin-top: 40px;
  margin-bottom: 33px;
`;

const AccountsSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .scroll-container {
    position: relative;
    flex: 1;
  }

  .scroll-content {
    position: absolute;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: unset;
  }
`;

const AccountsHeader = styled.div`
  font-size: 20px;
  line-height: 20px;
  padding: 40px 42px 33px 42px;
  border-bottom: 1px solid #d4dce8;
`;

const AccountListStyles = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 105px;
  li {
    border-bottom: 1px solid #d4dce8;
  }
`;

interface AccountButtonStyleProps {
  isSelected: boolean;
}

const AccountButtonStyles = styled.button<AccountButtonStyleProps>`
  appearance: none;
  background: transparent;
  border: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  min-height: 102px;
  justify-content: center;
  padding: 16px 42px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  background: ${({ isSelected }) => (isSelected ? "#4E63F8" : "transparent")};
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};

  .title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 1px;
  }

  .text {
    font-size: 12px;
    line-height: 20px;
    opacity: 0.85;
    margin-bottom: 1px;
  }

  .badge {
    background: rgba(217, 232, 252, 0.45);
    border-radius: 4px;
    font-size: 14px;
    line-height: 24px;
    padding: 0 8px;
  }
`;

const ExpensesTableContainer = styled.div`
  padding-left: 1px;
  .ant-table-pagination.ant-pagination {
    margin: 30px 42px;
  }
`;

export {
  PageHeader,
  AccountsHeader,
  AccountButtonStyles,
  AccountListStyles,
  AccountsSidebarContainer,
  ExpensesTableContainer,
};
