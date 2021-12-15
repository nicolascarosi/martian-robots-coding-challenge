import useBoardData from '../../hooks/useBoardData';
import { BoardTypes } from '../../context.types';

const Board: React.FC<{}> = () => {

    const {getBoard} = useBoardData();

    const board: BoardTypes = getBoard();

    return (
        <section className="board">
            <h1>Board</h1>
            <div className="board-container">
                {board && board.grid.map((row: number[], i: number) => (
                    <div className="board-row" key={`board-row-${i}`}>
                        {row.map((col:number, j:number) => (
                            <span key={`board-row-${i}-col-${j}`} className="board-item">{col ? col : ''}</span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Board;