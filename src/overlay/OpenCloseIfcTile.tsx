import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import { useAppContext } from '../AppContext';

const OpenCloseIfcTile = () => {
  const { ifcviewer, resetViewer } = useAppContext();

  function openFilePicker() {  
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".ifc";
    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0 && ifcviewer.world && ifcviewer.fragmentIfcLoader) {
        resetViewer();
        const file = target.files[0];
        const data = await file.arrayBuffer();
        const buffer = new Uint8Array(data);
        const model = await ifcviewer.fragmentIfcLoader.load(buffer);
        model.name = file.name;

        ifcviewer.ifcFile = new File([data], "file");
        ifcviewer.model = model;
        ifcviewer.world.scene.three.add(model);
      }
    };
    input.click();
  }

  return (
    <div className="tile open-close-ifc-tile">
        <button className="open-ifc-button" onClick={openFilePicker}>
            <MaterialSymbol icon="folder" fill grade={-25} className="large-icon" />
        </button>
        <button className="close-ifc-button" onClick={resetViewer}>
            <MaterialSymbol icon="close" fill grade={-25} className="large-icon" />
        </button>
    </div>
  );
};

export default OpenCloseIfcTile;