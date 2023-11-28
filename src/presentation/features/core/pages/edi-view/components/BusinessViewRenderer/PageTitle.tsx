interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  if (!title) {
    return null;
  }

  return <h2>{title}</h2>;
};

