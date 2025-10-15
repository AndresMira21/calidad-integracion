import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';

describe('ShoppingCart', () => {
  test('El carrito inicia vacío', () => {
    console.log('Test iniciado: El carrito inicia vacío');
    render(<ShoppingCart />);
    
    console.log('Verificando mensaje de carrito vacío');
    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    
    console.log('Verificando total inicial de $0');
    expect(screen.getByText(/Total: \$0/i)).toBeInTheDocument();
    
    console.log('Test completado exitosamente');
  });

  test('Al agregar un producto, aumenta el total', () => {
    console.log('Test iniciado: Agregar producto aumenta total');
    render(<ShoppingCart />);

    console.log('Obteniendo primer botón de agregar');
    const addButton = screen.getAllByText(/Agregar al carrito/i)[0];
    
    console.log('Haciendo clic en el botón');
    fireEvent.click(addButton);

    console.log('Verificando producto en carrito');
    expect(screen.getByText(/Producto A x 1/i)).toBeInTheDocument();
    
    console.log('Verificando total actualizado');
    expect(screen.getByText(/Total: \$10/i)).toBeInTheDocument();
    
    console.log('Test completado exitosamente');
  });

  test('Eliminar un producto actualiza el total', () => {
    console.log('Test iniciado: Eliminar producto actualiza total');
    render(<ShoppingCart />);

    console.log('Agregando producto al carrito');
    const addButton = screen.getAllByText(/Agregar al carrito/i)[0];
    fireEvent.click(addButton);

    console.log('Buscando botón eliminar');
    const removeButton = screen.getByText(/Eliminar/i);
    
    console.log('Eliminando producto');
    fireEvent.click(removeButton);

    console.log('Verificando carrito vacío');
    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    
    console.log('Verificando total en $0');
    expect(screen.getByText(/Total: \$0/i)).toBeInTheDocument();
    
    console.log('Test completado exitosamente');
  });

  test('Se calcula el precio total correctamente con varios productos', () => {
    console.log('Test iniciado: Cálculo con múltiples productos');
    render(<ShoppingCart />);

    const addButtons = screen.getAllByText(/Agregar al carrito/i);
    
    console.log('Agregando Producto A');
    fireEvent.click(addButtons[0]);
    
    console.log('Agregando Producto B'); 
    fireEvent.click(addButtons[1]);
    
    console.log('Agregando Producto C');
    fireEvent.click(addButtons[2]);
    
    console.log('Agregando Producto A otra vez');
    fireEvent.click(addButtons[0]);

    console.log('Verificando cantidades en carrito');
    expect(screen.getByText(/Producto A x 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto B x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto C x 1/i)).toBeInTheDocument();
    
    console.log('Verificando total final de $70');
    expect(screen.getByText(/Total: \$70/i)).toBeInTheDocument();
  });
});