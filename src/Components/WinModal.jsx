import "./WinModal.css";

const WinModal = ({score}) => {


    return (
        <div>
                <div className="modal">  
                <h1>YOU WON!</h1>
                <p>with a score of {score} points</p>   
                </div>     
        </div>
    );
};


export default WinModal;