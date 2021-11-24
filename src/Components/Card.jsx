import "./Card.css";
import cardBack from './img/pngegg.png';

const Card = ({card}) => {
    

    return (
        <div className="aCard">   
        
         {/* <img src={`${card.image}`} alt="Framsida" className="cardImg"/>  */}
         <img src={`${cardBack}`} alt="Test" className="cardImg"/>
         
        </div>
    );
};


export default Card;