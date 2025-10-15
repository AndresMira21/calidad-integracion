import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';

describe('RegisterForm Component', () => {
  test('muestra el formulario, valida inputs y muestra confirmación al enviar', () => {
    render(<RegisterForm />);

    // Form inicial
    expect(screen.getByTestId('registration-form')).toBeInTheDocument();

    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;
    expect(submit).toBeDisabled();

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Juan' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });

    expect(nameInput.value).toBe('Juan');
    expect(emailInput.value).toBe('juan@example.com');
    expect(submit).not.toBeDisabled();

    fireEvent.click(submit);

    expect(screen.getByTestId('confirmation-message')).toBeInTheDocument();
    expect(screen.getByTestId('confirmed-name')).toHaveTextContent('Juan');
    expect(screen.getByTestId('confirmed-email')).toHaveTextContent('juan@example.com');

    // Nuevo registro
    const newBtn = screen.getByTestId('new-registration-button');
    fireEvent.click(newBtn);
    expect(screen.getByTestId('registration-form')).toBeInTheDocument();
  });

  test('no permite enviar si los campos están vacíos', () => {
    render(<RegisterForm />);
    const submit = screen.getByTestId('submit-button') as HTMLButtonElement;
    expect(submit).toBeDisabled();

    fireEvent.click(submit);
    expect(screen.queryByTestId('confirmation-message')).toBeNull();
  });
});
