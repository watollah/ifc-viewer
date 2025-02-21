import { View } from "../AppContext";

export const exportToJson = (views: View[]) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ views }));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "views.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const importFromJson = (inputElement: HTMLInputElement, setViews: (views: View[]) => void) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    try {
      const importedViews = JSON.parse(e.target?.result as string).views;
      console.log("Imported Views:", importedViews);
      setViews(importedViews);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };
  if (inputElement.files) {
    console.log("File selected:", inputElement.files[0]);
    fileReader.readAsText(inputElement.files[0]);
  }
};