export type InitialContextTypes = {
    board: BoardTypes,
    board_builded: boolean,
    current_robot: currentRobotTypes,
    robot_scents: [],
    lost_cordinates: cordinateTypes[]
}

export type BoardTypes = {
    width: number,
    height: number,
    grid: []
}

export type currentRobotTypes = {
    current_direction: number,
    cordinates: cordinateTypes,
    lost: boolean
}

export type cordinateTypes = {
    x: number,
    y: number
}

export type ProviderProps = {
    children: React.ReactNode,
}