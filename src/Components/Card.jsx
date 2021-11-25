import "./Card.css";
import cardBack from './img/pngegg.png';

const Card = ({card, handleChoice, flipped, freeze}) => {
    // If freeze is true, you cant click a card... mohahaha!
    const handleClick = () => {
        if(!freeze){
            handleChoice(card);
        }
        
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
            />
        </div>
         
        </div>
    );
};


export default Card;