import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../Store/property/actions";
import { getPropertiesSelector } from "../Store/property/selectors";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom'

const propertyId = "1YK15JGO";

export const PropertyPage = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesSelector);
  const property = properties.filter(
    (p: { id: any }) => p["id"] === propertyId
  )[0];

  console.log({ properties, property });

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
        <div style={rowStyle}>
        <h3>Property</h3>
        <Button onClick={()=>{navigate('/')}}>Back to properties</Button>
        </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <div style={rowStyle}>
          <span style={bubbleStyle}>ID</span>
          <span style={bubbleStyle}>{property.id}</span>
        </div>
        <div style={rowStyle}>
          <span style={bubbleStyle}>Name</span>
          <span style={bubbleStyle}>{property.name}</span>
        </div>
        <div style={rowStyle}>
          <span style={bubbleStyle}>Start Rating</span>
          <span style={bubbleStyle}>{property.starRating}</span>
        </div>
        <div style={{ ...bubbleStyle, display: 'flex', flexDirection: "column" }}>
          <b style={{margin: '11px 0px'}}>Adress</b>
          <div style={{...rowStyle, justifyContent: 'space-between'}}>
            <span>City</span>
            <span>{property.city}</span>
          </div>
          <div style={{...rowStyle, justifyContent: 'space-between'}}>
            <span>Country</span>
            <span>{property.country}</span>
          </div>
          <div style={{...rowStyle, justifyContent: 'space-between'}}>
            <span>Street</span>
            <span>{property.addressLine1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-around",
  margin: "13px 3px",
  borderRadius: "9px",
};

const bubbleStyle = {
  padding: "7px",
  background: "white",
  margin: "11px 0px",
  borderRadius: "11px",
};
