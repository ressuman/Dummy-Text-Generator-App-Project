import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Text } from "./components/Controls/Text/Text";
import { Output } from "./components/Output/Output";

function App() {
  const [paras, setParas] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showOutput = !loading && !error;

  const getSampleText = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_HIPSTER_URL,
        {
          params: {
            type: import.meta.env.VITE_REACT_APP_HIPSTER_TYPE,
            paras: paras,
          },
        }
      );
      setText(response.data.toString());
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSampleText();
  }, [paras]);

  const handleChangeParas = (value) => {
    const newValue = parseInt(value, 10);
    setParas(isNaN(newValue) ? 0 : newValue);
  };

  return (
    <div className="App container">
      <h1 className="text-center"> Sample Dummy Text Generator</h1>
      <hr />
      <form className="form-inline">
        <div className="form-group">
          <Text value={paras} onChange={handleChangeParas} />
          <label htmlFor="paras" className="form-label mt-4">
            Paragraphs:
          </label>
          <select
            className="form-select"
            id="paras"
            value={paras}
            onChange={(e) => handleChangeParas(e.target.value)}
          >
            {[5, 10, 20, 30, 50, 75, 100].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>
      <br />
      <br />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {showOutput && <Output text={text} value={paras} />}
    </div>
  );
}

export default App;
