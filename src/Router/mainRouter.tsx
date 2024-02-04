import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PropertiesPage } from "../Pages/propertiesPage";
import { PropertyPage } from "../Pages/propertyPage";
import Navbar from "../Components/common/navbar";

const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<PropertiesPage />} />
        <Route path='/property' element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
