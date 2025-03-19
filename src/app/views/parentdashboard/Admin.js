import { TextField } from "@mui/material";
import { Fragment, React, useState } from "react";
import useFetch from "hooks/useFetch";
import { Box } from "@mui/system";
import {
  Card,
  Button,
  Grid,
  styled,
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
import RowCards from "../shared/RowCards";
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import FormDialog from "app/views/material-kit/dialog/FormDialog";
import { Breadcrumb } from "app/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "./calendar.css";

import "./style.css";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Admin = () => {
  const { data, loading, error } = useFetch("/get-admin");
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="row gutters-20" style={{ marginTop: "60px" }}>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="dashboard-summery-one mg-b-20">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="item-icon bg-light-green">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="flaticon-classmates text-green"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="item-content">
                  <div className="item-title">Students</div>
                  <div className="item-number">
                    <span className="counter" data-num="150000">
                      100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="dashboard-summery-one mg-b-20">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="item-icon bg-light-blue">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="flaticon-multiple-users-silhouette text-blue"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="item-content">
                  <div className="item-title">Teachers</div>
                  <div className="item-number">
                    <span className="counter" data-num="2250">
                      20
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="dashboard-summery-one mg-b-20">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="item-icon bg-light-yellow">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="flaticon-couple text-orange"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="item-content">
                  <div className="item-title">Parents</div>
                  <div className="item-number">
                    <span className="counter" data-num="5690">
                      70
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="dashboard-summery-one mg-b-20">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="item-icon bg-light-red">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="flaticon-money text-red"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="item-content">
                  <div className="item-title">Admin</div>
                  <div className="item-number">
                    <span className="counter" data-num="193000">
                      5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: "50%", width: "100%" }}>
          <div style={{ border: "1px solid #ddd", padding: "20px" }}>
            <h2 style={{ marginBottom: "20px" }}>Event Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              style={{
                width: "100% !important",
                padding: "20px",
                flexBasis: "70%",
                height: "500px",
              }}
            />
          </div>
        </div>
        <div style={{ flexBasis: "50%" }}>
          <h2>Notice Board</h2>
          <div class="notice-box-wrap m-height-660">
            <div class="notice-list">
              <div class="post-date bg-skyblue">16 June, 2024</div>
              <h6 class="notice-title">
                <a href="#">
                  We will be having our Interhouse Sport coming up at Agege
                  Statium.
                </a>
              </h6>
              <div class="entry-meta">
                {" "}
                Head Mistress / <span>5 min ago</span>
              </div>
            </div>
            <div class="notice-list">
              <div class="post-date bg-yellow">16 June, 2023</div>
              <h6 class="notice-title">
                <a href="#">
                  Our Interschool Debate will also be coming up along side quiz
                </a>
              </h6>
              <div class="entry-meta">
                {" "}
                Jennyfar Lopez / <span>5 min ago</span>
              </div>
            </div>
            <div class="notice-list">
              <div class="post-date bg-pink">16 June, 2019</div>
              <h6 class="notice-title">
                <a href="#">
                  Our cultural day and traditional day will take place at our
                  mini hall
                </a>
              </h6>
              <div class="entry-meta">
                {" "}
                Jennyfar Lopez / <span>5 min ago</span>
              </div>
            </div>
            <div class="notice-list">
              <div class="post-date bg-blue">16 June, 2019</div>
              <h6 class="notice-title">
                <a href="#">
                  Great School manag mene esom text of the printing.
                </a>
              </h6>
              <div class="entry-meta">
                {" "}
                Jennyfar Lopez / <span>5 min ago</span>
              </div>
            </div>
            <div class="notice-list">
              <div class="post-date bg-yellow">16 June, 2019</div>
              <h6 class="notice-title">
                <a href="#">Great School manag printing.</a>
              </h6>
              <div class="entry-meta">
                {" "}
                Jennyfar Lopez / <span>5 min ago</span>
              </div>
            </div>
            <div class="notice-list">
              <div class="post-date bg-blue">16 June, 2019</div>
              <h6 class="notice-title">
                <a href="#">Great School manag meneesom.</a>
              </h6>
              <div class="entry-meta">
                {" "}
                Jennyfar Lopez / <span>5 min ago</span>
              </div>
            </div>
            <div class="notice-list">
              <div class="post-date bg-pink">16 June, 2019</div>
              <h6 class="notice-title">
                <a href="#">Great School manag meneesom.</a>
              </h6>
              <div class="entry-meta">
                {" "}
                Jennyfar Lopez / <span>5 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        <ContentBox className="analytics"></ContentBox>
      </Fragment>
    </div>
  );
};

export default Admin;
