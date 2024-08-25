import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css"; // Import custom styles
import ClipLoader from "react-spinners/ClipLoader";
function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post(
        "http://localhost:3000/bfhl",
        parsedInput
      );
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input or API error");
    }
    setLoading(false); // Stop loading
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    const filteredResponse = {};

    selectedOptions.forEach((option) => {
      if (option.value === "numbers") filteredResponse.numbers = numbers;
      if (option.value === "alphabets") filteredResponse.alphabets = alphabets;
      if (option.value === "highest_lowercase_alphabet")
        filteredResponse.highest_lowercase_alphabet =
          highest_lowercase_alphabet;
    });

    return (
      <div className="filtered-response">
        {selectedOptions.map((option) => (
          <div key={option.value}>
            <strong>{option.label}:</strong>{" "}
            {filteredResponse[option.value]?.join(", ")}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>REST API Frontend</h1>
      <div className="input-container">
        <label>API Input</label>
        <input
          type="text"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data":["M","1","334","4","B"]}'
        />
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}>
        {loading ? <ClipLoader size={20} color={"#ffffff"} /> : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <div className="select-container">
            <label>Multi Filter</label>
            <Select isMulti options={options} onChange={setSelectedOptions} />
          </div>
          <div className="response-container">
            <h2>Filtered Response</h2>
            {renderResponse()}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
