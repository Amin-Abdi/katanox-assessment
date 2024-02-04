import { Table } from "antd";
import { Button } from "./common/button";

export const PropertiesTable: React.FC<Properties> = ({
  properties,
}: Properties) => {
  return <Table dataSource={properties} columns={columns} />;
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Actions",
    render: (_: unknown, record: unknown) => <Button>Text</Button>,
  },
];

interface Property {
  name: string;
  id: string;
}

interface Properties {
  properties: Property[];
}
