import {
  FileDoneOutlined,
  FileTextOutlined,
  LikeOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { DocumentTitle } from "models/v1/edi/EdiDocuments";

interface PublicProps {
  stepTitle: DocumentTitle;
}

// TODO: find a way to extend AntDIconProps in a more scalable manner
const iconProps = {
  width: 18,
  height: 18,
  style: {
    fontSize: 18,
  },
};

export const WorkflowStepIcon: React.FC<PublicProps> = ({ stepTitle }) => {
  switch (stepTitle) {
    case DocumentTitle.PurchaseOrder:
      return <FileTextOutlined {...iconProps} />;
    case DocumentTitle.Acknowledgement:
      return <LikeOutlined {...iconProps} />;
    case DocumentTitle.Shipment:
      return <RocketOutlined {...iconProps} />;
    case DocumentTitle.Invoice:
      return <FileDoneOutlined {...iconProps} />;
    case DocumentTitle.RTS:
      return <RocketOutlined {...iconProps} />;
    default:
      return <FileTextOutlined {...iconProps} />;
  }
};
