import * as OBC from "@thatopen/components";
import { useEffect, useRef } from 'react';
import { IfcViewer, useAppContext } from './AppContext';

const IfcViewerComponent = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);
    const { setIfcViewer } = useAppContext();

    useEffect(() => {
        if (initializedRef.current) return;

        const div = divRef.current;
        if (!div) return;
            
        const components = new OBC.Components();
        const worlds = components.get(OBC.Worlds);
        const world = worlds.create<
            OBC.SimpleScene,
            OBC.SimpleCamera,
            OBC.SimpleRenderer
        >();

        /* Initialize the scene */
        world.scene = new OBC.SimpleScene(components);
        world.renderer = new OBC.SimpleRenderer(components, div);
        world.camera = new OBC.SimpleCamera(components);

        components.init();
        world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
        world.scene.setup();

        /* Draw a grid */
        const grids = components.get(OBC.Grids);
        grids.create(world);

        /* Set background transparent */
        world.scene.three.background = null;

        /*Set up the IFC loader */
        const fragments = components.get(OBC.FragmentsManager);
        const fragmentIfcLoader = components.get(OBC.IfcLoader);
        fragmentIfcLoader.setup().then(() => {
            fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
        });

        /* Set up the IFC finder */
        const finder = components.get(OBC.IfcFinder);
        const queryGroup = finder.create();
        
        
        const basicQuery = new OBC.IfcBasicQuery(components, {
            name: "category",
            inclusive: false,
            rules: [],
        });
        queryGroup.add(basicQuery);
        const categoryRule: OBC.IfcCategoryRule = {
            type: "category",
            value: /.*/,
        };
        basicQuery.rules.push(categoryRule);

        const hider = components.get(OBC.Hider);

        const updateFinder = async (query: string) => {
            if (!ifcViewer.ifcFile || !ifcViewer.world || !ifcViewer.model) {
                alert("No IFC file loaded!");
                return;
            }
            basicQuery.clear();
            categoryRule.value = new RegExp(query);
            await queryGroup.update(ifcViewer.model.uuid, ifcViewer.ifcFile);
            const items = queryGroup.items;
            console.log(items);
            if (Object.keys(items).length === 0) {
              alert("No items found!");
              return;
            }
            //color items
            hider.set(false);
            hider.set(true, items);
        };

        /* Expose the IfcViewer */
        const ifcViewer: IfcViewer = {
            ifcFile: null,
            world: world,
            model: null,
            fragments: fragments,
            fragmentIfcLoader: fragmentIfcLoader,
            updateFinder: updateFinder
        };
        setIfcViewer(ifcViewer);
        initializedRef.current = true;

    }, [setIfcViewer]);

    return <div ref={divRef} className="ifc-viewer"></div>;
}

export default IfcViewerComponent;