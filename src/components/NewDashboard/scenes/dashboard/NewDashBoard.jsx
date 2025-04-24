import {
    Box,
    IconButton,
    Typography,
    useTheme,
    CircularProgress,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import Header from "../../newComponents/Header";
  import { tokens } from "../../theme";
  import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
  import GroupIcon from "@mui/icons-material/Group";
  import PersonIcon from "@mui/icons-material/Person";
  import HowToVoteIcon from "@mui/icons-material/HowToVote";
  import Result from "../../newComponents/BarChart";
  import StatBox from "../../newComponents/StatBox";
  import "../../New.css";
  import { ref, get, child } from "firebase/database";
  import { db } from "../../../../firebase"; // Update path if needed
  
  const NewDashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [data, setData] = useState({ voters: 0, candidates: 0, voted: 0 });
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const upcomingElections = [
      { id: "1", name: "Presidential Election", date: "2024-11-05" },
      { id: "2", name: "Senate Election", date: "2024-11-05" },
      { id: "3", name: "Governor Election", date: "2024-11-05" },
      { id: "4", name: "Local Council Election", date: "2024-11-05" },
    ];
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const dbRef = ref(db);
  
          const votersSnapshot = await get(child(dbRef, "voters"));
          const candidatesSnapshot = await get(child(dbRef, "candidates"));
  
          const votersData = votersSnapshot.exists() ? votersSnapshot.val() : {};
          const candidatesData = candidatesSnapshot.exists()
            ? candidatesSnapshot.val()
            : {};
  
          const totalVoters = Object.keys(votersData).length;
          const totalCandidates = Object.keys(candidatesData).length;
          const votersVoted = Object.values(votersData).filter(
            (voter) => voter.voteStatus === true
          ).length;
  
          setData({
            voters: totalVoters,
            candidates: totalCandidates,
            voted: votersVoted,
          });
  
          // Convert candidates object to array for rendering
          const candidateArray = Object.values(candidatesData);
          setCandidates(candidateArray);
        } catch (error) {
          console.error("Error fetching Firebase data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <CircularProgress />;
  
    return (
      <div className="mainBox">
        <Box m="20px" height="84vh">
          {/* HEADER */}
          <Box display="flex" mb="10px" justifyContent="space-between" alignItems="center">
            <Header title="ADMIN DASHBOARD" subtitle="Welcome Administrator" />
          </Box>
  
          {/* GRID & CHARTS */}
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
            {/* ROW 1: Stat Boxes */}
            <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
              <StatBox title={data.voters} subtitle="Total Voters" icon={<GroupIcon sx={{ color: colors.greenAccent[600], fontSize: "35px" }} />} />
            </Box>
            <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
              <StatBox title={data.candidates} subtitle="Total Candidates" icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: "35px" }} />} />
            </Box>
            <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
              <StatBox title={data.voted} subtitle="Total Voters who have Voted" icon={<HowToVoteIcon sx={{ color: colors.greenAccent[600], fontSize: "35px" }} />} />
            </Box>
  
            {/* ROW 2: Election Result + Candidate List */}
            <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
              <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
                  Election Result
                </Typography>
                <IconButton>
                  <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                </IconButton>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <Result isDashboard={true} />
              </Box>
            </Box>
  
            <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
              <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
                <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
                  Current Leaders
                </Typography>
              </Box>
              {candidates.map((candidate, i) => (
                <Box key={i} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
                  <Box>
                    <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                      {candidate.id}
                    </Typography>
                    <Typography color={colors.grey[100]}>{candidate.fullName}</Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{candidate.party}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </div>
    );
  };
  
  export default NewDashboard;
  