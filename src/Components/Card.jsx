import "./Card.css";
import cardBack from './img/pngegg.png';

const Card = ({card, handleChoice, flipped}) => {
    
    const handleClick = () => {
        handleChoice(card);
    }

    return (
        <div className="aCard">   
        
        <div className={flipped ? "flipped" : ""}>
            <img 
            src={`${card.image}`} 
            alt="Framsida" 
            className="cardImgFront"
            />
            
            <img 
            src={`${cardBack}`}
            alt="Baksida" 
            onClick={handleClick}   
            className="cardImgBack"
            />
        </div>
         
        </div>
    );
};


export default Card;