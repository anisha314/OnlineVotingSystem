import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import CountUp from "react-countup";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            <CountUp end={title} duration={3.5} />
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;