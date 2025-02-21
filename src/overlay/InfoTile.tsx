import { useAppContext } from "../AppContext";

const InfoTile = () => {
    const { selectedView } = useAppContext();

    return (
        selectedView ? (
            <div className="tile">
                <h3>{selectedView.name}</h3>
                <p>
                    {selectedView.ifcAttribute}<br/>
                    Min Value: 0000<br/>
                    Max Value: 0000<br/>
                    Avg.: 00 %<br/>
                    <br/>
                    Coverage: 00 %
                </p>
            </div>
        ) : <></>
    );
};

export default InfoTile;