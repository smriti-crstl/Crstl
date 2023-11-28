import styled from "styled-components";

interface ITabProps {
  bgColor: string;
  hoverBg: string;
  isActive: boolean;
  [key: string]: any;
}

interface IStatusProps {
  textColor: string;
}

interface IIconAreaProps {
  bgColor: string;
}

export const SummaryContainer = styled.div`
  margin-bottom: 24px;
  // display: flex;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  // flex-wrap: nowrap;
  gap: 17px;
  align-items: center;
  min-height: 150px;
`;

export const Tab = styled.div<ITabProps>`
  background: ${(props) =>
    props.isActive ? props.activeBg : props.bgColor || "#000000"};
  max-width: 360px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  height: 100%;
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.isActive ? props.hoverBg : props.bgColor || "#000000"};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.isActive ? props.activeBg : props.hoverBg ?? "#000000"};
    border-color: ${(props) => props.hoverBg || "#000000"};
  }
`;

export const TabSection = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  appearance: none;
  border: none;
  padding: 0;
  background: transparent;
  align-items: center;
  padding: 16px 16px 16px 16px;
  cursor: pointer;
  flex-direction: column;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  // flex-shrink: 1;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;

  @media (min-width: 1300px) {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex: unset;
  }
`;
export const RightSection = styled.div`
  background: rgba(255, 255, 255, 0.76);
  border-radius: 101px;
  padding: 10px 32px;
  flex: 1;
  border-radius: 101px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  font-size: 24px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  // flex-shrink: 0;

  @media (min-width: 1300px) {
    flex: unset;
  }
`;
export const Status = styled.div<IStatusProps>`
  color: ${(props) => props.textColor || "#000000"};
  text-align: left;
  text-transform: uppercase;
`;
export const Count = styled.div``;
export const Icon = styled.div``;
export const IconArea = styled.div<IIconAreaProps>`
  height: 36px;
  width: 36px;
  border-radius: 1000px;
  background: ${(props) => props.bgColor || "#000000"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

