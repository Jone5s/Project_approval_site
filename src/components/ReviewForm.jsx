import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({
  projectName,
  setProjectName,
  clientCompany,
  setClientCompany,
  workCompleted,
  setWorkCompleted,
  environmentCleaned,
  setEnvironmentCleaned,
  incidents,
  setIncidents,
  incidentDesc,
  setIncidentDesc,
  quality,
  setQuality,
  timing,
  setTiming,
  safety,
  setSafety,
  cooperation,
  setCooperation,
  approved,
  setApproved,
  notices,
  setNotices,
  handleSubmit
}) {

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Worksite:
          <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="input" />
        </label>
        <label className="label">
          Client / Work Approver:
          <input type="text" value={clientCompany} onChange={e => setClientCompany(e.target.value)} className="input" />
        </label>
        <label className="label">
          Work completed and inspected by the client:
          <select value={workCompleted} onChange={e => setWorkCompleted(e.target.value)} className="select">
            <option value="">Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label className="label">
          Work environment cleaned up:
          <select value={environmentCleaned} onChange={e => setEnvironmentCleaned(e.target.value)} className="select">
            <option value="">Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label className="label">
          Work accidents / Safety observations
          <select value={incidents} onChange={e => setIncidents(e.target.value)} className="select">
            <option value="">Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label className="label">
          If yes, what?
          <input type="text" value={incidentDesc} onChange={e => setIncidentDesc(e.target.value)} className="input" />
        </label>
        <label className="label">
          Work quality, did it meet the agreement? 1-5 - 1: Not at all, 5: Completely
          <input type="number" min="1" max="5" value={quality} onChange={e => setQuality(e.target.value)} className="input" />
        </label>
        <label className="label">
          Work completed on schedule? Finished on time? 1-5 - 1: Not at all, 5: Completely
          <input type="number" min="1" max="5" value={timing} onChange={e => setTiming(e.target.value)} className="input" />
        </label>
        <label className="label">
          Were all safety aspects considered in the work? 1-5 - 1: Not at all, 5: Completely
          <input type="number" min="1" max="5" value={safety} onChange={e => setSafety(e.target.value)} className="input" />
        </label>
        <label className="label">
          Cooperation with the client. 1-5 - 1: Not at all, 5: Completely
          <input type="number" min="1" max="5" value={cooperation} onChange={e => setCooperation(e.target.value)} className="input" />
        </label>
        <label className="label">
          Project accepted successfully:
          <select value={approved} onChange={e => setApproved(e.target.value)} className="select">
            <option value="">Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label className="label">
          Possible remarks:
          <input type="text" value={notices} onChange={e => setNotices(e.target.value)} className="input" />
        </label>
      </form>
    </div>
  );
}

export default ReviewForm;
