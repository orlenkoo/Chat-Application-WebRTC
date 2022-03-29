const exportData = async (data) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = 'data.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportData;
