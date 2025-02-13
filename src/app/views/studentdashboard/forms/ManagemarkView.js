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
  Card,
  Radio,
  DialogTitle,
  RadioGroup,
  styled,
  Grid,
  useTheme,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import useFetch from "../../../../hooks/useFetch";
import { Span } from "../../../../app/components/Typography";
import { useEffect, useState, Fragment, useMemo } from "react";
import "./form.css";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FormDialog2 from "../../../../app/views/material-kit/dialog/FormDialog2";
import { useLocation, useParams } from "react-router-dom";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const ManagemarkView = () => {
  const [state, setState] = useState({ date: new Date() });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const term = query.get("term");
  const subject = query.get("subject");
  const classname = query.get("classname");
  console.log(term, classname, subject);
  const { data, loading, error, reFetch } = useFetch(
    `/mark/${term}/${classname}/${subject}`
  );

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,
    gender,
    date,
    email,
  } = state;

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Material", path: "/material" },
              { name: "Student Information" },
            ]}
          />
          <FormDialog2 />
        </Box>

        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">C.A</TableCell>
                <TableCell align="center">Exam</TableCell>
                <TableCell align="center">Marked Obtained</TableCell>
                <TableCell align="center">Comment</TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell align="center">{data._id}</TableCell>
                    <TableCell align="left">{data.student_name}</TableCell>
                    <TableCell align="center">
                      <TableCell align="left">{data.ca}</TableCell>
                    </TableCell>
                    <TableCell align="center">
                      <TableCell align="left">{data.exam}</TableCell>
                    </TableCell>
                    <TableCell align="center">
                      <TableCell align="left">{data.markobtained}</TableCell>
                    </TableCell>
                    <TableCell align="center">
                      <TableCell align="left">{data.comment}</TableCell>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            component="div"
            rowsPerPage={rowsPerPage}
            count={data.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
          />
        </Box>

        {/* <TopSellingTable />
          <StatCards2 />

          <H4>Ongoing Projects</H4>
          <RowCards />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card sx={{ px: 3, py: 2, mb: 3 }}>
            <Title>Traffic Sources</Title>
            <SubTitle>Last 30 days</SubTitle>

            <DoughnutChart
              height="300px"
              color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
            />
          </Card>

          <UpgradeCard />
          <Campaigns />*/}
      </ContentBox>
    </Fragment>
  );
};

export default ManagemarkView;
