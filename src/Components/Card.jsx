import "./Card.css";

const Card = ({card}) => {
    
    return (
        <div className="aCard">   
        
        {/* <h1>{card.value}</h1>
        <h2>{card.suit}</h2> */}
        <img src={`${card.image}`} alt="Fan..." className="cardImg"/>
        
        </div>
    );
};


export default Card;