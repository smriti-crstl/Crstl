import { memo } from "react";

interface PublicProps {
  url?: string;
  width?: string;
  height?: string;
  onLoad?: () => void;
}

const DocumentViewerInternal: React.FC<PublicProps> = ({
  url,
  width = "100%",
  height = "65vh",
  onLoad,
}) => {
  if (!url) {
    return null;
  }

  return (
    <object
      data={url}
      type="application/pdf"
      width={width}
      style={{ height }}
      onLoad={onLoad}
    >
      <p>
        <a href={url} target="_blank" rel="noreferrer">
          Document
        </a>
      </p>
    </object>
  );
};

export const DocumentViewer = memo(DocumentViewerInternal, (prev, next) => {
  return prev.url === next.url;
});

