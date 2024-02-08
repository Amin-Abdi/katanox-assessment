import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../Store/property/actions";
import { getPropertiesSelector } from "../Store/property/selectors";
import { Button, Modal } from "antd";
import { useNavigate, useParams } from 'react-router-dom'
import { Property } from "./property.types";
import '../styles/Property.css'


export const PropertyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesSelector);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { propertyId } = useParams();

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  

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

  const images = property?.images ?? [];


  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div className="navigation">
        <h1>Property</h1>
        <Button style={{marginTop: "1rem"}} onClick={()=>{navigate('/')}}>Back to properties</Button>
      </div>
      <div className="details-container">
          {propertyDetails.map((detail) => (
            <div key={detail.label} className="property-details">
              <p style={{fontSize: "large"}} className="bubbleStyle">{detail.label}:<span style={{marginLeft: '0.5rem', fontWeight: 'bold'}}>{detail.value}</span></p>
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
        <div style={{display: 'flex', flexDirection: "column" }} className="bubbleStyle">
          {propertyAddress.map(address => (
            <div key={address.label} className="address-rows">
            <span>{address.label}</span>
            <span>{address.value}</span>
          </div>
          ))}
        </div>
      </div>
      <div className="images-container">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Image_${image.id}`}
            className="image-item"
            onClick={() => handleImageClick(image.url)}
          />
        ))}
      </div>
      <Modal
        title="Image"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <img src={selectedImage} alt="Selected_Image" className="modal-image" />
      </Modal>
      <Button onClick={()=>{navigate(`/policies/${propertyId}`)}} className="policies-btn">See property policies</Button>
    </div>
  );
};