import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import axios from "axios";
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Exam = (term, classname, subject) => {
  const [state, setState] = useState();
  const [select, setSelect] = useState();
  const [info, setInfo] = useState();
  const [classs, setClasss] = useState();
  const [subjeect, setSubject] = useState();
  const [exam, setExam] = useState();
  const [score, setScore] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  // const [classs, setClasss] = useState();
  // const [subject, setSubject] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  {
    /*const handleClick = () => {
    try {
      const res = axios.get(`http://localhost:5000/api/mark/${term}/${classname}/${subject}`);
      setScore(res.data);
      console.log(res.data);
    } catch (err) {
      setError(err);
    }
  };*/
  }

  {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/examlist`);
          setExam(res.data);
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
    });
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/class`);
          setClasss(res.data);
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
    });
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/subject`);
          setSubject(res.data);
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
    });
  }

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const handleClick = () => {
    navigate(
      `/dashboard/manage-mark-view?term=${info.term}&classname=${info.class}&subject=${info.subject}`
    );
  };
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Manage Exam Mark" }]} />
        </Box>
        <div>
          <select name="term" onChange={handleChange}>
            <option selected="true" disabled="disabled">
              What Term
            </option>
            <option className="yo">FirstTerm</option>
            <option className="yo">SecondTerm</option>
            <option className="yo">ThirdTerm</option>
          </select>
        </div>
        <select name="class" onChange={handleChange}>
          <option selected="true" disabled="disabled">
            What Class
          </option>

          <option className="yo">JS1</option>
          <option className="yo">JS2</option>
          <option className="yo">JS3</option>
          <option className="yo">SS1</option>
          <option className="yo">SS2</option>
          <option className="yo">SS3</option>
        </select>
        <select name="subject" onChange={handleChange}>
          <option selected="true" disabled="disabled">
            What Subject
          </option>

          <option className="yo">Math</option>
          <option className="yo">Yoruba</option>
          <option className="yo">English</option>
          <option className="yo">SocialStudies</option>
        </select>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleClick}
        >
          Submit
        </Button>
        {/* <Stack spacing={3}>
          <SimpleCard title="Simple Form">
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <div className="glo">
                  <select>
                    <option selected="true" disabled="disabled">
                      Exam
                    </option>

                    {exam &&
                      exam.map((item) => (
                        <option className="yo" name="term">
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="glo">
                  <select>
                    <option selected="true" disabled="disabled">
                      Class
                    </option>
                    {classs &&
                      classs.map((item) => (
                        <option className="yo" name="class">
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="glo">
                  <select>
                    <option selected="true" disabled="disabled">
                      Subject
                    </option>
                    {subject &&
                      subject.map((item) => (
                        <option className="yo" name="subject">
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </Grid>
            </Grid>

            <Button color="primary" variant="contained" type="submit" onClick={handleClick}>
              Submit
            </Button>
          </SimpleCard>
                      </Stack>*/}
      </Container>
    </div>
  );
};

export default Exam;
