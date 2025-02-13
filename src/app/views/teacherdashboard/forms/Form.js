import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack } from "@mui/material";
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
  student_name: "",
  classname: "",
  address: "",
  parents_name: "",
  contact_no: "",
  gender: "",
  age: "",
  email: "",
  password: "",
};
const Form = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const [formData, setformData] = useState(initialState);
  const {
    student_name,
    classname,
    address,
    parents_name,
    contact_no,
    gender,
    age,
    email,
    password,
  } = formData;
  const [classs, setClasss] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      student_name,
      classname,
      address,
      parents_name,
      contact_no,
      gender,
      age,
      email,
      password,
    };
    try {
      await axios.post(
        "https://doneapi.vercel.app/api/userrs/register",
        formData
      );

      navigate("/dashboard/default");
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {} = state;

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Material", path: "/material" },
              { name: "Form" },
            ]}
          />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="Simple Form">
            <DialogTitle id="form-dialog-title"> Add new Student</DialogTitle>
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="student_name"
                    value={student_name}
                    placeholder="Enter your name"
                    type="text"
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    name="classname"
                    value={classname}
                    onChange={handleChange}
                    errorMessages={["this field is required"]}
                    placeholder="Enter your class"
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    name="parents_name"
                    value={parents_name}
                    onChange={handleChange}
                    errorMessages={["this field is required"]}
                    placeholder="Enter your parent name"
                  />
                  <TextField
                    type="text"
                    name="address"
                    autoFocus
                    margin="dense"
                    onChange={handleChange}
                    value={address}
                    placeholder="Enter your address"
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={gender}
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    name="contact_no"
                    value={contact_no}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />{" "}
                  {/* <RadioGroup
                    row
                    name="gender"
                    sx={{ mb: 2 }}
                    value={gender || ""}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Male"
                      label="Male"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />

                    <FormControlLabel
                      value="Female"
                      label="Female"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />
                  </RadioGroup> */}
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

export default Form;
