import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Make sure the path is correct
import { ref, get, child } from "firebase/database";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [candidate, setCandidate] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "candidates"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const candidateList = Object.values(data);
          setCandidate(candidateList);
        } else {
          setCandidate([]);
        }
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchCandidates();
  }, []);

  const data = candidate.reduce((acc, candidated) => {
    if (candidated && candidated.party) {
      const partyIndex = acc.findIndex(item => item.party === candidated.party);
      if (partyIndex > -1) {
        acc[partyIndex].votes += candidated.votes || 0;
      } else {
        acc.push({ party: candidated.party, votes: candidated.votes || 0 });
      }
    }
    return acc;
  }, []);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: { stroke: colors.grey[100] },
          },
          legend: {
            text: { fill: colors.grey[100] },
          },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: {
          text: { fill: colors.grey[100] },
        },
      }}
      keys={["votes"]}
      indexBy="party"
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "dark2" }}
      borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Parties",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 8,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Votes",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 50,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [{ on: "hover", style: { itemOpacity: 1 } }],
        },
      ]}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} votes for party: ${e.indexValue}`
      }
    />
  );
};

export default BarChart;
