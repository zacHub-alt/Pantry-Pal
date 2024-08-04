import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const handleExportPDF = (items) => {
  const doc = new jsPDF();
  const headers = Object.keys(items[0]);
  const data = items.map(item => headers.map(header => item[header]));

  doc.autoTable({
    head: [headers],
    body: data,
  });

  doc.save('pantry_inventory.pdf');
};
