import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as ynab from 'ynab';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

var accessToken = "2e3ac9ab11faa9991c0a47fe19421d5f4f38c91b5986a993b2141f34e5ff3c69";
var ynabAPI = new ynab.API(accessToken);

function parseBudgetList(budgets) {
  return budgets.map((budget) => {
    return { label: budget.name, value: budget.id }
  });
}

class App extends Component {

  state = {
    budgets: undefined,
    selectedBudget: undefined,
    categories: undefined
  }

  componentDidMount() {
    ynabAPI.budgets.getBudgets().then(res => 
      this.setState({
        budgets: parseBudgetList(res.data.budgets)
      })
      // console.log(res.data.budgets)
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Dropdown options={this.state.budgets} value={this.state.selectedBudget} />
        <Dropdown options={this.state.categories} />
      </div>
    );
  }
}

export default App;
