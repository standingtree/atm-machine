const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};


const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [fees, setFees] = React.useState(0);
  const [invalidTransactions, setInvalidTransactions] = React.useState(0);

  // ATM model options
  const [atmMode, setAtmMode] = React.useState("");

  let status = `Your Account Balance is currently: $ ${totalState} `;
  console.log(`Account Rendered with isDeposit = ${isDeposit}`);


  React.useEffect(() => FeeAlert(), [fees]);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (Number(event.target.value) <= 0) {
        setValidTransaction(false);
        setFees(fees+1);
        setInvalidTransactions(invalidTransactions+1);
      }
    else if (atmMode === "Cash Back" && Number(event.target.value) > totalState) {
        setValidTransaction(false);
        setFees(fees+1);
        setInvalidTransactions(invalidTransactions+1);
    }
    else {
        setValidTransaction(true);
        setDeposit(Number(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
  };

  const handleModeSelect = (event) => {
      event.preventDefault();
      setAtmMode(event.target.value);
      if (atmMode === "Deposit") {
          setIsDeposit(false);
      }
      else if (atmMode === "Cash Back"){
          setIsDeposit(true);
      }

  };


  const FeeAlert = () => {
      console.log(`Fees updating`);
      return (
          <div className="alert alert-danger" role="alert">
              You have attempted or considered {invalidTransactions} invalid transaction(s). Your account will be charged ${fees}.
          </div>
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
        <label>What would you like to do?</label>
        <br/>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">Deposit</option>
            <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        <br/><br/>

        {
            atmMode && <ATMDeposit onChange={handleChange}
                                   isDeposit={isDeposit}
                                   isValid={validTransaction}></ATMDeposit>
        }

        {
            (fees>0) && <FeeAlert></FeeAlert>
        }

    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
