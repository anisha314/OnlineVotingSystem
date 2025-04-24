import { useEffect, React, useRef} from 'react';
import ScrollReveal from "scrollreveal";
import "../CSS/upcomingElections.css"

const UpcomingElections = ({voteStatus})=>{
    
    const revealRefBottom = useRef(null);
    const revealRefLeft = useRef(null);  
    const revealRefTop = useRef(null);
    const revealRefRight = useRef(null);
  
    useEffect(() => {
    
      // Initialize ScrollReveal
      ScrollReveal().reveal(revealRefBottom.current, {
        // You can configure options here
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        easing: 'ease',
        reset: 'true',
      });
    }, []);
    useEffect(() => {
    
      // Initialize ScrollReveal
      ScrollReveal().reveal(revealRefRight.current, {
        // You can configure options here
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'right',
        easing: 'ease',
        reset: 'true',
      });
    }, []);  useEffect(() => {
    
      // Initialize ScrollReveal
      ScrollReveal().reveal(revealRefLeft.current, {
        // You can configure options here
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'left',
        easing: 'ease',
        reset: 'true',
      });
    }, []);  useEffect(() => {
    
      // Initialize ScrollReveal
      ScrollReveal().reveal(revealRefTop.current, {
        // You can configure options here
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'top',
        easing: 'ease',
        reset: 'true',
      });
    }, []); 
    return(
        <div className="upcomingElections">
            <h2 ref={revealRefTop}>Elections</h2>
 
            <div className="upcomingElectionsCardContainer">
                <div className="upcomingElectionCard" ref={revealRefLeft}>
                    <h3>2025 India General Election</h3><br/>
                    <p>General elections will be held in India to elect the 543 members of the 18th Lok Sabha. The elections will be held in seven phases and the results will be announced.</p><br/>
                    <button><a href='/Vote'>Vote now</a></button>
                </div>
            </div>
        </div>
    )
}
export default UpcomingElections;