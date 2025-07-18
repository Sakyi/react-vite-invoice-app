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
    <div className="p-6">
      <ClassSelector classes={classes} onSelect={setSelectedClass} />
      <div className="flex justify-between items-start mt-5">
        <div className="h-[500px] overflow-auto border border-gray-200 mt-0">
          {selectedClass && (
            <StudentList
              students={students[selectedClass]}
              onSelectStudent={setSelectedStudent}
            />
          )}
        </div>
        <div className="-mt-5 pt-2 h-[400px]">
          {selectedStudent && (
            <InvoiceForm
              student={selectedStudent}
              onGenerate={handleGenerate}
              selectedClass={selectedClass}
              setDiscount={setDiscount}
              discount={discount}
              setTotalFee={setTotalFee}
            />
          )}
        </div>
      </div>
      <div>
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
