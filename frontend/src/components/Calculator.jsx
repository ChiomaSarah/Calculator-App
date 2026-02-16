import { useState } from "react";
import Button from "@mui/material/Button";
import HistoryModal from "./HistoryModal";

const Calculator = () => {
  const [arithmeticFunction, setArithmeticFunction] = useState("");
  const [error, setError] = useState("");

  const calculate = (value) => {
    setError("");
    if (value === "AC") {
      setArithmeticFunction("");
    } else if (value === "DEL") {
      setArithmeticFunction(arithmeticFunction.slice(0, -1));
    } else {
      setArithmeticFunction(arithmeticFunction + value);
    }
  };

  const handleTotal = async () => {
    setError("");
    if (!arithmeticFunction.trim()) {
      setError("Please enter an expression!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}/calculate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ arithmeticFunction }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Aritmetic failed!");
      }

      setArithmeticFunction(data.result);
    } catch (err) {
      setError(err.message || "Network error... Please try again.");
    }
  };

  // Transform for display symbols.
  const displayValue = arithmeticFunction
    .replace(/\//g, "÷")
    .replace(/\*/g, "×");

  return (
    <>
      <div className="container">
        <div id="calculator">
          <input
            type="text"
            id="output"
            placeholder="0"
            value={error ? `Error: ${error}` : displayValue}
            readOnly
            style={{
              color: error ? "#d32f2f" : "inherit",
              textAlign: error ? "center" : "right",
              fontSize: error ? "0.8rem" : "1.5rem",
            }}
          />

          <HistoryModal />
          <Button onClick={() => calculate("AC")}>AC</Button>
          <Button onClick={() => calculate("DEL")}>DEL</Button>
          <Button onClick={() => calculate("/")}>&divide;</Button>
          <Button onClick={() => calculate("7")}>7</Button>
          <Button onClick={() => calculate("8")}>8</Button>
          <Button onClick={() => calculate("9")}>9</Button>
          <Button onClick={() => calculate("*")}>&times;</Button>
          <Button onClick={() => calculate("4")}>4</Button>
          <Button onClick={() => calculate("5")}>5</Button>
          <Button onClick={() => calculate("6")}>6</Button>
          <Button onClick={() => calculate("-")}>&ndash;</Button>
          <Button onClick={() => calculate("1")}>1</Button>
          <Button onClick={() => calculate("2")}>2</Button>
          <Button onClick={() => calculate("3")}>3</Button>
          <Button onClick={() => calculate("+")}>+</Button>
          <Button onClick={() => calculate("0")}>0</Button>
          <Button onClick={() => calculate(".")}>.</Button>
          <Button onClick={handleTotal} data-testid="result" id="result">
            =
          </Button>
        </div>
      </div>
    </>
  );
};

export default Calculator;
