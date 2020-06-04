import React from "react";
import "./App.css";

var updated = false;
var isOther = false;

const networths = {
  "Jeff Bezos": 113000000000,
  "Mark Zuckerberg": 54700000000,
  "Alice Walton": 54400000000,
  "Warren Buffett": 67500000000,
  "Larry Page": 64400000000,
  "Elon Musk": 37200000000,
  "Bill Gates": 98000000000,
  "Jack Dorsey": 4800000000,
  "Meg Whitman": 4700000000,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBillionaire: "Jeff Bezos",
      selectedBillionaireHourlyPay: 4474885,
      yourIncome: 0,
      yourDonation: 0,
      incomeType: "hourly",
      equivalent: 0,
      otherIncomeType: "hourly",
    };
    this.onIncomeChange = this.onIncomeChange.bind(this);
    this.onIncomeTypeChange = this.onIncomeTypeChange.bind(this);
    this.onBillionaireChange = this.onBillionaireChange.bind(this);
    this.onDonationChange = this.onDonationChange.bind(this);
    this.calculateAmount = this.calculateAmount.bind(this);
  }

  onIncomeChange(e) {
    this.setState({
      yourIncome: e.target.value,
    });
    updated = false;
    return;
  }

  onIncomeChangeOther(e) {
    if (e.target.value === "annual") {
      this.setState({
        selectedBillionaireHourlyPay: parseInt(e.target.value) / (52 * 40),
      });
    } else if (e.target.value === "networth") {
      this.setState({
        selectedBillionaireHourlyPay: e.target.value,
      });
    }
    updated = false;
    return;
  }

  onIncomeTypeChange(e) {
    this.setState({
      incomeType: e.target.value,
    });
    updated = false;
    return;
  }

  onIncomeTypeChangeOther(e) {
    this.setState({
      otherIncomeType: e.target.value,
    });
    updated = false;
    return;
  }

  onBillionaireChange(e) {
    if (
      e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text !== "Other"
    ) {
      this.setState({
        selectedBillionaire:
          e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
        selectedBillionaireHourlyPay: e.target.value,
      });
      isOther = false;
    } else {
      this.setState({
        selectedBillionaire:
          e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
        selectedBillionaireHourlyPay: 0,
      });
      isOther = true;
    }
    updated = false;
    return;
  }

  onDonationChange(e) {
    this.setState({
      yourDonation: e.target.value,
    });
    updated = false;
    return;
  }

  componentDidUpdate() {
    if (!updated) {
      this.setState({
        equivalent: this.calculateAmount(),
      });
      updated = true;
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  calculateAmount() {
    if (isOther) {
      if (this.state.incomeType === "hourly" && this.state.yourIncome > 0) {
        var yourYearlyIncome = this.calculateYearlyAmount(
          this.state.yourIncome
        );
        var theirYearlyIncome = this.calculateYearlyAmount(
          this.state.selectedBillionaireHourlyPay
        );

        var percentageOfYourIncome = this.state.yourDonation / yourYearlyIncome;
        console.log(percentageOfYourIncome * theirYearlyIncome);
        return this.numberWithCommas(
          Math.floor(percentageOfYourIncome * theirYearlyIncome)
        );
      }
    } else {
      if (this.state.incomeType === "hourly" && this.state.yourIncome > 0) {
        var yourYearlyIncome = this.calculateYearlyAmount(
          this.state.yourIncome
        );
        var theirYearlyIncome = this.calculateYearlyAmount(
          this.state.selectedBillionaireHourlyPay
        );

        var percentageOfYourIncome = this.state.yourDonation / yourYearlyIncome;
        console.log(percentageOfYourIncome * theirYearlyIncome);
        return this.numberWithCommas(
          Math.floor(percentageOfYourIncome * theirYearlyIncome)
        );
      }
      if (this.state.incomeType === "annual" && this.state.yourIncome > 0) {
        var theirAnnualIncome = this.calculateYearlyAmount(
          this.state.selectedBillionaireHourlyPay
        );
        var percentageOfYourAnnualIncome =
          this.state.yourDonation / this.state.yourIncome;
        return this.numberWithCommas(
          Math.floor(percentageOfYourAnnualIncome * theirAnnualIncome)
        );
      }
      if (this.state.incomeType === "networth" && this.state.yourIncome > 0) {
        var theirNetWorth = networths[this.state.selectedBillionaire];
        var percentageOfYourNetWorth =
          this.state.yourDonation / this.state.yourIncome;
        return this.numberWithCommas(
          Math.floor(percentageOfYourNetWorth * theirNetWorth)
        );
      }
    }

    return 0;
  }

  calculateYearlyAmount(hourlyRate) {
    return hourlyRate * 40 * 52;
  }

  render() {
    return (
      <div className="App">
        <header>Donation Calculation</header>
        <div className="input-wrapper">
          <div>
            <label htmlFor="billionaires">Compare your donation to: </label>
            <select
              name="billionaires"
              id="billionaires"
              onChange={this.onBillionaireChange}
            >
              <option value="4474885">Jeff Bezos</option>
              <option value="1712328">Mark Zuckerberg</option>
              <option value="1392694">Alice Walton</option>
              <option value="958904">Warren Buffett</option>
              <option value="924657">Larry Page</option>
              <option value="684931">Elon Musk</option>
              <option value="456621">Bill Gates</option>
              <option value="205479">Jack Dorsey</option>
              <option value="102739">Meg Whitman</option>
              {/* <option value="">Other</option> */}
            </select>
          </div>
          {/* <div className={isOther ? "" : "hidden"}>
            Someone with a{" "}
            <select name="typeOfIncome" onChange={this.onIncomeTypeChangeOther}>
              <option value="hourly">hourly rate</option>
              <option value="annual">annual salary</option>
              <option value="networth">net worth</option>
            </select>{" "}
            of:{" "}
            <input
              id="income"
              type="number"
              onChange={this.onIncomeChangeOther}
            ></input>
          </div> */}
          <div>
            <label htmlFor="income">
              My{" "}
              <select name="typeOfIncome" onChange={this.onIncomeTypeChange}>
                <option value="hourly">hourly rate</option>
                <option value="annual">annual salary</option>
                <option value="networth">net worth</option>
              </select>{" "}
              is:{" "}
            </label>
            <input
              id="income"
              type="number"
              onChange={this.onIncomeChange}
            ></input>
          </div>
          <div>
            <label htmlFor="donation">My donation amount is: </label>
            <input
              id="donation"
              type="number"
              onChange={this.onDonationChange}
              disabled={this.state.yourIncome <= 0}
            ></input>
          </div>
          <div>
            Congratulations! Your donation of ${this.state.yourDonation} is the
            equivalent of {this.state.selectedBillionaire} donating $
            {this.state.equivalent}. Thank you!
          </div>
        </div>
        <p>
          Information about individuals net worth and hourly rate pulled from
          Google and{" "}
          <a href="https://www.businessinsider.com/how-much-money-billionaires-celebrities-make-per-hour-2018-8">
            this Business Insider article
          </a>{" "}
          (circle 2018, so a little out of date). This site was made by{" "}
          <a href="https://kassmanben.com">Ben Kassman.</a>
        </p>
      </div>
    );
  }
}

export default App;
