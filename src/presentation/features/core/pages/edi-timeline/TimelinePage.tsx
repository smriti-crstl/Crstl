import {
  CarOutlined,
  CheckCircleFilled,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { List, Timeline } from "antd";
import { StepsSection } from "./StepsSection";
import {
  Container,
  Header,
  PageWrapper,
  TimelineStatus,
  TimelineStyles,
} from "./TimelinePage.styles";

function TimelinePage() {
  return (
    <PageWrapper>
      <Container>
        <Header>Related Documents</Header>
        <TimelineStyles>
          <Timeline>
            <Timeline.Item dot={<FileTextOutlined />}>
              <List
                itemLayout="horizontal"
                dataSource={[{ title: "Order" }, { title: "" }]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <div>
                          <p>
                            <a href="/">3696632</a>
                          </p>
                          <TimelineStatus>
                            <CheckCircleFilled />
                            Complete
                          </TimelineStatus>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Timeline.Item>
            <Timeline.Item dot={<CarOutlined />}>
              <List
                itemLayout="horizontal"
                dataSource={[{ title: "Shipment" }]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <div>
                          <p>
                            <a href="/">106</a>
                          </p>
                          <TimelineStatus>
                            <CheckCircleFilled />
                            Complete
                          </TimelineStatus>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Timeline.Item>
            <Timeline.Item dot={<CreditCardOutlined />}>
              <List
                itemLayout="horizontal"
                dataSource={[{ title: "Invoice" }]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <div>
                          <p>
                            <a href="/">NEURO-1054</a>
                          </p>
                          <TimelineStatus>
                            <CheckCircleFilled />
                            Complete
                          </TimelineStatus>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Timeline.Item>
          </Timeline>
        </TimelineStyles>
      </Container>
      <StepsSection />
    </PageWrapper>
  );
}

export default TimelinePage;
