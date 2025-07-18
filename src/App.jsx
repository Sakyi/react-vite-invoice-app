import { useState } from "react";
import { classes, students } from "./data/records";
import PrintableInvoiceExporter from "./components/PrintableInvoiceExporter";
import InvoiceForm from "./components/InvoiceForm";
import StudentList from "./components/StudentList";
import ClassSelector from "./components/ClassSelector";

function App() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [discount, setDiscount] = useState("");
  const [totalFee, setTotalFee] = useState();

  //this function takes data from invoiceForm and adds it to list of invoices
  const handleGenerate = (invoiceData) => {
    setInvoices((prev) => [...prev, invoiceData]);
  };

  return (
    <div className="min-h-screen">
      <div className="h-[80%] bg-gray-100 text-gray-800 p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
          <aside className="md:col-span-3 w-auto bg-white shadow-md rounded-xl p-4 h-fit sticky top-4 self-start">
            <div className="mb-4">
              <ClassSelector classes={classes} onSelect={setSelectedClass} />
            </div>
            {selectedClass && (
              <StudentList
                students={students[selectedClass]}
                onSelectStudent={setSelectedStudent}
              />
            )}
          </aside>
          {/* Main Panel */}
          <main className="md:col-span-5 bg-white rounded-xl shadow-md p-0 min-h-[200px]">
            {selectedStudent ? (
              <div>
                <InvoiceForm
                  student={selectedStudent}
                  onGenerate={handleGenerate}
                  selectedClass={selectedClass}
                  setDiscount={setDiscount}
                  discount={discount}
                  setTotalFee={setTotalFee}
                />
              </div>
            ) : (
              <div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full text-gray-500"
              >
                <p>Select a student to start invoice setup.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      <div className="h-[10%]">
        {invoices.length > 0 && (
          <PrintableInvoiceExporter
            invoices={invoices}
            selectedClass={selectedClass}
            discount={discount}
            totalFee={totalFee}
          />
        )}
      </div>
    </div>
  );
}

export default App;
