import React, { useRef } from "react";

const PrintableInvoiceExporter = ({
  invoices,
  selectedClass,
  discount,
  totalFee,
}) => {
  const printRef = useRef();

  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  const filteredInvoices = invoices.filter((p) => p.student.name !== "");

  return (
    <div className="p-4">
      {/* Button - only visible on screen */}
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
      >
        Print Invoices for {selectedClass}
      </button>

      {/* Printable Content */}
      <div ref={printRef} className="printable-area">
        {filteredInvoices.map((invoice, i) => (
          <div
            key={i}
            className="invoice-page border border-gray-300 rounded-md p-4 mb-10 print:-mb-5"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <div>
                <div className="flex gap-1">
                  <img
                    src="./schoollogo.jpg"
                    alt="Shool Logoooooosso"
                    className="h-[60px] mb-2"
                  />
                  <h2 className="font-bold text-black text-[15px] leading-5">
                    EDLYS
                    <br />
                    MONTESSORI
                    <br />
                    SCHOOL
                  </h2>
                </div>
                <p className="text-sm text-black">P.O.Box 688, Osu-Accra</p>
                <p className="text-sm text-black">
                  Phone: 0244921755 / 0548189470 / 0265577950
                </p>
                <p className="text-sm text-black">
                  Email: edlyskidszone@gmail.com
                </p>
              </div>
              <h1 className="text-4xl font-bold uppercase text-black">
                Student's Bill
              </h1>
            </div>

            {/* Student Info */}
            <div className="flex justify-between mb-5 text-black">
              <div>
                <h2 className="font-semibold mb-2 text-lg">Bill To:</h2>
                <p>{invoice.student.name}</p>
                <p>{selectedClass}</p>
              </div>
              <div>
                <p>Invoice #: {invoice.invoiceNumber || `INV-${i + 1}`}</p>
                <p>
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full table-auto border-collapse border-b border-l border-r border-t-1 border-black mb-6 text-sm">
              <thead>
                <tr>
                  <th className="border-b-1 border-black p-2 text-left">
                    Description
                  </th>
                  <th className="border-b-1 border-black  p-2 text-right">
                    Qty
                  </th>
                  <th className="border-b-1 border-black  p-2 text-right">
                    Unit Price
                  </th>
                  <th className="border-b-1 border-black p-2 text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.updatedThings.map((item, idx) => (
                  <tr key={idx}>
                    <td className=" p-2">{item.name}</td>
                    <td className=" p-2 text-right">{item.qty}</td>
                    <td className=" p-2 text-right">
                      ₵{Number(item.amount).toFixed(2)}
                    </td>
                    <td className=" p-2 text-right">
                      ₵{(item.qty * item.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex w-full justify-between space-x-10 align-center -mt-4 mb-0 ">
              <div className=" p-0 rounded w-[70%]">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Fee Policy Summary (Terms & Conditions)
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  70% payment of fees is expected to be made on or before
                  reopening of the new term. The remaining 30% should be paid
                  immediately after mid-term.
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  Feeding fees are to be paid in full before or on the reopening
                  day of the term.
                </p>
              </div>
              <div className="w-[30%] rounded ">
                <table className="table-auto w-full border border-collapse border-black text-sm -mt-2">
                  <tbody>
                    {/* Subtotal */}
                    <tr>
                      <td className="border border-black p-2  font-bold">
                        SubTotal
                      </td>
                      <td className="border border-black p-2 text-right font-bold">
                        GH₵{" "}
                        {invoice.updatedThings.reduce(
                          (sum, item) => sum + parseFloat(item.amount),
                          0
                        )}
                      </td>
                    </tr>
                    {/* Arrears */}
                    <tr className="-pt-1">
                      <td className="border border-black p-2 font-bold">
                        Arrears
                      </td>

                      <td className="border border-black p-2 text-right font-bold">
                        GH₵{" "}
                        {new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(invoice.arrears.toFixed(2))}
                      </td>
                    </tr>
                    {/* Discount */}
                    <tr className="-pt-1">
                      <td className="border border-black p-2 font-bold">
                        Discount
                      </td>

                      <td className="border border-black p-2 text-right font-bold">
                        {new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(
                          parseInt(
                            invoice.discount === "" ? "0" : invoice.discount
                          )
                        )}
                        %
                      </td>
                    </tr>
                    {/* Total */}
                    <tr>
                      <td className="border border-black p-2  font-bold">
                        Total
                      </td>
                      <td className="border border-black p-2 text-right font-bold">
                        GH₵ {Number(invoice.total[0].toFixed(2))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Terms and Payment */}
            <div className="flex gap-4 justify-center">
              <div className=" p-0 rounded w-1/2">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <p className="text-xs mb-1">
                  <span className="font-bold">Bank:</span> Haatso Ecobank
                </p>
                <p className="text-xs  mb-1">
                  <span className="font-bold">Bank Account:</span> 1441001261768
                </p>
                <p className="text-xs  mb-2">
                  <span className="font-bold">Account Name: </span>Edlys
                  Pre-School
                </p>
                <p className="text-[10px] ">
                  {" "}
                  N/B: the student's name and student's ID number must be
                  indicated
                </p>
              </div>
              <div className=" p-1 rounded w-1/2">
                <img
                  src="momologo.jpg"
                  alt="momo logo"
                  className="h-[40px] mb-1"
                />
                <h3 className="font-semibold  mb-1"></h3>
                <p className="text-xs  mb-2">
                  <span className="font-bold">Momo Name: </span>Edlys Montessori
                  School
                </p>
                <p className="text-xs mb-2">
                  <span className="font-bold">Momo Number: </span>0597394526
                </p>
                <p className="text-[10px]">
                  {" "}
                  N/B: the description for momo shall have the students name
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Print-only CSS */}
      <style jsx global>{`
        @media print {
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
            padding: 0;
            margin: 0;
          }

          .invoice-page {
            page-break-after: always;
            break-after: page;
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
