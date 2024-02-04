import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Properties",
    key: 'properties'
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/')
  };
  return (
    <Menu
      onClick={onClick}
      mode='horizontal'
      items={items}
    />
  );
};

export default Navbar;
