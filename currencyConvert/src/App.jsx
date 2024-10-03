import { useState, useEffect } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

import './App.css'

function App() {
  const [amount, setAmount] = useState (0)
  const [from, setFrom] = useState ("usd")
  const [to, setTo] = useState ("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const currencyInfo = useCurrencyInfo(from)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true' ? true : false;
  });

  const options = Object.keys(currencyInfo)

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode])

  const toggleDarkMode = () =>{
    setDarkMode(!darkMode)
  }
  const swap = () =>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () =>{
    setConvertedAmount(amount * currencyInfo[to])
  }
  
  
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/28348904/pexels-photo-28348904/free-photo-of-a-wave-breaking-at-sunset-with-the-sun-behind-it.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')`,
        }}
    >
        <div className={darkMode ? 'dark' : ''}>
      <button 
        onClick={toggleDarkMode} 
        className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-md"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-white dark:bg-gray-900">
            <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setAmount(amount)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
                <h1 className="text-gray-900 dark:text-white">Currency Converter</h1>
        </div>
      </div>
    </div>
            </div>
        </div>
    </div>
);
}

export default App
