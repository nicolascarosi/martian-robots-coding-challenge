import useBoardData from '../../hooks/useBoardData';

const RobotScents: React.FC<{}> = () => {

    const {getRobotScents} = useBoardData();

    const robotScents: string[] = getRobotScents();

    return (
        <section className="robot-scents">
            <h1>Robot Scents</h1>
            {robotScents && robotScents.map((scent:string, i:number) => (
                <b key={`scent-${i}`}>{scent}</b>
            ))}
        </section>
    )
}

export default RobotScents;