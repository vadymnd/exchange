import React, { useState, useEffect } from 'react';
import './App.css';
import './reset.css';
import { getAllCurrency, getAllCurrencyRates } from './api.js';

function App() {
  const [baseAllCurrency, setAllCurrency] = useState(null);
  const [firstInputValue, setFirstInputValue] = useState(null);
  const [secondInputValue, setSecondInputValue] = useState(null);
  const [firstSelectValue, setFirstSelectValue] = useState('EUR');
  const [secondSelectValue, setSecondSelectValue] = useState('CAD');
  const [rates, setRates] = useState('');

  useEffect(() => {
    getAllCurrency()
      .then(res => {
        setAllCurrency(res);
      })
      .catch(null);
    getAllCurrencyRates()
      .then(res => {
        setRates(res);
      })
      .catch(null);
  }, []);

  const handleOnChangeSecondSelect = (e) => {
    setSecondSelectValue(e.target.value);
    setSecondInputValue(firstInputValue * rates[e.target.value]);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleOnChangeFirstInput = (e) => {
    setFirstInputValue(e.target.value);
    setSecondInputValue(e.target.value * rates[secondSelectValue]);
  };

  const handleOnChangeSecondInput = (e) => {
    setSecondInputValue(e.target.value);
    setFirstInputValue(e.target.value / rates[secondSelectValue]);
  };

  return <div id="main-react-exchange-app">
    <div className="current">
      <div className="rate-1">1 {secondSelectValue} equally</div>
      <div className="rate-2">{Math.floor(rates[secondSelectValue] * 100) / 100} {firstSelectValue}</div>
      <div className="date">{baseAllCurrency ? baseAllCurrency.date : ''} {new Date().getHours() + ':' + new Date().getMinutes()}</div>
    </div>
    <div className="input-metods">
      <div className="inputs">
        <input className="first-input"
          value={Math.floor(firstInputValue * 100) / 100}
          onFocus={handleFocus}
          onChange={handleOnChangeFirstInput}
          type="number"
        />
        <input className="second-input"
          value={Math.floor(secondInputValue * 100) / 100}
          onFocus={handleFocus}
          onChange={handleOnChangeSecondInput}
          type="number"
        />
      </div>
      <div className="selects">
        <div>
          <select className="first-select" >
            <option>{firstSelectValue}</option>
          </select>
          <span className="arrow-down"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg></span>
        </div>
        <div>
          <select className="second-select" onChange={handleOnChangeSecondSelect}>
            {Object.keys(rates).map(function (item) {
              return <option key={Object.keys(rates).indexOf(item)}>{item}</option>
            })}
          </select>
          <span className="arrow-down"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg></span>
        </div>
      </div>
    </div>
    <a className="provided" href="//exchangeratesapi.io">Currency data provided by exchangeratesapi.io</a>
  </div>
};

export default App;