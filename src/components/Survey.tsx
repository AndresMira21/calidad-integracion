import { useState } from 'react';

export default function Survey() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating !== null) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setRating(null);
    setSubmitted(false);
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Encuesta de Satisfacción
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          ¿Qué tan satisfecho estás con nuestro servicio?
        </p>

        {!submitted ? (
          <div data-testid="survey-form">
            <div className="space-y-4 mb-4">
              {stars.map((star) => (
                <label
                  key={star}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    rating === star
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                  data-testid={`rating-option-${star}`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => setRating(star)}
                    className="w-5 h-5 text-blue-600"
                    data-testid={`rating-radio-${star}`}
                  />
                  <span className="ml-3 flex items-center">
                    <span className="text-2xl mr-2">
                      {'⭐'.repeat(star)}
                    </span>
                    <span className="text-gray-700 font-medium">
                      {star} {star === 1 ? 'estrella' : 'estrellas'}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={rating === null}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 ${
                rating === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 active:scale-95'
              }`}
              data-testid="submit-button"
            >
              Enviar Encuesta
            </button>
          </div>
        ) : (
          <div className="text-center" data-testid="confirmation-message">
            <div className="mb-4">
              <div className="text-6xl mb-2">✅</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Gracias por tu opinión!
              </h2>
              <p className="text-gray-600 mb-1">
                Has enviado tu encuesta con una puntuación de:
              </p>
              <div className="text-4xl font-bold text-blue-600 mb-4" data-testid="submitted-rating">
                {rating} {rating === 1 ? 'estrella' : 'estrellas'} ⭐
              </div>
            </div>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              data-testid="reset-button"
            >
              Nueva Encuesta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}