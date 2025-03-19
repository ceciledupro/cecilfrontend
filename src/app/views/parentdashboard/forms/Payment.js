import {} from "@mui/material";
import { Fragment, React, useState } from "react";
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
  ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";
import RowCards from "../shared/RowCards";
import { Breadcrumb } from "../../../../app/components";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";

import useFetch from "../../../../hooks/useFetch";
import FormDialog4 from "../../../../app/views/material-kit/dialog/FormDialog4";
import useAuth from "../../../../app/hooks/useAuth";
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

const Payment = () => {
  const { user } = useAuth();
  const { _id: studentId } = user; // Assuming _id is the correct field

  console.log("Student ID:", studentId);

  const { data, loading, error } = useFetch(`/receipt/${studentId}`);
  console.log("Fetched data:", data);

  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Payment" }]} />
          {/* <FormDialog4 /> */}
        </Box>

        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="left">Student Name</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Paid</TableCell>
                <TableCell align="center">Reason</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{item.studentName}</TableCell>
                    <TableCell align="center">{item.amount}</TableCell>
                    <TableCell align="center">{item.balance}</TableCell>
                    <TableCell align="center">{item.reason}</TableCell>
                    <TableCell>
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    <TableCell align="right">
                      <Menu id={`action-menu-${item._id}`}>
                        <MenuItem>
                          <ListItemIcon></ListItemIcon>

                          <Link to={`/dashboard/view-result/${item._id}`}>
                            View Receipt
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <EditIcon /> {/* Use an Edit icon */}
                          </ListItemIcon>
                          Edit
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <DeleteIcon /> {/* Use a Delete icon */}
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={data ? data.length : 0}
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

export default Payment;
