import { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';
function App() {
  //For ui only
  const [rotation, setRotation] = useState(0);

  //Whatever the amout user gonna input it'll store it's value and act accordingly
  const [amount, setAmount] = useState(0);

  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(from);

  const convertedAmount = currencyInfo[to] ? amount * currencyInfo[to] : 0;
  

  

  const options = Object.keys(currencyInfo || {});

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    
    // setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const handleSwap = () =>{
    setRotation(prev => prev + 180);
    swap();
  }

  return (
    <div className="project-body w-full h-screen flex justify-center px-5 items-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-800"
    >
      <div className=' container relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col gap-4 '>

        <h1 className='text-white text-xl sm:text-2xl font-semibold text-center'>
          CurrencyLab
        </h1>
        <InputBox
          label="From"
          amount={amount}
          currencyOptions={options}
          onAmountChange={setAmount}
          onCurrencyChange={setFrom}
          selectCurrency={from}
        />

        <div className='flex justify-center my-1'>
          <button
            onClick={handleSwap}
            style={{transform: `rotate(${rotation}deg)`}}
            className='rounded-sm active:rounded-full
            hover:bg-indigo-600
            active:bg-indigo-600  
            bg-transparent
            border-white-100 border
            hover:scale-110 active:scale-95 text-white p-2 shadow-lg transition-transform 
            duration-450 ease-in-out'
          >
            <img src="swap.svg" alt="swap" />
          </button>
        </div>


        <InputBox
          label="To"
          amount={convertedAmount}
          currencyOptions={options}
          onCurrencyChange={setTo}
          selectCurrency={to}
          amountDisable
        />

      </div>

    </div>
  );
}

export default App;