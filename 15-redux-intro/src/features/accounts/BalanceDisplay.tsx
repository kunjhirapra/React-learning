// import {useSelector} from "react-redux";
import {connect} from "react-redux";
import type {RootState} from "../../store";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({balance}: {balance: number}) {
  // modern way
  // const balance = useSelector((store: RootState) => store.account.balance);

  // old way

  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state: RootState) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
