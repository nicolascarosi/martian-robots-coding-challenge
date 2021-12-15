import BoardParams from './components/Board/BoardParams';
import useBoardData from './hooks/useBoardData';
import Board from './components/Board';
import RobotScents from './components/RobotScents';
import RobotInstructions from './components/RobotInstructions';

const App: React.FC<{}> = () => {

    const {getBoardBuilded} = useBoardData();

    const boardBuilded:boolean = getBoardBuilded();
    
    return (
        <>
            {boardBuilded ? 
                <>
                    <Board />
                    <div className="information-container">
                        <RobotInstructions />
                        <RobotScents />
                    </div>
                </>
            : <BoardParams />}
        </>
    );
}

export default App;