import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Survey from './Survey';

describe('Survey Component', () => {
  test('renderiza formulario inicial, permite seleccionar rating y enviar', () => {
    render(<Survey />);

    expect(screen.getByTestId('survey-formm')).toBeInTheDocument();// fallo

    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;
    expect(submit).toBeDisabled();

    // Seleccionar rating 4
    const radio4 = screen.getByTestId('rating-radio-4') as HTMLInputElement;
    fireEvent.click(radio4);
    expect(radio4).toBeChecked();
    expect(submit).not.toBeDisabled();

    fireEvent.click(submit);

    expect(screen.getByTestId('confirmation-message')).toBeInTheDocument();
    expect(screen.getByTestId('submitted-rating')).toHaveTextContent('4');

    // Reiniciar
    const reset = screen.getByTestId('reset-button');
    fireEvent.click(rese); //fallo
    expect(screen.getByTestId('survey-form')).toBeInTheDocument();
  });

  test('no permite enviar sin seleccionar rating', () => {
    render(<Survey />);
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;
    expect(submit).toBeDisabled();

    fireEvent.click(submit);

    expect(screen.queryByTestId('confirmation-message')).toBeNull();
  });
});
