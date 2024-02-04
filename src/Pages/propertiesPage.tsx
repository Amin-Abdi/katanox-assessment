import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropertiesTable } from "../Components/propertiesTable";
import { getProperties } from "../Store/property/actions";
import { getPropertiesSelector } from "../Store/property/selectors";

export const PropertiesPage = () => {
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesSelector);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h3>Properties</h3>
      <PropertiesTable properties={properties} />
    </div>
  );
};
