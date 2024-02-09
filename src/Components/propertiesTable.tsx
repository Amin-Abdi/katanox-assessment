import { Table } from "antd";
import { Button } from "./common/Button";

export const PropertiesTable: React.FC<Properties> = ({
  properties,
}: Properties) => {
  return <Table dataSource={properties} columns={columns} rowKey="id"/>;
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
    render: (_: unknown, record: Property) => <Button propertyId={record.id}>See more</Button>,
  },
];

interface Property {
  name: string;
  id: string;
}

interface Properties {
  properties: Property[];
}
