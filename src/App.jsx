import { useCallback, useRef, useState } from "react";

function App() {
  const [length, setlength] = useState(10);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = [];
    const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*(){}[]+_-`~*";

    let allChars = baseChars;

    if (numAllow) {
      pass.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
      allChars += numberChars;
    }

    if (charAllow) {
      pass.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
      allChars += specialChars;
    }

    while (pass.length < length) {
      pass.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the password
    for (let i = pass.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pass[i], pass[j]] = [pass[j], pass[i]];
    }

    setPassword(pass.join(""));
  }, [length, numAllow, charAllow]);

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
    }
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-xl p-6 shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-center text-white">🔐 Password Generator</h1>

        {/* Password Display */}
        <div className="flex items-center bg-white rounded overflow-hidden">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="flex-grow px-4 py-2 text-black outline-none"
            placeholder="Your password"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-medium"
          >
            Copy
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="length">length: {length}</label>
            <input
              type="range"
              id="length"
              min={5}
              max={20}
              value={length}
              onChange={(e) => setlength(Number(e.target.value))}
              className="w-1/2 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="numbers"
              checked={numAllow}
              onChange={() => setNumAllow((prev) => !prev)}
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="symbols"
              checked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label htmlFor="symbols">Include Special Characters</label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-semibold"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
