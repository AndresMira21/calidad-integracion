import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RandomNumber from "./RandomNumber";

describe("RandomNumber Component", () => {
  test("muestra texto inicial y genera un número determinista al hacer clic", () => {
    render(<RandomNumber />);

    expect(screen.getByText(/Haz clic para generar/i)).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Generar Número/i });

    const originalRandom = Math.random;
    (Math as any).random = jest.fn().mockReturnValue(0.42);

    fireEvent.click(button);

    expect(screen.getByTestId("random-number")).toHaveTextContent("43");

    // Restaurar
    Math.random = originalRandom;
  });

  test("genera valores distintos en clics sucesivos (mock secuencial)", () => {
    render(<RandomNumber />);
    const button = screen.getByRole("button", { name: /Generar Número/i });

    const originalRandom = Math.random;
    const mock = jest.fn();
    mock.mockReturnValueOnce(0.01).mockReturnValueOnce(0.99);
    (Math as any).random = mock;

    fireEvent.click(button);
    expect(screen.getByTestId("random-number")).toHaveTextContent("2");

    fireEvent.click(button);
    expect(screen.getByTestId("random-number")).toHaveTextContent("100");

    Math.random = originalRandom;
  });
});
