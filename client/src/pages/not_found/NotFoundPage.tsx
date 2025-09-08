
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Stranica nije pronađena.</p>
      <a href="/" className="text-blue-600 hover:underline">
        Vrati se na početnu stranicu
      </a>
    </div>
  );
};