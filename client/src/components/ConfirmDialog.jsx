import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog">
          <div className="confirm-icon">
            <AlertTriangle />
          </div>
          <h3>{title}</h3>
          <p>{message}</p>
          <div className="confirm-actions">
            <button className="btn btn-ghost" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner spinner-sm" />
                  Deleting...
                </>
              ) : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
