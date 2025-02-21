import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import { useAppContext, View } from "../AppContext";
import { useState } from "react";
import EditViewModal from '../EditViewModal';

const ViewListTile = () => {    
    const { ifcviewer, views, selectedView, addView, setSelectedView, removeView, updateView } = useAppContext();
    const [viewToEdit, setViewToEdit] = useState<View | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleEditView = (view: View) => {
        setViewToEdit(view);
        setIsEditing(true);
    };

    const handleSaveView = (newView: View) => {
        updateView(newView.id, newView);
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setViewToEdit(null);
    };

    const handleSetView = (view: View) => {
        setSelectedView(view);
        if (ifcviewer && ifcviewer.updateFinder) {
            ifcviewer.updateFinder(view.query);
        }
    }

    return (
        <div className="tile">
            <label className="view-label">Views</label>
            <ul className="view-list">
                {views.map((view) => (
                    <li
                        key={view.id}
                        className={`view-item ${selectedView === view ? 'selected' : ''}`}
                        onClick={() => handleSetView(view)}
                    >
                        <div>
                            <span>{view.name}</span>
                            <br />
                            <span className="query">{view.query}</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleEditView(view); }} className="edit-button">
                            <MaterialSymbol icon="edit" size={24} fill grade={-25} className="edit-icon" />
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addView()} className="add-view-button">
                <MaterialSymbol icon="add" size={16} fill grade={-25} className="add-view-icon" />
                <span>Add View</span>
            </button>
            {isEditing && viewToEdit && (
                <EditViewModal
                view={viewToEdit}
                onClose={handleCloseModal}
                onSave={handleSaveView}
                onDelete={() => { removeView(viewToEdit.id); handleCloseModal(); }}
                />
            )}
        </div>
    );
};

export default ViewListTile;