import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box, Typography, Paper } from '@mui/material';

const QRScanner = ({ onResult }) => {
  const [error, setError] = useState(null);

  const handleScan = (result) => {
    if (result) {
      onResult(result?.text);
    }
  };

  const handleError = (err) => {
    setError(err.message);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: '500px', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        QR Code Scanner
      </Typography>
      
      <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <QrReader
          constraints={{
            facingMode: 'environment'
          }}
          onResult={handleScan}
          style={{ width: '100%' }}
        />
      </Box>
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}
    </Paper>
  );
};

export default QRScanner;
