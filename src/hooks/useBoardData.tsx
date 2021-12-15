import { useContext } from "react";
import { BoardContext } from "../context";
import { degreesToOrientation, orientationToDegrees } from "../utils/functions";
import { InitialContextTypes, currentRobotTypes, cordinateTypes } from '../context.types';

const ROTATE_LEFT = -90;
const ROTATE_RIGHT = 90;

let currentRobotId = 1;


const useBoardData = () => {

  const [state, setState] = useContext(BoardContext);

  let currentRobotIsLost = false;

  const getBoard = () => state.board;
  const getRobotScents = () => state.robot_scents;
  const getBoardBuilded = () => state.board_builded;
  const getBoardWidth = () => state.board.width;
  const getBoardHeight = () => state.board.height;

  const setLostCordinates = (position: cordinateTypes):void => {
    let lostCordinates = [...state.lost_cordinates];
    lostCordinates.push(position);
    setState((prevState: InitialContextTypes) => ({
      ...prevState,
      lost_cordinates: lostCordinates,
    }));
  }

  const setBoardBuilded = (isBuilded: boolean):void => {
    setState((prevState: InitialContextTypes) => ({
      ...prevState,
      board_builded: isBuilded,
    }));
  }

  const buildAndMoveRobot = (direction: string, startCordinates: cordinateTypes, instructions: string):void => {
    let currentRobot = {...state.current_robot};
    currentRobot.current_direction = orientationToDegrees(direction);
    currentRobot.cordinates = startCordinates;
    setState((prevState: InitialContextTypes) => ({
      ...prevState,
      current_robot: currentRobot
    }), moveRobot(currentRobot, instructions));
  }

  const constructBoardGrid = (boardWidth: number, boardHeight: number):number[][] => {
    let grid = [];
    let rows = [];
    //Rows
    for (let x = 0; x < boardWidth; x++) rows.push(0);
    // Columns
    for (let y = 0; y < boardHeight; y++) grid.push([...rows]);

    return grid;
  }

  const buildBoard = (boardWidth: number, boardHeight: number):void => {
    setState((prevState: InitialContextTypes) => ({
      ...prevState,
      board: {
        width: boardWidth,
        height: boardHeight,
        grid: constructBoardGrid(boardWidth, boardHeight) 
      }
    }), setBoardBuilded(true));
  }

  const isLost = (position: cordinateTypes):boolean => {
    if (!state.lost_cordinates.some((elem: cordinateTypes) => elem.x === position.x && elem.y === position.y)) {
      currentRobotIsLost = true;
      setLostCordinates(position);
      return true;
    }
    return false
  }

  const isOutsideBoard = (position: cordinateTypes):boolean => {
    if (position.x < 0 || position.x >= state.board.width || position.y < 0 || position.y >= state.board.height) {
      return true;
    }
    return false
  }

  const moveRobot = (currentRobot: currentRobotTypes, instructions: string):void => {
    let currentDirection: number = currentRobot.current_direction;
    let newPosition: cordinateTypes = currentRobot.cordinates;
    let lastPosition: cordinateTypes = currentRobot.cordinates;

    instructions.split('').every(move => {
      switch (move.toUpperCase()) {
        //RIGHT
        case 'R':
          currentDirection += ROTATE_RIGHT;
          break;
        //LEFT
        case 'L':
          currentDirection += ROTATE_LEFT;
          break;
        //FORWARD
        case 'F':
          lastPosition = {...newPosition};
          switch (currentDirection) {
            case 0:
              newPosition.y--;
              break;
            case 90:
              newPosition.x++;
              break;
            case 180:
              newPosition.y++;
              break;
            case 270:
              newPosition.x--;
              break;
          }
          break;
      }

      if (isOutsideBoard(newPosition)) {
        if (isLost(newPosition)) {
          return false;
        }
        else {
          newPosition = lastPosition;
        }
      }

      if (currentDirection === 360) {
        currentDirection = 0;
      } else if (currentDirection < 0) {
        currentDirection += 360;
      }

      return true;
    });

    currentRobot = {
      current_direction: currentDirection,
      cordinates: newPosition,
      lost: currentRobotIsLost
    }

    if(!currentRobotIsLost) {
      setRobotOnBoard(newPosition);
    }

    setRobotScent(currentRobot);
  }

  const setRobotOnBoard = (cordinates: cordinateTypes):void => {
    let newGrid = [...state.board.grid];
    newGrid[cordinates.y][cordinates.x] = currentRobotId;
    currentRobotId++;

    setState((prevState: InitialContextTypes) => ({
      ...prevState,
      board: {
        ...prevState.board,
        grid: newGrid,
      }
    }));
  }

  const setRobotScent = (currentRobot: currentRobotTypes):void => {
    let robotScents:string[] = [...state.robot_scents];
    let scent:string = `${currentRobot.cordinates.x} ${currentRobot.cordinates.y} ${degreesToOrientation(currentRobot.current_direction)}`;

    if (currentRobot.lost) {
      scent += ' LOST';
    }

    robotScents.push(scent);

    setState((prevState: InitialContextTypes) => ({
      ...prevState,
      robot_scents: robotScents
    }));
  }

  return {
    getBoard,
    getRobotScents,
    getBoardBuilded,
    getBoardWidth,
    getBoardHeight,
    setBoardBuilded,
    buildBoard,
    buildAndMoveRobot
  }

}


export default useBoardData;
