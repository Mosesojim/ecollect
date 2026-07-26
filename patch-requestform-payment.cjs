const fs = require('fs');
let code = fs.readFileSync('src/components/RequestForm.tsx', 'utf8');

// We need to rewrite the `isPaying` block.
const paymentBlockStart = 'if (isPaying && !isSubmitted) {';
const paymentBlockEnd = 'return (\n    <div className="bg-slate-50 p-8 lg:p-10 rounded shadow-2xl h-full flex flex-col">';

let startIndex = code.indexOf(paymentBlockStart);
let endIndex = code.indexOf(paymentBlockEnd);

const newPaymentBlock = `if (isPaying && !isSubmitted) {
    return (
      <div className="bg-slate-50 p-8 lg:p-10 rounded shadow-2xl h-full flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Payment Details</h2>
        <div className="w-full max-w-md bg-white p-6 rounded-lg border border-slate-200 mb-8">
          <div className="flex justify-between mb-4 pb-4 border-b border-slate-200">
            <span className="text-slate-600">Selected Plan:</span>
            <span className="font-bold text-slate-900">{selectedService}</span>
          </div>
          
          <div className="mb-6 flex gap-2 border border-slate-200 p-1 rounded-lg bg-slate-50">
            <button 
              type="button" 
              onClick={() => setPaymentMethod("card")}
              className={\`flex-1 py-2 text-sm font-medium rounded-md transition-colors \${paymentMethod === 'card' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'}\`}
            >
              Card
            </button>
            <button 
              type="button" 
              onClick={() => setPaymentMethod("pickup")}
              className={\`flex-1 py-2 text-sm font-medium rounded-md transition-colors \${paymentMethod === 'pickup' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'}\`}
            >
              Pay on Pickup
            </button>
            <button 
              type="button" 
              onClick={() => setPaymentMethod("transfer")}
              className={\`flex-1 py-2 text-sm font-medium rounded-md transition-colors \${paymentMethod === 'transfer' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'}\`}
            >
              Transfer
            </button>
          </div>

          <form onSubmit={handlePaymentComplete} className="flex flex-col gap-4">
            {paymentMethod === 'card' && (
              <>
                <input type="text" placeholder="Card Number" required pattern="[0-9]{16}" className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#8CC63F]" />
                <div className="flex gap-4">
                  <input type="text" placeholder="MM/YY" required pattern="[0-9]{2}/[0-9]{2}" className="w-1/2 bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#8CC63F]" />
                  <input type="text" placeholder="CVC" required pattern="[0-9]{3,4}" className="w-1/2 bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#8CC63F]" />
                </div>
              </>
            )}
            {paymentMethod === 'pickup' && (
              <div className="py-4 text-center text-slate-600 text-sm">
                You will pay in cash or via POS when our driver arrives for pickup.
              </div>
            )}
            {paymentMethod === 'transfer' && (
              <div className="py-4 text-slate-600 text-sm bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="mb-2">Please transfer to the following account:</p>
                <p className="font-bold text-slate-900">Bank: Ecollect Bank Ltd</p>
                <p className="font-bold text-slate-900">Account: 1234567890</p>
                <p className="mt-2 text-xs">Your request will be confirmed once payment is received.</p>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setIsPaying(false)} disabled={isSubmitting} className="w-1/2 bg-transparent border border-slate-200 py-3 rounded text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-50 font-medium">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="w-1/2 bg-[#8CC63F] py-3 rounded text-[#18201A] font-bold hover:bg-[#7ab136] transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                {isSubmitting ? <><Recycle className="w-4 h-4 animate-spin" /> Processing...</> : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  `;

code = code.substring(0, startIndex) + newPaymentBlock + code.substring(endIndex);
fs.writeFileSync('src/components/RequestForm.tsx', code);

