function formatBytes(a, b = 2) { if (a === 0) return '0 Bytes'; const c = b < 0 ? 0 : b; const d = Math.floor(Math.log(a) / Math.log(1024)); return `${parseFloat((a / 1024 ** d).toFixed(c))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`; }

export default formatBytes;
