import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode-svg'; // SVG em vez de canvas
import './style.css';
import Button from '../Button/Button';

const QRCodePrintable = ({ url, onClose }) => {
    const qrContainerRef = useRef(null);

    useEffect(() => {
        if (!url || typeof url !== 'string' || !qrContainerRef.current) return;

        const qr = new QRCode({
            content: url,
            width: 400,
            height: 400,
            join: true,
        });

        qrContainerRef.current.innerHTML = qr.svg(); 
    }, [url]);

    const handlePrint = () => {
        const svgContent = qrContainerRef.current?.innerHTML;
        if (!svgContent) {
            alert('QR Code ainda não foi gerado.');
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir QR Code</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            svg {
              width: 400px;
              height: 400px;
            }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div className='qr-background' onClick={onClose}>
            <div className='qr-container' onClick={(e) => e.stopPropagation()}>
                <div ref={qrContainerRef} />
                <div className='button'>
                    <Button className='print-button' onClick={handlePrint}>
                        Imprimir QR Code
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QRCodePrintable;
