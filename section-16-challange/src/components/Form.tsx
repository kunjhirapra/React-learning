interface FormProps {
  btnName: string;
  callback: (amount?: number) => void;
  disabled: boolean;
}

function Form({btnName, callback, disabled}: FormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount");
    callback(amount ? Number(amount) : undefined);
    // e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Enter amount..."
        disabled={disabled}
        required
      />

      <button type="submit" disabled={disabled}>
        {btnName}
      </button>
    </form>
  );
}

export default Form;
