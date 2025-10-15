import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomNumber from './RandomNumber';

describe('RandomNumber Component', () => {
  test('muestra texto inicial y genera un número determinista al hacer clic', () => {
    render(<RandomNumber />);

    expect(screen.getByText(/Haz clic para generar/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Generar Número/i });

    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.42);

    try {
      fireEvent.click(button);
      expect(screen.getByTestId('random-number')).toHaveTextContent('43');
    } finally {
      spy.mockRestore();
    }
  });

  test('genera valores distintos en clics sucesivos (mock secuencial)', () => {
    render(<RandomNumber />);
    const button = screen.getByRole('button', { name: /Generar Número/i });

    const spy = jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.99);

    try {
      fireEvent.click(button);
      expect(screen.getByTestId('random-number')).toHaveTextContent('2');

      fireEvent.click(button);
      expect(screen.getByTestId('random-number')).toHaveTextContent('100');
    } finally {
      spy.mockRestore();
    }
  });
});
