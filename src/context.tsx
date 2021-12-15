import React, { useState } from "react";
import { InitialContextTypes, ProviderProps } from "./context.types";

const initialContext: InitialContextTypes = {
    board: {
        width: 0,
        height: 0,
        grid: []
    },
    board_builded: false,
    current_robot: {
        current_direction: 0,
        cordinates: {
            x: 0,
            y: 0,
        },
        lost: false
    },
    robot_scents: [],
    lost_cordinates: [{
        x: 5,
        y: 1,
    }],
}

const BoardContext = React.createContext<any>(initialContext);

const BoardProvider = ({children}: ProviderProps) => {
    const [state, setState] = useState<any>(initialContext);
    return <BoardContext.Provider value={[state, setState]}>{children}</BoardContext.Provider>;
}

export { BoardContext, BoardProvider, initialContext };
