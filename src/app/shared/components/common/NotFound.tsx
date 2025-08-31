"use client";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-xl border border-blue-100">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-blue-700 drop-shadow-sm">
          Page Not Found (404)
        </h1>
        <p className="text-gray-600 text-center text-lg">
          Sorry, the page you are looking for does not exist.
          <br />
          Please check the URL or return to the homepage.
        </p>
      </div>
    </div>
  );
}
