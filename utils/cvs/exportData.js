export const handleExportCSV = (items) => {
  const csvRows = [];
  const headers = Object.keys(items[0]);
  csvRows.push(headers.join(','));

  for (const item of items) {
    const values = headers.map(header => `"${item[header]}"`);
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'pantry_inventory.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
