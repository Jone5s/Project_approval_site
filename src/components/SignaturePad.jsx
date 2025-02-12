import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './SignaturePad.css';

function SignaturePad({ onBothSignaturesSubmit }) {
  const sigCanvas1 = useRef(null);
  const sigCanvas2 = useRef(null);
  const [printedName1, setPrintedName1] = useState('');
  const [printedName2, setPrintedName2] = useState('');

  const clearSignatures = () => {
    sigCanvas1.current.clear();
    sigCanvas2.current.clear();
    setPrintedName1('');
    setPrintedName2('');
  };

  const submitSignatures = () => {
    const sigData1 = sigCanvas1.current.toDataURL();
    const sigData2 = sigCanvas2.current.toDataURL();
    
    if (!sigCanvas1.current.isEmpty() && !sigCanvas2.current.isEmpty()) {
      onBothSignaturesSubmit(sigData1, printedName1, sigData2, printedName2);
    } else {
      // One or both signatures are missing, alert the user
      alert('Please provide both signatures before submitting.');
    }
  };

  return (
    <div>
      <h2>Signature of the contract recipient:</h2>
      <div>
        <SignatureCanvas ref={sigCanvas1} canvasProps={{ width: 400, height: 200, style: { backgroundColor: 'white', border: '2px solid black' } }} />
        <div>
        <label className="label">
          Printed name:
          <input type="text" value={printedName1} onChange={e => setPrintedName1(e.target.value)} />
        </label>
        </div>
      </div>
      <h2>Signature of the project supervisor:</h2>
      <div>
        <SignatureCanvas ref={sigCanvas2} canvasProps={{ width: 400, height: 200, style: { backgroundColor: 'white', border: '2px solid black' } }} />
        <div>
        <label className="label">
          Printed name:
          <input type="text" value={printedName2} onChange={e => setPrintedName2(e.target.value)} />
        </label>
        </div>
      </div>
      <div>
        <button onClick={clearSignatures}>Clear Signatures</button>
        <button onClick={submitSignatures}>Submit Signatures</button>
      </div>
    </div>
  );
}

export default SignaturePad;

