//import { useAppContext } from "../AppContext";

const LegendTile = () => {
    //const { selectedView } = useAppContext();

    return (
        <div className="tile legend">
                <span className="legend-min">min</span>
                <span className="legend-max">max</span>
                <div className="legend-gradient"></div>
        </div>
    );
};

export default LegendTile;