import { TextField } from "@mui/material";
import { Fragment, React, useContext, useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { Box } from "@mui/system";
import { Typography, Button, styled, useTheme, Table } from "@mui/material";
import PaginationTable from "../../../../app/views/material-kit/tables/PaginationTable";
import FormDialog from "../../../../app/views/material-kit/dialog/FormDialog";
import { Breadcrumb } from "../../../../app/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faUserFriends,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "./calendar.css";
import "./newcss.css";
import "./style.css";
import axios from "axios";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

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

const NoticeList = styled("div")(() => ({
  marginBottom: "20px",
  "& .post-date": {
    padding: "10px",
    borderRadius: "5px",
    display: "inline-block",
    marginRight: "10px",
  },
}));

const getRandomColor = () => {
  const colors = ["skyblue", "yellow", "pink", "blue"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Admin = () => {
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { currentSession } = useContext(SessionContext);

  // Fetch data from API
  const {
    data: notices = [],
    loading,
    error,
    reFetch,
  } = useFetch(
    currentSession ? `/get-all-notices/${currentSession._id}` : null
  );

  // Fetch user counts
  const [userCounts, setUserCounts] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    admins: 0,
  });

  useEffect(() => {
    const fetchUserCounts = async () => {
      // Reset userCounts to zero before fetching new data
      setUserCounts({
        students: 0,
        teachers: 0,
        parents: 0,
        admins: 0,
      });

      try {
        const roles = ["student", "teacher", "parent", "admin"];
        const sessionId = currentSession._id; // Assuming currentSession is available from context

        const counts = await Promise.all(
          roles.map(async (role) => {
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users/${role}/${sessionId}`
              );
              return { role, count: response.data?.length || 0 };
            } catch (err) {
              console.error(`Error fetching ${role} count:`, err);
              return { role, count: 0 }; // Default to 0 if there's an error
            }
          })
        );

        const newCounts = counts.reduce((acc, { role, count }) => {
          acc[role + "s"] = count; // For example, role "student" becomes "students"
          return acc;
        }, {});

        setUserCounts(newCounts);
      } catch (error) {
        console.error("Error fetching user counts:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }
      }
    };

    if (currentSession) {
      fetchUserCounts();
    }
  }, [currentSession]);
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
      <h2 style={{ paddingTop: "15px", paddingLeft: "10px" }}>
        Admin Dashboard
      </h2>

      <div className="row gutters-20" style={{ marginTop: "10px" }}>
        {Object.entries(userCounts).map(([role, count]) => (
          <div key={role} className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
              <div className="row align-items-center">
                <div className="col-6">
                  <div
                    className={`item-icon bg-light-${
                      role === "admins"
                        ? "red"
                        : role === "teachers"
                        ? "blue"
                        : role === "parents"
                        ? "yellow"
                        : "green"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        role === "admins"
                          ? faUsers
                          : role === "teachers"
                          ? faUsers
                          : role === "parents"
                          ? faUserFriends
                          : faUser
                      }
                      className={`flaticon-classmates text-${
                        role === "admins"
                          ? "red"
                          : role === "teachers"
                          ? "blue"
                          : role === "parents"
                          ? "yellow"
                          : "green"
                      }`}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="item-content">
                    <div className="item-title">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </div>
                    <div className="item-number">
                      <span className="counter" data-num={count}>
                        {count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row gutters-20" style={{ marginTop: "60px" }}></div>

      <div className="cald">
        <div className="one">
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

        <div className="two">
          <h2 style={{ marginLeft: "5px" }}>Notice Board</h2>
          <div
            className="notice-box-wrap m-height-660"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {notices?.length > 0 ? (
              notices.map((notice) => (
                <NoticeList
                  key={notice._id}
                  style={{ flexBasis: "48%", margin: "0 1%" }}
                >
                  <div
                    className={`post-date bg-${getRandomColor()}`}
                    style={{ width: "100%" }}
                  >
                    {new Date(notice.date).toLocaleDateString()}
                  </div>
                  <Typography variant="h6" className="notice-title">
                    <a href="#">{notice.notice}</a>
                  </Typography>
                  <div className="entry-meta">
                    {notice.posted_by} / <span>5 min ago</span>
                  </div>
                </NoticeList>
              ))
            ) : (
              <div>No notices available</div>
            )}
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
