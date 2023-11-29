import { Avatar, Tooltip } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

import {
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { AvatarWithBackground } from "../../../atoms/avatar";
import { SimpleBadge } from "../../../atoms/badge";

interface ISearchIcon {
  type: "search";
}
interface IQuestionIcon {
  type: "question";
}
interface IBellIcon {
  type: "bell";
  badgeCount?: number | null;
}
interface IAvatarIcon {
  type: "avatar";
  name: string;
  imageSource: string;
}

export type HeaderIconProps = { onClick?: (props: unknown) => void } & (
  | IQuestionIcon
  | IAvatarIcon
  | IBellIcon
  | ISearchIcon
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  > span,
  svg {
    font-size: ${({ theme }) => theme.typography.SIZES.SM};
    height: ${({ theme }) => theme.typography.SIZES.SM};
    width: ${({ theme }) => theme.typography.SIZES.SM};
    color: ${({ theme }) => theme.palette.text.PRIMARY};
  }
  > * {
    :not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing.LARGE};
    }
  }
`;

const AvatarAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  .ant-avatar-group .ant-avatar:not(:first-child) {
    margin-left: -5px;
  }
`;

export const HeaderIcons = ({
  data = [],
  others = [],
}: {
  data?: HeaderIconProps[];
  others?: any[];
}): ReactElement => {
  const AvatarColorMap = JSON.parse(
    localStorage.getItem("avatar_color_map") || "{}"
  );
  return (
    <Wrapper>
      {data.map(
        (props: HeaderIconProps): ReactElement => {
          switch (props.type) {
            case "search":
              return (
                <SearchOutlined key={props.type} onClick={props.onClick} />
              );
            case "question":
              return (
                <QuestionCircleOutlined
                  key={props.type}
                  onClick={props.onClick}
                />
              );
            case "avatar":
              return (
                <AvatarAndNameWrapper onClick={props.onClick}>
                  <Avatar.Group>
                    {others.map(({ presence }) => {
                      if (presence != null && presence?.name) {
                        return (
                          <Tooltip placement="left" title={presence.name}>
                            <Avatar
                              style={{
                                color: "black",
                                backgroundColor:
                                  AvatarColorMap[presence.name] || "lightGrey",
                                transition: "background-color 1000ms linear",
                                cursor: "default",
                              }}
                            >
                              {presence.name
                                .match(/(\b\S)?/g)
                                .join("")
                                .match(/(^\S|\S$)?/g)
                                .join("")
                                .toUpperCase()}
                            </Avatar>
                          </Tooltip>
                        );
                      }
                      return null;
                    })}
                  </Avatar.Group>
                  {/* Commenting out the man avatar
                    
                    <Tooltip placement="left" title="You">
                      <AvatarWithBackground src={props.imageSource} />
                    </Tooltip> 
                    
                    */}
                </AvatarAndNameWrapper>
              );
            case "bell":
              return (
                <SimpleBadge count={props.badgeCount} key={props.type}>
                  <BellOutlined onClick={props.onClick} />
                </SimpleBadge>
              );
            default:
              // TODO:LOGGER
              throw new Error(
                "Unexpected Value in header icons. This should have never been called"
              );
          }
        }
      )}
    </Wrapper>
  );
};
