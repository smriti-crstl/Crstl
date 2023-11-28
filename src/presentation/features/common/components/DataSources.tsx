import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Avatar, List, Popover } from "antd";
import { Metadata } from "domain/entity/shared/models/metadata";
import { parseISO, format } from "date-fns";

type Props = {
  metadata: Metadata["metadata"];
};

const StyledPopover = styled(Popover)`
  margin-right: -12px;
`;

const StyledInfoIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledTitle = styled.p`
  font-weight: normal;
  margin: 0;
  padding-top: 11px;
  padding-bottom: 11px;
`;

const StyledDescription = styled.p`
  font-weight: 500;
`;

const StyledInfoCircleOutlined = styled(InfoCircleOutlined)`
  margin-left: 12px;
  margin-right: 12px;
  color: #939393;
  cursor: pointer;
`;

const Description = ({ createdBy = "", createdAt = "" }) => {
  return (
    <p>
      Added by {createdBy} <br /> on {createdAt}
    </p>
  );
};

function DataSources({ metadata }: Props) {
  const dataSourceTitle =
    metadata.dataSources?.length > 1 ? "Data sources" : "Data source";
  return (
    <StyledPopover
      placement="bottomRight"
      title={
        metadata.description ? (
          <StyledTitle>{metadata.description}</StyledTitle>
        ) : (
          dataSourceTitle
        )
      }
      content={
        <>
          {metadata.description ? (
            <StyledDescription>{dataSourceTitle}</StyledDescription>
          ) : null}
          <List
            itemLayout="horizontal"
            dataSource={metadata.dataSources}
            renderItem={(item) => {
              const createdAt = parseISO(item.connectedAt);
              const formattedDate = format(createdAt, "MMMM d, yyyy, h:mmaaa");

              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.imageUrl} />}
                    title={item.name}
                    description={
                      <Description
                        createdBy={item.createdBy ?? ""}
                        createdAt={formattedDate}
                      />
                    }
                  />
                </List.Item>
              );
            }}
          />
        </>
      }
      overlayClassName="data-source-overlay-container"
      trigger="hover"
    >
      <StyledInfoIcon>
        <StyledInfoCircleOutlined />
      </StyledInfoIcon>
    </StyledPopover>
  );
}

export { DataSources };
