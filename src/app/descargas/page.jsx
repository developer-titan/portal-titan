"use client";

export default function DescargasPage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/files/app-tracking.apk';
    link.download = 'app-tracking.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Descargas</h1>
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-2">App Tracking</p>
          <p className="text-sm text-gray-500">app-tracking.apk</p>
        </div>
        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Descargar APK
        </button>
      </div>
    </div>
  );
}
