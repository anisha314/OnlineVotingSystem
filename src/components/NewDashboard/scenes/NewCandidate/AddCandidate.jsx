import { Box, Button, TextField, CssBaseline, ThemeProvider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "../../../../firebase";
import { useNavigate } from 'react-router-dom';

import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Header from "../../newComponents/Header";
import { ColorModeContext, useMode } from "../../theme";

const AddCandidate = () => {
  const [theme, colorMode] = useMode();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const db = getDatabase(app);

  const showSuccess = () => toast.success("Candidate Created Successfully!");
  const showError = () => toast.error("Something went wrong. Please try again!");

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const newCandidateRef = push(ref(db, "candidates"));
      await set(newCandidateRef, {
        fullName: values.fullName,
        age: values.age,
        party: values.party,
        bio: values.bio,
      });

      showSuccess();
      resetForm();
      setTimeout(() => navigate('/Candidate'), 1000);
    } catch (error) {
      console.error("Firebase Error:", error);
      showError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="appNew">
          <Sidebar />
          <main className="content">
            <Topbar />
            <ToastContainer />
            <Box m="0px 20px">
              <Header title="CREATE NEW CANDIDATE" subtitle="Create a New Candidate Profile" />
              <br />
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={candidateSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="grid"
                      gap="20px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Candidate Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fullName}
                        name="fullName"
                        error={!!touched.fullName && !!errors.fullName}
                        helperText={touched.fullName && errors.fullName}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Candidate Age"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.age}
                        name="age"
                        error={!!touched.age && !!errors.age}
                        helperText={touched.age && errors.age}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Candidate Party"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.party}
                        name="party"
                        error={!!touched.party && !!errors.party}
                        helperText={touched.party && errors.party}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Candidate Bio"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bio}
                        name="bio"
                        error={!!touched.bio && !!errors.bio}
                        helperText={touched.bio && errors.bio}
                        sx={{ gridColumn: "span 4" }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button type="submit" disabled={loading} color="secondary" variant="contained">
                        {loading ? <div className="spinner"></div> : 'Create Candidate'}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const candidateSchema = yup.object().shape({
  fullName: yup.string().required("Required"),
  age: yup.string().required("Required"),
  party: yup.string().required("Required"),
  bio: yup.string().required("Required"),
});

const initialValues = {
  fullName: "",
  age: "",
  party: "",
  bio: "",
  image: "",
  symbol: "",
};

export default AddCandidate;
