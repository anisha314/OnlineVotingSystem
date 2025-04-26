import './Vote.css';
import UserNavbar from '../../../Navbar/UserNavbar';
import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ScrollReveal from "scrollreveal";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Cookies from 'js-cookie';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../../../firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'rgb(255, 255, 255)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { id: 'fullname', label: 'Candidate Name', minWidth: 250, align: 'left' },
  { id: 'party', label: 'Party', minWidth: 120 },
  { id: 'age', label: 'Age', minWidth: 180, align: 'center' },
  { id: 'photo', label: '', minWidth: 100, align: 'right' },
  { id: 'action', label: '', minWidth: 200 },
];

export default function CustomizedTables() {
  const revealRefBottom = useRef(null);
  const revealRefLeft = useRef(null);
  const revealRefTop = useRef(null);
  const revealRefRight = useRef(null);

  const [candidate, setCandidate] = useState([]);
  const [voter, setVoter] = useState({});
  const [open, setOpen] = useState(false);

  const voterid = Cookies.get('myCookie'); // voter key from cookie

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    [revealRefBottom, revealRefLeft, revealRefTop, revealRefRight].forEach((ref, index) => {
      ScrollReveal().reveal(ref.current, {
        duration: 1000,
        delay: 300 + index * 100,
        distance: '50px',
        origin: ['bottom', 'left', 'top', 'right'][index],
        easing: 'ease',
        reset: true,
      });
    });
  }, []);

  useEffect(() => {
    const candidateRef = ref(db, 'candidates');
    onValue(candidateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.keys(data).map(key => ({
          _id: key,
          ...data[key],
        }));
        setCandidate(parsed);
      } else {
        setCandidate([]);
      }
    });
  }, []);

  useEffect(() => {
    if (voterid) {
      const voterRef = ref(db, `voters/${voterid}`);
      onValue(voterRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setVoter(data); // voterid is already in path
        }
      });
    }
  }, [voterid]);

  const handleVote = async (candidateId) => {
    if (voter.voteStatus) {
      alert("You Have Already Voted");
      return;
    }

    try {
      const selectedCandidate = candidate.find(c => c._id === candidateId);
      const updatedVotes = (selectedCandidate.votes || 0) + 1;

      await update(ref(db, `candidates/${candidateId}`), {
        ...selectedCandidate,
        votes: updatedVotes,
      });

      await update(ref(db, `voters/${voterid}`), {
        ...voter,
        voteStatus: true,
      });

      handleOpen();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="Vote-Page">
      <UserNavbar />
      <div className="candidate">
        <h2 ref={revealRefLeft}>2025 India General Election</h2>
        <div className="Heading1" ref={revealRefRight}>
          <p><span>GIVE</span> Your Vote</p>
        </div>
        <Modal
          className="VoteContent"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={open} className="VoteGivenBox">
            <Box sx={style} className="MessageBox">
              <h2>Congratulations!</h2>
              <h5>You Have Successfully Voted</h5>
              <button onClick={handleClose}><a href="/User">Ok</a></button>
            </Box>
          </Fade>
        </Modal>
        <TableContainer component={Paper} ref={revealRefBottom}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow className="TableRow">
                {columns.map(column => (
                  <TableCell
                    className="table_row_heading"
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {candidate.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>
                    <span className="Name-Row text">{row.fullName}</span>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.party}</StyledTableCell>
                  <StyledTableCell align="center">{row.age}</StyledTableCell>
                  <StyledTableCell align="right" className="Symbol">
                    {row.symbol ? (
                      <img src={row.symbol} alt="symbol" />
                    ) : (
                      <p></p>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="voteButton">
                    <Button
                      variant="contained"
                      onClick={() => handleVote(row._id)}
                      disabled={voter.voteStatus} // Optional: disable if already voted
                    >
                      Vote
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
