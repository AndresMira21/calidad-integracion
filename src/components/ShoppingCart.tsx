import React, { useState } from 'react';

interface Product {
	id: number;
	name: string;
	price: number;
}

interface CartItem extends Product {
	quantity: number;
}

const PRODUCTS: Product[] = [
	{ id: 1, name: 'Producto A', price: 10 },
	{ id: 2, name: 'Producto B', price: 20 },
	{ id: 3, name: 'Producto C', price: 30 },
	{ id: 4, name: 'Producto D', price: 40 },
	{ id: 5, name: 'Producto E', price: 50 },
];

const ShoppingCart: React.FC = () => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (product: Product) => {
		setCart((prevCart) => {
			const existing = prevCart.find((item) => item.id === product.id);
			if (existing) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId: number) => {
		setCart((prevCart) =>
			prevCart
				.map((item) =>
					item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
				)
				.filter((item) => item.quantity > 0)
		);
	};

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8">
			<h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
				🛒 Carrito de Compras
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Productos</h3>
					<ul className="space-y-3">
						{PRODUCTS.map((product) => (
							<li key={product.id} className="flex items-center justify-between bg-blue-50 dark:bg-blue-900 rounded px-4 py-2">
								<span className="font-medium text-gray-800 dark:text-gray-100">{product.name}</span>
								<span className="text-blue-600 dark:text-blue-300 font-bold">${product.price}</span>
								<button
									className="ml-4 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow transition"
									onClick={() => addToCart(product)}
									data-testid={`add-${product.id}`}
								>
									Agregar al carrito
								</button>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Carrito</h3>
					{cart.length === 0 ? (
						<p className="text-gray-500 dark:text-gray-400 italic">El carrito está vacío.</p>
					) : (
						<ul className="space-y-3">
							{cart.map((item) => (
								<li key={item.id} className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900 rounded px-4 py-2">
									<span className="font-medium text-gray-800 dark:text-gray-100">{item.name} x {item.quantity}</span>
									<span className="text-yellow-700 dark:text-yellow-300 font-bold">${item.price * item.quantity}</span>
									<button
										className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow transition"
										onClick={() => removeFromCart(item.id)}
										data-testid={`remove-${item.id}`}
									>
										Eliminar
									</button>
								</li>
							))}
						</ul>
					)}
					<div className="mt-4 text-right">
						<span className="text-xl font-bold text-purple-700 dark:text-purple-300">Total: ${total}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
