import './button.css'
import { useNavigate } from 'react-router-dom'

export const Button = ({children}) => {
    const navigate = useNavigate()
    return (
        <button className="button-arounder" data-testid="button" onClick={()=>{navigate('/property')}}>
            {children}
        </button>
    )
}