import { useAppContext } from "../AppContext";
import { exportToJson, importFromJson } from "../utils/io";
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';

const ImportExportViewsTile = () => {
  const { views, setViews } = useAppContext();

  const handleImport = (inputElement: HTMLInputElement) => importFromJson(inputElement, setViews);
  const handleExport = () => exportToJson(views);

  function openFilePicker() {  
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        handleImport(target);
      }
    };
    input.click();
  }

  return (
    <div className="tile import-export-views-tile">
      <button className="import-views-button" onClick={openFilePicker}>
        <MaterialSymbol icon="upload" fill grade={-25} className="large-icon" />
      </button>
      <button className="export-views-button" onClick={handleExport}>
        <MaterialSymbol icon="download" fill grade={-25} className="large-icon" />
      </button>
    </div>
  );
};

export default ImportExportViewsTile;