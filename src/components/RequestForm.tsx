import { useState, useEffect, useRef, FormEvent } from "react";
import { Calendar, Download, CheckCircle, Recycle } from "lucide-react";
import { getPlans } from "../lib/pricing";
import { useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

interface RequestFormProps {
  selectedServiceProp?: string;
  onServiceChangeProp?: (service: string) => void;
}

export function RequestForm({
  selectedServiceProp,
  onServiceChangeProp,
}: RequestFormProps) {
  const [searchParams] = useSearchParams();
  const [localService, setLocalService] = useState("Select Service");
  const selectedService =
    selectedServiceProp !== undefined ? selectedServiceProp : localService;

  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [receiptId, setReceiptId] = useState("");

  const receiptRef = useRef<HTMLDivElement>(null);

  const handleServiceChange = (val: string) => {
    if (onServiceChangeProp) {
      onServiceChangeProp(val);
    } else {
      setLocalService(val);
    }
  };

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      if (onServiceChangeProp) {
        onServiceChangeProp(plan);
      } else {
        setLocalService(plan);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleProceedToPayment = (e: FormEvent) => {
    e.preventDefault();
    if (selectedService === "Select Service") {
      alert("Please select a service");
      return;
    }
    setIsPaying(true);
  };

  const handlePaymentComplete = async (e: FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    if (selectedService === "Select Service") {
      alert("Please select a service");
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedId = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

      const newRequest = {
        id: generatedId,
        user_id: user?.id || 'anonymous',
        type: selectedService,
        status: "Pending",
        date: date,
        address: address,
        points: 0,
        created_at: new Date().toISOString()
      };

      if (user) {
        const { error } = await supabase.from("requests").insert([newRequest]);
        if (error) throw error;
      } else {
        const existing = JSON.parse(localStorage.getItem('anonymous_requests') || '[]');
        existing.push(newRequest);
        localStorage.setItem('anonymous_requests', JSON.stringify(existing));
      }

      setReceiptId(generatedId);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("There was an error booking your appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      // Header
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("ecollect.", 105, 20, { align: "center" });

      pdf.setFontSize(12);
      pdf.text("APPOINTMENT RECEIPT", 105, 28, { align: "center" });

      const startY = 40;
      const startX = 20;
      const rowHeight = 12;
      const col1Width = 60;
      const col2Width = 110;

      pdf.setDrawColor(200, 200, 200); // light gray borders
      pdf.setLineWidth(0.2);

      const data = [
        { label: "Receipt ID:", value: `#${receiptId}` },
        { label: "Date of Printing:", value: new Date().toLocaleDateString() },
        { label: "Name:", value: name },
        { label: "Service:", value: selectedService },
        { label: "Appointment Date:", value: `${date} at ${time}` },
        { label: "Address:", value: address },
        { label: "Status:", value: "PENDING" },
      ];

      let currentY = startY;

      data.forEach((row) => {
        pdf.rect(startX, currentY, col1Width, rowHeight);
        pdf.rect(startX + col1Width, currentY, col2Width, rowHeight);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(50, 50, 50);
        pdf.text(row.label, startX + 5, currentY + 8);

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        pdf.text(row.value, startX + col1Width + 5, currentY + 8);

        currentY += rowHeight;
      });

      pdf.setFontSize(9);
      pdf.setTextColor(200, 0, 0); // red footer text
      pdf.text(
        "This receipt serves as proof of your scheduled appointment.",
        105,
        currentY + 15,
        { align: "center" },
      );

      pdf.save(`ecollect-receipt-${receiptId}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Could not generate PDF. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 p-8 lg:p-10 rounded shadow-2xl h-full flex flex-col items-center justify-center text-center">
        <CheckCircle className="w-16 h-16 text-[#8CC63F] mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-slate-600 mb-8">
          Your appointment has been successfully scheduled.
        </p>

        {/* Receipt content to be captured */}
        <div
          ref={receiptRef}
          className="bg-white p-8 rounded-lg border border-slate-200 text-left w-full max-w-md mx-auto mb-8 relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calendar className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-white/10">
              ecollect. Receipt
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Receipt ID:</span>
                <span className="font-mono text-slate-900 font-bold">
                  #{receiptId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Name:</span>
                <span className="text-slate-900 font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Service:</span>
                <span className="text-slate-900 font-medium">
                  {selectedService}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span className="text-slate-900 font-medium">
                  {date} at {time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Address:</span>
                <span className="text-slate-900 font-medium">{address}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-slate-600 font-bold">Status:</span>
                <span className="text-[#8CC63F] font-bold uppercase tracking-wider text-xs bg-[#8CC63F]/10 px-3 py-1 rounded">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={downloadPDF}
            className="bg-[#8CC63F] text-[#18201A] font-bold text-sm uppercase tracking-wider py-4 px-6 rounded hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setLocalService("Select Service");
              setDate("");
              setTime("");
              setMessage("");
              setAddress("");
            }}
            className="bg-white text-slate-900 border border-slate-200 font-bold text-sm uppercase tracking-wider py-4 px-6 rounded hover:bg-slate-100 transition-colors"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  
  if (isPaying && !isSubmitted) {
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
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${paymentMethod === 'card' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Card
            </button>
            <button 
              type="button" 
              onClick={() => setPaymentMethod("pickup")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${paymentMethod === 'pickup' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Pay on Pickup
            </button>
            <button 
              type="button" 
              onClick={() => setPaymentMethod("transfer")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${paymentMethod === 'transfer' ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
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

  return (
    <div className="bg-slate-50 p-8 lg:p-10 rounded shadow-2xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-6 h-6 text-[#8CC63F]" />
        <h2 className="text-2xl font-semibold text-slate-900">
          Get An Appointment
        </h2>
      </div>

      <form className="flex-1 flex flex-col gap-8" onSubmit={handleProceedToPayment}>
        <div className="relative">
          <select
            value={selectedService}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#8CC63F] appearance-none transition-colors cursor-pointer"
            required
          >
            <option
              value="Select Service"
              className="bg-slate-50"
              disabled
            >
              Select Service
            </option>
            {getPlans().map((plan) => (
              <option key={plan.name} value={plan.name} className="bg-slate-50">
                {plan.name} (₦{plan.price})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#8CC63F] transition-colors [&::-webkit-calendar-picker-indicator]:filter  cursor-pointer"
            />
          </div>
          <div className="relative">
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#8CC63F] transition-colors [&::-webkit-calendar-picker-indicator]:filter  cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 placeholder:text-slate-700 focus:outline-none focus:border-[#8CC63F] transition-colors"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 placeholder:text-slate-700 focus:outline-none focus:border-[#8CC63F] transition-colors"
            />
          </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-end">
          <textarea
            placeholder="Message (Optional)"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 placeholder:text-slate-700 focus:outline-none focus:border-[#8CC63F] transition-colors resize-none mb-10"
          />
          <button
            disabled={isSubmitting}
            className="bg-[#8CC63F] text-[#18201A] font-bold text-sm uppercase tracking-wider py-4 px-8 rounded hover:bg-slate-900 hover:text-white transition-colors self-start disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Recycle className="w-5 h-5 animate-spin" /> Processing...
              </>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
