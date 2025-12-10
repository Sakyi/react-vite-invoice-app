import React, { useRef } from "react";
import Logo from "../assets/schoollogo.jpg";
import MomoLogo from "../assets/momologo.jpg";
import { DateFormatter } from "@/utils/DateFormatter";

const PrintableInvoiceExporter = ({ invoices, selectedClass }) => {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };
  const todaysDate = new Date().toLocaleDateString();
  const filteredInvoices = invoices.filter((p) => p.student.name.trim() !== "");

  return (
    <div className="p-4">
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
      >
        Print Invoices for {selectedClass}
      </button>

      {/* A4 CONTAINER */}
      <div ref={printRef} className="printable-area">
        {filteredInvoices.map((invoice, i) => {
          const subtotal = invoice.updatedThings.reduce(
            (sum, item) => sum + item.qty * item.amount,
            0
          );

          return (
            <div key={i} className="invoice-page">
              {/* YOUR INVOICE CONTENT STARTS HERE */}
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <div>
                    <div className="flex gap-1">
                      <img src={Logo} alt="School Logo" className="h-[60px]" />
                      <h2 className="font-bold text-[15px] leading-5">
                        EDLYS
                        <br />
                        MONTESSORI
                        <br />
                        SCHOOL
                      </h2>
                    </div>
                    <p className="text-sm">P.O.Box 688, Osu-Accra</p>
                    <p className="text-sm">
                      Phone: 0244921755 / 0548189470 / 0265577950
                    </p>
                    <p className="text-sm">Email: edlyskidszone@gmail.com</p>
                  </div>

                  <h1 className="text-4xl font-bold uppercase">
                    Student's Bill
                  </h1>
                </div>

                {/* Student Info */}
                <div className="flex justify-between mb-5">
                  <div>
                    <h2 className="font-semibold mb-2 text-lg">Bill To:</h2>
                    <p>{invoice.student.name}</p>
                    <p>{selectedClass}</p>
                  </div>
                  <div>
                    <p>
                      Invoice #: {invoice.invoiceNumber || `EDMS-INV-${i + 1}`}
                    </p>
                    <p>
                      <strong>Invoice Date:</strong> {DateFormatter(todaysDate)}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {DateFormatter("1/08/2026")}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <table className="w-full table-auto border border-black mb-6 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Description</th>
                      <th className="border p-2 text-right">Qty</th>
                      <th className="border p-2 text-right">Unit Price</th>
                      <th className="border p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.updatedThings.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">{item.name}</td>
                        <td className="border p-2 text-right">{item.qty}</td>
                        <td className="border p-2 text-right">
                          {new Intl.NumberFormat("en-GH", {
                            style: "currency",
                            currency: "GHS",
                          }).format(item.amount)}
                        </td>
                        <td className="border p-2 text-right">
                          {new Intl.NumberFormat("en-GH", {
                            style: "currency",
                            currency: "GHS",
                          }).format(item.qty * item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-between">
                  <div className="w-[65%]">
                    <h3 className="font-semibold mb-2">Fee Policy Summary</h3>
                    <p className="text-xs">
                      <span className="font-semibold ">70% </span> payment is
                      expected on or before reopening. The remaining{" "}
                      <span className="font-semibold ">30% </span>should be paid
                      immediately after mid-term.
                    </p>
                    <p className="text-xs">
                      Feeding fees must be paid in full before reopening.
                    </p>
                  </div>

                  <div className="w-[30%]">
                    <table className="table-auto w-full border border-black text-sm">
                      <tbody>
                        <tr>
                          <td className="border p-2 font-bold">Subtotal</td>
                          <td className="border p-2 text-right font-bold">
                            {new Intl.NumberFormat("en-GH", {
                              style: "currency",
                              currency: "GHS",
                            }).format(subtotal)}
                          </td>
                        </tr>

                        <tr>
                          <td className="border p-2 font-bold">Arrears</td>
                          <td className="border p-2 text-right font-bold">
                            {new Intl.NumberFormat("en-GH", {
                              style: "currency",
                              currency: "GHS",
                            }).format(invoice.arrears)}
                          </td>
                        </tr>

                        <tr>
                          <td className="border p-2 font-bold">Discount</td>
                          <td className="border p-2 text-right font-bold">
                            {invoice.discount ? `${invoice.discount}%` : "0%"}
                          </td>
                        </tr>

                        <tr>
                          <td className="border p-2 font-bold">Total</td>
                          <td className="border p-2 text-right font-bold">
                            {new Intl.NumberFormat("en-GH", {
                              style: "currency",
                              currency: "GHS",
                            }).format(invoice.total[0])}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex mt-5 gap-6">
                  <div className="w-1/2">
                    <h3 className="font-semibold mb-1">Payment Details</h3>
                    <p className="text-xs">
                      <strong>Bank:</strong> Haatso Ecobank
                    </p>
                    <p className="text-xs">
                      <strong>Account:</strong> 1441001261768
                    </p>
                    <p className="text-xs">
                      <strong>Name:</strong> Edlys Pre-School
                    </p>
                    <p className="text-[10px] ">
                      N/B: the student's name and student's ID number must be
                      indicated
                    </p>
                  </div>

                  <div className="w-1/2">
                    <img src={MomoLogo} className="h-[40px] mb-1" />
                    <p className="text-xs">
                      <strong>Momo Name:</strong> Edlys Montessori School
                    </p>
                    <p className="text-xs">
                      <strong>Momo Number:</strong> 0597394526
                    </p>
                    <p className="text-[10px]">
                      N/B: the description for momo shall have the students name
                    </p>
                  </div>
                </div>
              </div>
              {/* END CONTENT */}
            </div>
          );
        })}
      </div>

      {/* A4 PRINT CSS */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          img {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden;
          }

          .printable-area,
          .printable-area * {
            visibility: visible;
          }

          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }

          .invoice-page {
            width: 100%;
            height: 297mm; /* Exact A4 height */
            display: block;
            page-break-after: always;
            background: white;
            overflow: hidden;
          }

          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintableInvoiceExporter;
