import React, { useState, useEffect } from 'react';
import './App.css';
import './reset.css';
import { getAllCurrency, getAllCurrencyRates } from './api.js';

function App() {
  const [baseAllCurrency, setAllCurrency] = useState(null);
  const [firstInputValue, setFirstInputValue] = useState();
  const [secondInputValue, setSecondInputValue] = useState();
  const [firstSelectValue, setFirstSelectValue] = useState('EUR');
  const [secondSelectValue, setSecondSelectValue] = useState('USD');
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

  const handleOnChangeFirstSelect = (e) => {
    setFirstSelectValue(e.target.value);
    setSecondInputValue((rates[secondSelectValue] / rates[e.target.value]) * firstInputValue)
  };

  const handleOnChangeSecondSelect = (e) => {
    setSecondSelectValue(e.target.value);
    setSecondInputValue((rates[e.target.value] / rates[firstSelectValue]) * firstInputValue)
  };

  const handleOnChangeFirstInput = (e) => {
    setFirstInputValue(e.target.value);
    setSecondInputValue((rates[secondSelectValue] / rates[firstSelectValue]) * e.target.value);
  };

  const handleOnChangeSecondInput = (e) => {
    setSecondInputValue(e.target.value);
    setFirstInputValue(e.target.value / (rates[secondSelectValue] / rates[firstSelectValue]));
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleCopy = (e) => {
    e.currentTarget.parentElement.querySelector('input').select();
    document.execCommand("copy");
  };

  const date = new Date();  
  
  const minutes = (date) => (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

  return <div id="main-react-exchange-app">
    <div className="current">
      <div className="rate-1">1 {firstSelectValue} equally</div>
      <div className="rate-2">{Math.floor((rates[secondSelectValue] / rates[firstSelectValue]) * 100000) / 100000} {secondSelectValue}</div>
      <div className="date">{baseAllCurrency ? baseAllCurrency.date : ''} {date.getHours() + ':' + minutes(date)}</div> 
    </div>
    <div className="input-metods">
      <div className="inputs">
        <div>
          <input className="first-input"
            value={Math.floor(firstInputValue * 100) / 100}
            onFocus={handleFocus}
            onChange={handleOnChangeFirstInput}
            type="number"
          />
          <span className="copy-btn" onClick={handleCopy}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.3 488.3"><path d="M314 85H87c-21 0-38 18-38 39v326c0 21 17 38 38 38h227c22 0 39-17 39-38V124c0-21-18-39-39-39zm12 365c0 6-5 11-12 11H87c-6 0-11-5-11-11V124c0-6 5-12 11-12h227c7 0 12 6 12 12v326z"/><path d="M401 0H174c-21 0-39 17-39 39 0 7 6 13 14 13s13-6 13-13 6-12 12-12h227c6 0 12 5 12 12v325c0 7-6 12-12 12-7 0-13 6-13 13s6 14 13 14c21 0 39-17 39-39V39c0-22-18-39-39-39z"/></svg></span>
        </div>
        <div>
          <input className="second-input"
            value={Math.floor(secondInputValue * 100) / 100}
            onFocus={handleFocus}
            onChange={handleOnChangeSecondInput}
            type="number"
          />
          <span className="copy-btn" onClick={handleCopy}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.3 488.3"><path d="M314 85H87c-21 0-38 18-38 39v326c0 21 17 38 38 38h227c22 0 39-17 39-38V124c0-21-18-39-39-39zm12 365c0 6-5 11-12 11H87c-6 0-11-5-11-11V124c0-6 5-12 11-12h227c7 0 12 6 12 12v326z"/><path d="M401 0H174c-21 0-39 17-39 39 0 7 6 13 14 13s13-6 13-13 6-12 12-12h227c6 0 12 5 12 12v325c0 7-6 12-12 12-7 0-13 6-13 13s6 14 13 14c21 0 39-17 39-39V39c0-22-18-39-39-39z"/></svg></span>
        </div>
      </div>
      <div className="selects">
        <div>
          <select className="first-select" onChange={handleOnChangeFirstSelect}>
          {Object.keys(rates).sort().sort(function(x,y) {
            return x === 'EUR' ? -1 : y === 'EUR' ? 1 : 0;
          }).map(function (item) {
              return <option key={Object.keys(rates).indexOf(item)}>{item}</option>
            })}
          </select>
          <span className="arrow-down"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg></span>
        </div>
        <div>
          <select className="second-select" onChange={handleOnChangeSecondSelect}>
            {Object.keys(rates).sort().sort(function(x,y) {
            return x === 'USD' ? -1 : y === 'USD' ? 1 : 0;
          }).map(function (item) {
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