import { useState } from 'react';

export default function RandomNumber() {
  const [number, setNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setNumber(newNumber);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Generador de Números Aleatorios</h1>

        <div className="bg-gray-100 rounded-lg p-6 mb-4 min-h-[6rem] flex items-center justify-center">
          {number !== null ? (
            <span className="text-5xl font-bold text-blue-600" data-testid="random-number">
              {number}
            </span>
          ) : (
            <span className="text-gray-400 text-lg">Haz clic para generar</span>
          )}
        </div>

        <button
          onClick={generateRandomNumber}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          data-testid="generate-button"
        >
          Generar Número
        </button>
      </div>
    </div>
  );
}