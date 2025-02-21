import React, { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import './EditViewModal.css';
import { View } from './AppContext';

interface EditViewModalProps {
  view: View;
  onClose: () => void;
  onSave: (newView: View) => void;
  onDelete: () => void;
}

const EditViewModal: React.FC<EditViewModalProps> = ({ view, onClose, onSave, onDelete }) => {
  const [newView, setNewView] = useState(view);

  const handleSave = () => {
    onSave(newView);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit View</h2>
          <button onClick={onClose} className="close-button">
            <MaterialSymbol icon="close" size={24} fill grade={-25} />
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-label">
            View Name:
            <input
              type="text"
              value={newView.name}
              onChange={(e) => setNewView({ ...newView, name: e.target.value })}
            />
          </label>
          <label className="modal-label">
            IFC Query:
            <input
              type="text"
              value={newView.query}
              onChange={(e) => setNewView({ ...newView, query: e.target.value })}
            />
          </label>
          <label className="modal-label">
            <input
              type="checkbox"
              checked={newView.modelTransparent}
              onChange={(e) => setNewView({ ...newView, modelTransparent: e.target.checked })}
            />
            Model Transparent
          </label>
          <label className="modal-label">
            <input
              type="checkbox"
              checked={newView.modelShaded}
              onChange={(e) => setNewView({ ...newView, modelShaded: e.target.checked })}
            />
            Model Shaded
          </label>
          <label className="modal-label">
            Mode:
            <select value={newView.mode} onChange={(e) => setNewView({ ...newView, mode: e.target.value })}>
              <option value="Numeric value">Numeric value</option>
              <option value="Text value">Text value</option>
            </select>
          </label>
          <label className="modal-label">
            Sub Mode:
            <select value={newView.subMode} onChange={(e) => setNewView({ ...newView, subMode: e.target.value })}>
              {newView.mode === 'Numeric value' ? (
                <>
                  <option value="Bitonal">Bitonal</option>
                  <option value="Gradient">Gradient</option>
                  <option value="Intervals">Intervals</option>
                </>
              ) : (
                <>
                  <option value="Bitonal">Bitonal</option>
                  <option value="Map values">Map values</option>
                  <option value="Auto assign colors">Auto assign colors</option>
                </>
              )}
            </select>
          </label>
        </div>
        <div className="modal-footer">
          <button onClick={handleDelete} className="delete-button">Delete</button>
          <button onClick={handleSave} className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditViewModal;