import './button.css';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    children: React.ReactNode;
    propertyId: string;
}

export const Button: React.FC<ButtonProps> = ({children, propertyId}) => {
    const navigate = useNavigate();
    return (
        <button data-test={`navigate-button-${propertyId}`} className="button-arounder" data-testid="button" onClick={()=>{navigate(`/property/${propertyId}`)}}>
            {children}
        </button>
    )
}