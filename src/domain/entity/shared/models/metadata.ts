interface DataSource {
  name: string;
  imageUrl: string | null;
  connectedAt: string;
  createdBy: string | null;
}

type Metadata = {
  metadata: {
    currency?: string;
    description?: string;
    dataSources: DataSource[];
  };
};

export type { Metadata };
