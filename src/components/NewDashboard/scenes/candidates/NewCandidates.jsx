import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CssBaseline, ThemeProvider, Button } from "@mui/material";
import { tokens } from "../../theme";
import { ColorModeContext, useMode } from "../../theme";

import Header from "../../newComponents/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

import { getDatabase, ref, onValue, remove } from "firebase/database";
import { app } from "../../../../firebase";

const NewCandidates = () => {
  const [theme, colorMode] = useMode();
  const [candidates, setCandidates] = useState([]);
  const colors = tokens(theme.palette.mode);
  const db = getDatabase(app);

  useEffect(() => {
    const candidateRef = ref(db, "candidates");
    const unsubscribe = onValue(candidateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedData = Object.keys(data).map((key) => ({
          _id: key,
          ...data[key]
        }));
        setCandidates(parsedData);
      } else {
        setCandidates([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteCandidate = async (id) => {
    try {
      await remove(ref(db, `candidates/${id}`));
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  const columns = [
    {
      field: "img",
      headerName: "PHOTO",
      renderCell: ({ row: { image } }) => (
        <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center">
          {image ? <img src={image} alt="Candidate" height={50} /> : "No Image"}
        </Box>
      )
    },
    {
      field: "fullName",
      headerName: "CANDIDATE NAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "bio",
      headerName: "CANDIDATE BIO",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "party",
      headerName: "PARTY",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "AGE",
      type: "number",
      flex: 0.5,
    },
    {
      headerName: "ACTION",
      field: "actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <span className="Button-span">
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.blueAccent[600], color: 'white', marginRight: 2 }}
            >
              Edit
            </Button>
          </span>
          <span className="Button-span">
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.redAccent[600], color: 'white' }}
              onClick={() => deleteCandidate(row._id)}
            >
              Delete
            </Button>
          </span>
        </Box>
      ),
    }
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="appNew">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Box m="0px 20px">
              <Header title="CANDIDATES INFORMATION" subtitle="Managing the Candidates" />
              <Box
                m="20px 0 0 0"
                height="70vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                }}
              >
                <DataGrid rows={candidates} columns={columns} getRowId={(row) => row._id} />
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default NewCandidates;
