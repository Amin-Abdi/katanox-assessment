import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';
import { useNavigate, NavigateFunction } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Button component', () => {
  const propertyId = 'test123';


  it('renders button with correct text', () => {
    const buttonText = 'Test';
    const {getByTestId} = render(<Button propertyId={propertyId}>{buttonText}</Button>);
    
    (useNavigate as jest.Mock).mockResolvedValue(jest.fn() as NavigateFunction);

    const btnElement = screen.getByText(buttonText);
    const button = getByTestId('button');
    
    expect(btnElement).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText);
  });

  it('Calls the navifate function with the correct id when clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock as NavigateFunction);

    const { getByTestId } = render(<Button propertyId={propertyId}>Click me</Button>);
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith(`/property/${propertyId}`);
  })
});
