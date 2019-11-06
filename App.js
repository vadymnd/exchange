import React, {useState, useEffect} from 'react';
import './App.css';
import { getAllCurrency } from './api.js';

function App() {
  const [baseAllCurrency, setAllCurrency] = useState(null);
  const [value, setValue] = useState('1');

    useEffect(() => {
      getAllCurrency()
        .then(res => {
          setAllCurrency(res);
        })
        .catch(null);
    }, []);
    

    const handleOnChange = (e) => {
      setValue(e.target.value);
    }
      return <div id="main">
    <div className="current">{ baseAllCurrency ? baseAllCurrency.date : '' }</div>
    <div className="input">
      <input defaultValue = {1} onInput={handleOnChange} type="number"></input>
      <input defaultValue={baseAllCurrency ? (baseAllCurrency.rates.USD * value) : ''} type="number"></input>
    </div>
    <div className="selection">
      <select>
        <option>EUR</option>
      </select>
      <select>
        {/* {baseAllCurrency.rates ? console.log(baseAllCurrency.rates.keys) : ''} */}
        <option>USD</option>
      </select>
    </div>
  </div>
}
export default App;
