import React, {useState} from 'react';

import useBoardData from '../../hooks/useBoardData';

const MAX_BOARD_SIZE = 50;
const MIN_BOARD_SIZE = 0;

const BoardParams: React.FC<{}> = () => {

    const {buildBoard} = useBoardData();

    const [boardWidth, setBoardWidth] = useState(0);
    const [boardHeight, setBoardHeight] = useState(0);

    const [widthValue, setWidthValue] = useState("");
    const [heightValue, setHeightValue] = useState("");
    const isFormValid:() => boolean = () => widthValue !== "" && heightValue !== "";

    const handleChangeBoardWidth = (e:React.FormEvent<HTMLInputElement>):void => {
        let value:number = parseInt(e.currentTarget.value);
        if (value >= MIN_BOARD_SIZE && value <= MAX_BOARD_SIZE) {
            setWidthValue(value.toString())
            setBoardWidth(value);
        }
        else {
            setWidthValue(widthValue.toString())
        }
    }

    const handleChangeBoardHeight = (e:React.FormEvent<HTMLInputElement>):void => {
        let value:number = parseInt(e.currentTarget.value);
        if (value >= MIN_BOARD_SIZE && value <= MAX_BOARD_SIZE) {
            setHeightValue(value.toString())
            setBoardHeight(value);
        }
        else {
            setHeightValue(heightValue.toString())
        }
    }

    const handleClickBuildBoard = ():void => {
        buildBoard(boardWidth, boardHeight);
        clearInputs();
    }

    const clearInputs = ():void => {
        setWidthValue("");
        setHeightValue("");
    }

    return (
        <div className="board-params">
            <h1>Board params</h1>
            <div className="form-element">
                <label>Board width</label>
                <input type="number" value={widthValue} onChange={handleChangeBoardWidth} placeholder="X" />
            </div>
            <div className="form-element">
                <label>Board height</label>
                <input type="number" value={heightValue} onChange={handleChangeBoardHeight} placeholder="Y" />
            </div>
            <button onClick={handleClickBuildBoard} disabled={!isFormValid()}>Build board</button>
        </div>
    )
}

export default BoardParams;