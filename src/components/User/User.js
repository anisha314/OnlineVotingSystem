import { useState, useEffect, React, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import UserNavbar from "../Navbar/UserNavbar";
import './CSS/user.css';
import UserCard from './Components/UserCard/userCard';
import UpcomingElections from './Components/UpcomingElections';
import ScrollReveal from "scrollreveal";
import { getDatabase, ref, get } from "firebase/database";
import Cookies from 'js-cookie';
import { app } from '../../firebase';

const User = () => {
  const location = useLocation();
  console.log('location',location);
  const voterKeyFromState = location.state?.voterKey;
  console.log(voterKeyFromState);
  // Use voterKey from cookie if it's not in state
  const storedVoterKey = Cookies.get('myCookie');
  const voterKeyToUse = voterKeyFromState || storedVoterKey;

  // Set cookie if voterKeyFromState is available and not already stored
  useEffect(() => {
    if (voterKeyFromState && !storedVoterKey) {
      Cookies.set('myCookie', voterKeyFromState, { expires: 7 });
    }
  }, [voterKeyFromState, storedVoterKey]);

  const revealRefBottom = useRef(null);
  const revealRefLeft = useRef(null);
  const revealRefTop = useRef(null);
  const revealRefRight = useRef(null);

  const db = getDatabase(app);
  const [singleVoter, setVoter] = useState({});

  useEffect(() => {
    ScrollReveal().reveal(revealRefBottom.current, { duration: 1000, delay: 200, distance: '50px', origin: 'bottom', easing: 'ease', reset: true });
    ScrollReveal().reveal(revealRefRight.current, { duration: 1000, delay: 200, distance: '50px', origin: 'right', easing: 'ease', reset: true });
    ScrollReveal().reveal(revealRefLeft.current, { duration: 1000, delay: 200, distance: '50px', origin: 'left', easing: 'ease', reset: true });
    ScrollReveal().reveal(revealRefTop.current, { duration: 1000, delay: 200, distance: '50px', origin: 'top', easing: 'ease', reset: true });
  }, []);

  useEffect(() => {
    const fetchVoter = async () => {
      if (!voterKeyToUse) return;

      try {
        const snapshot = await get(ref(db, `voters/${voterKeyToUse}`));
        if (snapshot.exists()) {
          setVoter(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching voter data:", error);
      }
    };

    fetchVoter();
  }, [voterKeyToUse]);

  return (
    <div className="User">
      <UserNavbar />
      <div className="Heading2" ref={revealRefTop}>
        <h3>Welcome <span>{singleVoter.firstName}</span></h3>
      </div>
      <div className="userPage">
        <div className="userDetails" ref={revealRefLeft}>
          <UserCard voter={singleVoter} />
        </div>
        <div className='details' ref={revealRefRight}>
          <h2> Welcome to <span>Online Voting Platform</span></h2>
          <h6>Exercise Your Right to Vote Anytime, Anywhere</h6>
          <p>Welcome to our online voting platform, where your voice matters. With the convenience of modern technology, we bring democracy to your fingertips, enabling you to participate in important decisions and elections from the comfort of your own home. Our secure and user-friendly platform ensures that your vote is counted accurately and confidentially. Whether it's electing your local representatives, deciding on community initiatives, or participating in organizational polls, our platform empowers you to make a difference.</p>
        </div>
      </div>
      <UpcomingElections voteStatus={singleVoter.voteStatus} />
    </div>
  );
};

export default User;
