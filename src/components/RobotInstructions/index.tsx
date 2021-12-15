import {useState} from 'react';

import useBoardData from '../../hooks/useBoardData';
import { validateInput } from '../../utils/functions';
import { cordinateTypes } from '../../context.types';

const REGEX_DIRECTION = /^[NSEW]{1}$/;
const REGEX_INSTRUCTIONS = /^[RLF]{1,100}$/;

const RobotInstructions: React.FC<{}> = () => {

    const {buildAndMoveRobot, getBoardWidth, getBoardHeight} = useBoardData();

    const boardWidth:number = getBoardWidth();
    const boardHeight:number = getBoardHeight();

    const [robotStartCordinates, setRobotStartCordinates] = useState<cordinateTypes>({x: 0, y: 0});
    const [robotDirection, setRobotDirection] = useState('N');
    const [robotInstructions, setRobotInstructions] = useState('');

    const [xValue, setXValue] = useState("");
    const [yValue, setYValue] = useState("");
    const [initialDirectionValue, setInitialDirectionValue] = useState("");
    const [instructionsValue, setInstructionsValue] = useState("");
    const isFormValid:() => boolean = () => xValue !== "" && yValue !== "" && initialDirectionValue !== "" && instructionsValue !== "";

    const handleChangeXCordinate = (e:React.FormEvent<HTMLInputElement>):void => {
        let value:number = parseInt(e.currentTarget.value);
        if (value >= 0 && value <= boardWidth) {
            setXValue(value.toString())
            setRobotStartCordinates(prevState => ({
                ...prevState,
                x: value
            }));
        }
        else {
            setXValue(xValue)
        }
        
    }

    const handleChangeYCordinate = (e:React.FormEvent<HTMLInputElement>):void => {
        let value:number = parseInt(e.currentTarget.value);
        if (value >= 0 && value <= boardHeight) {
            setYValue(value.toString())
            setRobotStartCordinates(prevState => ({
                ...prevState,
                y: value
            }));
        }
        else {
            setYValue(yValue)
        }
    }

    const handleChangeRobotDirection = (e:React.FormEvent<HTMLInputElement>):void => {
        let value:string = e.currentTarget.value.toUpperCase();
        if (validateInput(REGEX_DIRECTION, value)) {
            setInitialDirectionValue(value)
            setRobotDirection(value);
        }
        else {
            setInitialDirectionValue(initialDirectionValue);
        }
    }

    const handleChangeRobotInstructions = (e:React.FormEvent<HTMLInputElement>):void => {
        let value:string = e.currentTarget.value.toUpperCase();
        if (validateInput(REGEX_INSTRUCTIONS, value)) {
            setInstructionsValue(value)
            setRobotInstructions(value);
        }
        else {
            setInstructionsValue(instructionsValue);
        }
    }

    const handleClickMoveRobot = ():void => {
        buildAndMoveRobot(robotDirection, robotStartCordinates, robotInstructions);
        clearInputs();
    }

    const clearInputs = ():void => {
        setXValue("");
        setYValue("");
        setInitialDirectionValue("");
        setInstructionsValue("");
    }

    return (
        <section className="robot-instructions">
            <h1>New robot</h1>
            <div className="form-element">
                <label>Robot start cordinates</label>
                <input type="number" value={xValue} onChange={handleChangeXCordinate} min="0" max={boardWidth} placeholder="X" />
                <input type="number" value={yValue} onChange={handleChangeYCordinate} min="0" max={boardHeight} placeholder="Y" />
            </div>
            <div className="form-element">
                <label>Robot initial direction</label>
                <input type="text" value={initialDirectionValue} onChange={handleChangeRobotDirection} placeholder="N, S, E, W" />
                <span>N: North, S: South, E: East, W: West</span>
            </div>
            <div className="form-element">
                <label>Robot instructions</label>
                <input type="text" value={instructionsValue} onChange={handleChangeRobotInstructions} placeholder="L, R, F" />
                <span>L: Turn left, R: Turn right, F: Forward</span>
            </div>
            <button onClick={handleClickMoveRobot} disabled={!isFormValid()}>Move robot</button>
        </section>
    )
}

export default RobotInstructions;