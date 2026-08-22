import "./StatCard.css";

function StatCard(props) {

    return (

        <div className="stat-card">

            <h3>{props.title}</h3>

            <p>{props.value}</p>

        </div>

    );

}
export default StatCard;