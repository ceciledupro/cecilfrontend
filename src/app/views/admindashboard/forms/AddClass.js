import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  DialogTitle,
  RadioGroup,
  styled,
} from "@mui/material";
import { Span } from "../../../../app/components/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Navigate, useNavigate } from "react-router-dom";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
const initialState = {
  name: "", // Initial value for the class name
  teacher: "", // Initial value for the class teacher's name
};
const apiUrl = process.env.REACT_APP_API_URL;
const AddClass = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState); // Assuming you have an 'initialState' object defined
  const { name, teacher } = formData; // Update these field names as needed
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the authentication token from wherever you've stored it (e.g., local storage)
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make an API call to create a class
      await axios.post(`${apiUrl}/api/class`, formData, {
        headers, // Include the headers in the request
      });

      // Handle successful class creation
      navigate("/dashboard/class");
    } catch (err) {
      // Handle errors
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              // { name: "Material", path: "/material" },
              { name: "Add New Class" },
            ]}
          />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="Simple Form">
            <DialogTitle id="form-dialog-title"> Add new Class</DialogTitle>
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    value={name}
                    placeholder="Class Name"
                    type="text"
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    name="teacher"
                    value={teacher}
                    onChange={handleChange}
                    errorMessages={["this field is required"]}
                    placeholder="Class Teacher"
                  />
                </Grid>
              </Grid>

              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </ValidatorForm>
          </SimpleCard>
        </Stack>
      </Container>
    </div>
  );
};

export default AddClass;
