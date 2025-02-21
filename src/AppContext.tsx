import * as OBC from "@thatopen/components";
import { FragmentsGroup } from "@thatopen/fragments";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface IfcViewer {
  ifcFile: File | null;
  world: OBC.World | null;
  model: FragmentsGroup | null;
  fragments: OBC.FragmentsManager | null;
  fragmentIfcLoader: OBC.IfcLoader | null;
  updateFinder?: (query: string) => void;
}

export interface View {
  id: number;
  name: string;
  query: string;
  modelTransparent: boolean;
  modelShaded: boolean;
  mode: string;
  subMode: string;
}

interface AppContextProps {
  ifcviewer: IfcViewer;
  setIfcViewer: React.Dispatch<React.SetStateAction<IfcViewer>>;
  resetViewer: () => void;

  views: View[];
  setViews: React.Dispatch<React.SetStateAction<View[]>>;
  selectedView: View | null;
  setSelectedView: (view: View | null) => void;
  addView: () => void;
  updateView: (id: number, updatedView: Partial<View>) => void;
  removeView: (id: number) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const[ifcviewer, setIfcViewer] = useState<IfcViewer>({ ifcFile: null, world: null, model: null, fragments: null, fragmentIfcLoader: null });
  const resetViewer = () => {
    if (ifcviewer.fragments) {
      ifcviewer.fragments.dispose();
    }
  };

  const [views, setViews] = useState<View[]>([]);
  const [selectedView, setSelectedView] = useState<View | null>(null);

  const addView = () => {
    const newView: View = {
      id: views.length + 1,
      name: `View ${views.length + 1}`,
      query: "",
      modelTransparent: false,
      modelShaded: true,
      mode: 'Numeric value',
      subMode: 'Bitonal'
    };
    setViews((prev) => [...prev, newView]);
    setSelectedView(newView);
  };

  const updateView = (id: number, updatedView: Partial<View>) => {
    setViews((prev) =>
      prev.map((view) => (view.id === id ? { ...view, ...updatedView } : view))
    );
  };

  const removeView = (id: number) => {
    setViews((prev) => prev.filter((view) => view.id !== id));
    if (selectedView?.id === id) {
      setSelectedView(null);
    }
  };

  return (
    <AppContext.Provider value={{ ifcviewer, setIfcViewer, resetViewer, views, setViews, selectedView, setSelectedView, addView, updateView, removeView }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a ViewsProvider");
  }
  return context;
};

export { AppContext, AppProvider, useAppContext };