import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import './style.css';

const QrcodeDisplay = ({ url, onClose }) => {
  const isValidUrl = typeof url === 'string' && url.trim() !== '';

  return (
    <div className="qr-background" onClick={onClose}>
      <div className="qr-container" onClick={(e) => e.stopPropagation()}>
        {isValidUrl ? (
          <QRCodeCanvas value={url} size={500} className='qr-image'/>
        ) : (
          <div className="qr-error">
            <p>QR Code não disponível</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrcodeDisplay;