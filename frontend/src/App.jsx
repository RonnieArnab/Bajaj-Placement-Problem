import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post(
        "http://localhost:3000/bfhl",
        parsedInput
      );

      console.log(response);
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input or API error");
    }
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

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>REST API Frontend</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <Select isMulti options={options} onChange={setSelectedOptions} />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
