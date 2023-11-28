import React from "react";
import { Steps, Button, message } from "antd";
import { Container, Header } from "./TimelinePage.styles";
import {
  BankOutlined,
  FileTextOutlined,
  ShopOutlined,
  SlackOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const steps = [
  {
    title: "Step 1",
    content: "Step 1 content",
    icon: <ShopOutlined />,
  },
  {
    title: "Step 2",
    content: "Step 2 content",
    icon: <FileTextOutlined />,
  },
  {
    title: "Step 3",
    content: "Step 3 content",
    icon: <BankOutlined />,
  },
  {
    title: "Step 4",
    content: "Step 4 content",
    icon: <SlackOutlined />,
  },
];

function StepsSection() {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Container>
      <Header>Steps</Header>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </Container>
  );
}

export { StepsSection };
