import { useState } from "react";

function App() {
  const [dark, setDark] = useState(true);
  const [ans, setAns] = useState("...");
  const [resumeText, setResumeText] = useState("");
  const [jdText, setjdText] = useState("");
  const [impr, setimpr] = useState([]);
  const [just, setjust] = useState([]);

  const fn = () => {
    setAns("Calculating...");
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center py-10 px-4 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* 🔘 Global Theme Toggle Button */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      {/* 🧩 Main Card */}
      <div
        className={`w-full max-w-3xl rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          ATS Score Analyzer
        </h1>

        {/* Resume Input */}
        <label className="block text-sm font-semibold mb-2">Resume</label>
        <textarea
          rows={8}
          placeholder="Paste your resume here"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 mb-4 transition-colors duration-300 ${
            dark
              ? "bg-gray-700 border-gray-600 focus:ring-blue-400 placeholder-gray-400 text-gray-100"
              : "bg-white border-gray-300 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
          }`}
        />

        {/* JD Input */}
        <label className="block text-sm font-semibold mb-2">
          Job Description
        </label>
        <textarea
          rows={8}
          placeholder="Paste the job description here"
          value={jdText}
          onChange={(e) => setjdText(e.target.value)}
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 mb-6 transition-colors duration-300 ${
            dark
              ? "bg-gray-700 border-gray-600 focus:ring-blue-400 placeholder-gray-400 text-gray-100"
              : "bg-white border-gray-300 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
          }`}
        />

        {/* Analyze Button */}
        <button
          onClick={fn}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Analyze Resume
        </button>

        {/* ATS Score */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">ATS Score:</h2>
          <p
            className={`p-3 rounded-lg transition-colors duration-300 ${
              dark ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-700"
            }`}
          >
            {ans || "Calculating..."}
          </p>
        </div>

        {/* Improvements */}
        {impr && impr.length > 0 && (
          <div className="mt-6">
            <h3
              className={`text-lg font-semibold mb-2 ${
                dark ? "text-green-400" : "text-green-700"
              }`}
            >
              Improvements:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {impr.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Justifications */}
        {just && just.length > 0 && (
          <div className="mt-6">
            <h3
              className={`text-lg font-semibold mb-2 ${
                dark ? "text-indigo-400" : "text-indigo-700"
              }`}
            >
              Justification:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {just.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
