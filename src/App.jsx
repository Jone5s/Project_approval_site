import React, { useState } from 'react';
import SignaturePad from './components/SignaturePad';
import ReviewForm from './components/ReviewForm';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [projectName, setProjectName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [workCompleted, setWorkCompleted] = useState('');
  const [environmentCleaned, setEnvironmentCleaned] = useState('');
  const [incidents, setIncidents] = useState(0);
  const [incidentDesc, setIncidentDesc] = useState('');
  const [quality, setQuality] = useState('');
  const [timing, setTiming] = useState('');
  const [safety, setSafety] = useState('');
  const [cooperation, setCooperation] = useState('');
  const [approved, setApproved] = useState('');
  const [notices, setNotices] = useState('');

  const onBothSignaturesSubmit = async (sigData1, printName1, sigData2, printName2) => {
    // Check if we have all the necessary information to generate the PDF
    if (projectName && clientCompany && approved && sigData1 && sigData2) {
      const formData = {
        projectName,
        clientCompany,
        workCompleted,
        environmentCleaned,
        incidents,
        incidentDesc,
        quality,
        timing,
        safety,
        cooperation,
        approved,
        notices,
        signatureData1: sigData1,
        printedName1: printName1,
        signatureData2: sigData2,
        printedName2: printName2
      };
  
      await generatePdfWithFormData(formData, sigData1, printName1, sigData2, printName2);
    } else {
      // Handle the case where some required information is missing
      alert('Please fill out all required fields and provide both signatures.');
    }
  };
  

  const generatePdfWithFormData = async (formData, sigData1, printedName1, sigData2, printedName2) => {
    // Fetch the PDF template from the public directory
    const response = await fetch('/template.pdf');
    const arrayBuffer = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const signatureImage1 = await pdfDoc.embedPng(sigData1);
    const signatureImage2 = await pdfDoc.embedPng(sigData2);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Function to draw text at specified positions
    const drawText = async (text, x, y) => {
        await page.drawText(text, {
            x,
            y: page.getHeight() - y,
            size: 12,
            font: font,
            color: rgb(0, 0, 0)
        });
    };

    // Draw form labels and values
    await drawText(formData.projectName, 120, 185);
    await drawText(formData.clientCompany, 195, 227);
    await drawText(formData.workCompleted, 390, 280);
    await drawText(formData.environmentCleaned, 390, 308);
    await drawText(formData.incidents, 390, 336);
    await drawText(formData.incidentDesc, 160, 365);

    await drawText(formData.quality.toString(), 467, 474);
    await drawText(formData.timing.toString(), 467, 488);
    await drawText(formData.safety.toString(), 467, 502);
    await drawText(formData.cooperation.toString(), 467, 515);

    await drawText(formData.approved, 460, 555);
    await drawText(formData.notices, 60, 608);

    page.drawImage(signatureImage1, {
        x: 50,
        y: 140,
        width: 150,
        height: 75
    });
    await drawText(printedName1, 320, 665);

    page.drawImage(signatureImage2, {
        x: 50,
        y: 75,
        width: 150,
        height: 75
    });
    await drawText(printedName2, 320, 730);

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'completed_form.pdf');
};


  return (
    <div className="app-container">
      <h1>Project Approval</h1>
      <h2>Project Acceptance and Quality Assessment</h2>
      <ReviewForm
        projectName={projectName}
        setProjectName={setProjectName}
        clientCompany={clientCompany}
        setClientCompany={setClientCompany}
        workCompleted={workCompleted}
        setWorkCompleted={setWorkCompleted}
        environmentCleaned={environmentCleaned}
        setEnvironmentCleaned={setEnvironmentCleaned}
        incidents={incidents}
        setIncidents={setIncidents}
        incidentDesc={incidentDesc}
        setIncidentDesc={setIncidentDesc}
        quality={quality}
        setQuality={setQuality}
        timing={timing}
        setTiming={setTiming}
        safety={safety}
        setSafety={setSafety}
        cooperation={cooperation}
        setCooperation={setCooperation}
        approved={approved}
        setApproved={setApproved}
        notices={notices}
        setNotices={setNotices}
      />
      <SignaturePad onBothSignaturesSubmit={onBothSignaturesSubmit} />
    </div>
  );
}

export default App;
