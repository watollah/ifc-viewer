import InfoTile from './overlay/InfoTile';
import ViewListTile from './overlay/ViewListTile';
import OpenCloseIfcTile from './overlay/OpenCloseIfcTile';
import ImportExportViewsTile from './overlay/ImportExportViewsTile';
import LegendTile from './overlay/LegendTile';
import { AppProvider } from "./AppContext";
import './App.scss';
import IfcViewerComponent from './IfcViewerComponent';

const App = () => {
  return (
      <AppProvider>
        <div className="container">
          <IfcViewerComponent />
          <div className="overlay">
            <div className="menubar">
              <OpenCloseIfcTile />
              <ImportExportViewsTile />
            </div>
            <LegendTile />
            <div className="sidebar">
              <InfoTile />
              <ViewListTile />
            </div>
          </div>
        </div>
      </AppProvider>
  );
}

export default App;