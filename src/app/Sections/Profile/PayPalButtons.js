import React from "react";
import ReactDOM from "react-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import scriptLoader from "react-async-script-loader";
import Button from "components/CustomButtons/Button.js";

const CLIENT = {
  sandbox: process.env.NEXT_PUBLIC_PAYPAL_SANDBOX,
  production: "",
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
      name: "",
      email: "",
      amountPaid: "",
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    if (!this.props.amount) return;
    return actions.order.create({
      purchase_units: [
        {
          description: this.props.description,
          amount: {
            currency_code: "USD",
            value: this.props.amount,
          },
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      console.log("Payment Approved: ", details);
      this.setState({
        showButtons: false,
        paid: true,
        name: details.payer.name.given_name,
        email: details.payer.email_address,
        amountPaid: details.purchase_units[0].amount.value,
      });
      this.props.registerPayments({
        name: `${details.payer.name.given_name} ${details.payer.name.surname}`,
        payer_id: details.payer.payer_id,
        email: details.payer.email_address,
        amount: details.purchase_units[0].amount.value,
        transaction_id: details.purchase_units[0].payments.captures[0].id,
        additional_info: "",
        date: details.update_time,
      });
    });
  };

  onError = (err) => {
    console.log(err);
  };

  render() {
    const { showButtons, loading, paid, name, email, amountPaid } = this.state;

    return (
      <div style={{ margin: "1rem auto", width: "70%" }} className="main">
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
            }}
          >
            <CircularProgress />
          </div>
        )}

        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
              onError={(error) => this.onError(error)}
            />
          </div>
        )}

        {paid && (
          <>
            <h3>
              Thank you {name}! you just paid ${amountPaid} for {this.props.description}.
            </h3>
            <Button onClick={this.props.handleClose} color="danger">
              Close
            </Button>
          </>
        )}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalButton);
