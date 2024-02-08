import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../Store/property/actions";
import { getPropertiesSelector } from "../Store/property/selectors";
import { Button } from "antd";
import { useNavigate, useParams } from 'react-router-dom'
import { Property } from "./property.types";
import '../styles/Property.css'


export const PropertyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesSelector);

  const { propertyId } = useParams();

  const property: Property = properties.filter(
    (p: { id: any }) => p["id"] === propertyId
  )[0];

  const propertyAddress = property
  ? [
      { label: 'City', value: property.city },
      { label: 'Country', value: property.country },
      { label: 'Street', value: property.addressLine1 },
    ]
  : [];

  const propertyDetails = property
  ? [
      { label: 'ID', value: property.id },
      { label: 'Name', value: property.name },
      { label: 'Star Rating', value: property.starRating },
    ]
  : [];

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div style={{...rowStyle, marginTop: '1rem'}}>
        <h1>Property</h1>
        <Button style={{marginTop: "1rem"}} onClick={()=>{navigate('/')}}>Back to properties</Button>
      </div>
      <div className="details-container">
          {propertyDetails.map((detail) => (
            <div key={detail.label} className="property-details">
              <p style={{...bubbleStyle, fontSize: "large"}}>{detail.label}:<span style={{marginLeft: '0.5rem', fontWeight: 'bold'}}>{detail.value}</span></p>
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
       
        <b style={{margin: '11px 0px'}}>Adress</b>
        <div style={{ ...bubbleStyle, display: 'flex', flexDirection: "column" }}>
          {propertyAddress.map(address => (
            <div key={address.label} style={{...rowStyle, justifyContent: 'space-between'}}>
            <span>{address.label}</span>
            <span>{address.value}</span>
          </div>
          ))}
        </div>
      </div>
      <Button onClick={()=>{navigate(`/policies/${propertyId}`)}}>See property policies</Button>
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
