import React from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Hapus', cancelText = 'Batal' }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      backdropFilter: 'blur(5px)'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(15, 23, 42, 0.95)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(100, 116, 139, 0.5)'
      }}>
        <h2 style={{
          marginBottom: '1rem',
          color: '#f8fafc',
          fontSize: '1.3rem',
          margin: '0 0 1rem 0'
        }}>
          {title}
        </h2>
        
        <p style={{
          color: '#cbd5e1',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          {message}
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button
            className="btn btn-glass"
            onClick={onCancel}
            style={{
              padding: '0.6rem 1.5rem',
              fontSize: '0.9rem'
            }}
          >
            {cancelText}
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            style={{
              padding: '0.6rem 1.5rem',
              fontSize: '0.9rem'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
