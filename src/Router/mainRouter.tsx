import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PropertiesPage } from "../Pages/propertiesPage";
import { PropertyPage } from "../Pages/propertyPage";
import { PoliciesPage } from "../Pages/policiesPage";
import Navbar from "../Components/common/navbar";

const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<PropertiesPage />} />
        <Route path='/property/:propertyId' element={<PropertyPage />} />
        <Route path='/policies/:propertyId' element={<PoliciesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
