import React, {useState} from "react";
import "./index.css";

function App() {
  return (
    <>
      <TipCalculator />
    </>
  );
}

function TipCalculator() {
  const [billAmount, setBillAmount] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  const totalTip = (tip1 + tip2) / 2;
  const total = billAmount * (1 + totalTip / 100);

  function resetCalculator() {
    setBillAmount(0);
    setTip1(0);
    setTip2(0);
  }
  return (
    <div>
      <BillInput billAmount={billAmount} onSetBillAmount={setBillAmount} />
      <TipAmount name="tip1" tip={tip1} onTipChange={setTip1}>
        <p>How did you like the service and food?</p>
      </TipAmount>
      <TipAmount name="tip2" tip={tip2} onTipChange={setTip2}>
        <p>How did your friend like the service and food?</p>
      </TipAmount>
      {billAmount > 0 && (
        <>
          <TotalAmount billAmount={billAmount} tip={totalTip} total={total} />
          <Reset handleReset={resetCalculator} />
        </>
      )}
    </div>
  );
}
function BillInput({
  billAmount,
  onSetBillAmount,
}: {
  billAmount: number;
  onSetBillAmount: (amount: number) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      onSetBillAmount(numericValue);
    } else if (value === "") {
      onSetBillAmount(0);
    }
  };

  return (
    <div>
      <h3>How much was the bill?</h3>
      <input
        type="number"
        value={billAmount}
        onChange={handleChange}
        placeholder="Enter bill amount"
        min="0"
        step="1"
      />
    </div>
  );
}
function Reset({handleReset}: {handleReset: () => void}) {
  return (
    <div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
function TotalAmount({
  billAmount,
  tip,
  total,
}: {
  billAmount: number;
  tip: number;
  total: number;
}) {
  return (
    <div>
      <h3>
        You pay ${total.toFixed(2)} (${billAmount} + $
        {((billAmount * tip) / 100).toFixed(2)} tip)
      </h3>
    </div>
  );
}

function TipAmount({
  name,
  tip,
  children,
  onTipChange,
}: {
  name: string;
  tip: number;
  children: React.ReactNode;
  onTipChange: (tip: number) => void;
}) {
  return (
    <div>
      <h3>{children}</h3>
      <select
        name={name}
        id={name}
        value={tip}
        onChange={(e) => onTipChange(Number(e.target.value))}>
        <option value="0">Dissattisfied(0%)</option>
        <option value="5">It was Okay(5%)</option>
        <option value="10">It was good(10%)</option>
        <option value="20">It was Amazing(20%)</option>
      </select>
    </div>
  );
}
export default App;
