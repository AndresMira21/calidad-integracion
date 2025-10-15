import { useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: '', email: '' });

  const isFormValid = name.trim() !== '' && email.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid) {
      setSubmittedData({ name, email });
      setSubmitted(true);
      setName('');
      setEmail('');
    }
  };

  const handleNewRegistration = () => {
    setSubmitted(false);
    setSubmittedData({ name: '', email: '' });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Formulario de Registro
        </h1>
        <p className="text-sm text-slate-600 mb-4">Completa tus datos para registrarte</p>

        {!submitted ? (
          <div data-testid="registration-form">
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-700 font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition"
                data-testid="name-input"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition"
                data-testid="email-input"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 ${
                !isFormValid
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 active:scale-95'
              }`}
              data-testid="submit-button"
            >
              Registrar
            </button>
          </div>
        ) : (
          <div className="text-center" data-testid="confirmation-message">
            <div className="mb-4">
              <div className="text-6xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">¡Registro Exitoso!</h2>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                <p className="text-slate-700 mb-2">
                  <span className="font-semibold">Nombre:</span>{' '}
                  <span data-testid="confirmed-name">{submittedData.name}</span>
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold">Email:</span>{' '}
                  <span data-testid="confirmed-email">{submittedData.email}</span>
                </p>
              </div>
              <p className="text-slate-600 text-sm mb-4">Hemos recibido tu información correctamente</p>
            </div>
            <button
              onClick={handleNewRegistration}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              data-testid="new-registration-button"
            >
              Nuevo Registro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}