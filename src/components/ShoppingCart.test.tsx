import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';

describe('ShoppingCart', () => {
  test('El carrito inicia vacío', () => {
    render(<ShoppingCart />);

    expect(screen.getByText(/El carrito está vacíoo/i)).toBeInTheDocument();//fallo
    expect(screen.getByText(/Total: \$0/i)).toBeInTheDocument();
  });

  test('Al agregar un producto, aumenta el total', () => {
    render(<ShoppingCart />);

    const addButton = screen.getAllByText(/Agregar al carrito/i)[0];
    fireEvent.click(addButton);

    expect(screen.getByText(/Producto A x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$10/i)).toBeInTheDocument();
  });

  test('Eliminar un producto actualiza el total', () => {
    render(<ShoppingCart />);

    const addButton = screen.getAllByText(/Agregar al carrito/i)[0];
    fireEvent.click(addButto);//fallo

    const removeButton = screen.getByText(/Eliminar/i);
    fireEvent.click(removeButton);

    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$0/i)).toBeInTheDocument();
  });

  test('Se calcula el precio total correctamente con varios productos', () => {
    render(<ShoppingCart />);

    const addButtons = screen.getAllByText(/Agregar al carrito/i);

    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
    fireEvent.click(addButtons[2]);
    fireEvent.click(addButtons[0]);

    expect(screen.getByText(/Producto A x 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto B x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto C x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$70/i)).toBeInTheDocument();
  });
});
