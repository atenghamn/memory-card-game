

const Card = ({card}) => {
    
    return (
        <div>   
        <h1>{card.value}</h1>
        <h2>{card.suit}</h2>
        <img src={`${card.image}`} alt="Fan..." />
        
        </div>
    );
};


export default Card;