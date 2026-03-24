import { useId } from 'react';

function InputBox({
  amount,
  selectCurrency,
  label,
  currencyOptions = [],
  amountDisable = false,
  onAmountChange,
  onCurrencyChange
}) {

  const amountInputId = useId();

  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-3 flex justify-between items-center">

      {/* Left */}
      <div className="input-left flex flex-col w-1/2">
        <label
          htmlFor={amountInputId}
          className='text-white/70 mb-1 text-sm'
        >
          {label}
        </label>

        <input
          id={amountInputId}
          type="number"
          min="0"
          className='bg-transparent outline-none text-white sm:text-lg text-base font-semibold'
          placeholder='Amount'
          disabled={amountDisable}
          value={amount}
          onKeyDown={(e) => {
            if (e.key === '-' || e.key === 'e') {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            const val = e.target.value;
            onAmountChange && onAmountChange(val === "" ? "" : Number(val));
          }}
        />
      </div>

      {/* Right */}
      <div className="input-right flex flex-col items-end w-1/2">
        <p className='text-white/70 text-sm mb-1'>
          Currency
        </p>

        <select
          name="currency-type"
          className="bg-white/20 text-white rounded-lg px-2 py-1 outline-none cursor-pointer"
          value={selectCurrency}
          onChange={(e) =>
            onCurrencyChange && onCurrencyChange(e.target.value)}
        >

          {currencyOptions.map((currency) => (
            <option
              value={currency}
              key={currency}
              className='text-black'
            >
              {currency.substring(0,2).toLowerCase()}: {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InputBox;