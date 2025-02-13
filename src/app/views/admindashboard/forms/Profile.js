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
  RadioGroup,
  styled,
} from "@mui/material";
import { Span } from "../../../../app/components/Typography";
import { useEffect, useState } from "react";
import avatar from "./avatar.png";
import useAuth from "../../../../app/hooks/useAuth";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
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

const Profile = () => {
  const [state, setState] = useState({ date: new Date() });
  const { logout, user } = useAuth();
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
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
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12">
            <div class="card h-auto">
              <div class="card-body">
                <div class="profile-tab">
                  <div class="custom-tab-1">
                    <ul class="nav nav-tabs" role="tablist">
                      <li class="nav-item" role="presentation">
                        <a
                          data-bs-toggle="tab"
                          class="nav-link active"
                          aria-selected="true"
                          role="tab"
                        >
                          About
                        </a>
                      </li>
                      <div class="text-center">
                        <a
                          href="admin/admin"
                          class="btn btn-primary mb-1"
                          data-bs-toggle="modal"
                          data-bs-target="#sendMessageModal"
                        >
                          Edit Profile
                        </a>
                      </div>
                    </ul>
                    <div class="tab-content">
                      <div id="my-posts" class="tab-pane fade" role="tabpanel">
                        <div class="my-post-content pt-3">
                          <div class="post-input">
                            <textarea
                              name="textarea"
                              id="textarea"
                              cols="30"
                              rows="5"
                              class="form-control bg-transparent"
                              placeholder="Please type what you want...."
                            ></textarea>
                            <a
                              href="javascript:void(0);"
                              class="btn btn-primary light me-1 px-3"
                              data-bs-toggle="modal"
                              data-bs-target="#linkModal"
                            >
                              <i class="fa fa-link m-0"></i>{" "}
                            </a>

                            <div class="modal fade" id="linkModal">
                              <div
                                class="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">Social Links</h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <a
                                      class="btn-social facebook"
                                      href="javascript:void(0)"
                                    >
                                      <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a
                                      class="btn-social google-plus"
                                      href="javascript:void(0)"
                                    >
                                      <i class="fab fa-google-plus-g"></i>
                                    </a>
                                    <a
                                      class="btn-social linkedin"
                                      href="javascript:void(0)"
                                    >
                                      <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a
                                      class="btn-social instagram"
                                      href="javascript:void(0)"
                                    >
                                      <i class="fab fa-instagram"></i>
                                    </a>
                                    <a
                                      class="btn-social twitter"
                                      href="javascript:void(0)"
                                    >
                                      <i class="fab fa-twitter"></i>
                                    </a>
                                    <a
                                      class="btn-social youtube"
                                      href="javascript:void(0)"
                                    >
                                      <i class="fab fa-youtube"></i>
                                    </a>
                                    <a
                                      class="btn-social whatsapp"
                                      href="javascript:void(0)"
                                    >
                                      <i class="fab fa-whatsapp"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a
                              href="javascript:void(0);"
                              class="btn btn-primary light me-1 px-3"
                              data-bs-toggle="modal"
                              data-bs-target="#cameraModal"
                            >
                              <i class="fa fa-camera m-0"></i>{" "}
                            </a>

                            <div class="modal fade" id="cameraModal">
                              <div
                                class="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">Upload images</h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <div class="input-group mb-3">
                                      <span class="input-group-text">
                                        Upload
                                      </span>
                                      <div class="form-file">
                                        <input
                                          type="file"
                                          class="form-file-input form-control"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a
                              href="javascript:void(0);"
                              class="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#postModal"
                            >
                              Post
                            </a>

                            <div class="modal fade" id="postModal">
                              <div
                                class="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">Post</h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <textarea
                                      name="textarea"
                                      id="textarea2"
                                      cols="30"
                                      rows="5"
                                      class="form-control bg-transparent"
                                      placeholder="Please type what you want...."
                                    ></textarea>
                                    <a
                                      class="btn btn-primary"
                                      href="javascript:void(0)"
                                    >
                                      Post
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="profile-uoloaded-post border-bottom-1 pb-5">
                            <img
                              src="images/profile/8.jpg"
                              alt=""
                              class="img-fluid w-100 rounded"
                            />
                            <a class="post-title" href="post-details.html">
                              <h3 class="text-black">
                                How To Get (A) Fabulous EDUCATION On A Tight
                                Budget
                              </h3>
                            </a>
                            <p>
                              {" "}
                              Socio-Economic differences can be solved by the
                              education system. A backward society can only be
                              lifted up by education differences can be solved
                              by the education system.
                            </p>
                            <button class="btn btn-primary me-2">
                              <span class="me-2">
                                <i class="fa fa-heart"></i>
                              </span>
                              Like
                            </button>
                            <button
                              class="btn btn-secondary"
                              data-bs-toggle="modal"
                              data-bs-target="#replyModal"
                            >
                              <span class="me-2">
                                <i class="fa fa-reply"></i>
                              </span>
                              Reply
                            </button>
                          </div>
                          <div class="profile-uoloaded-post border-bottom-1 pb-5">
                            <img
                              src="images/profile/9.jpg"
                              alt=""
                              class="img-fluid w-100 rounded"
                            />
                            <a class="post-title" href="post-details.html">
                              <h3 class="text-black">
                                How To Win Clients And Influence Markets with
                                EDUCATION
                              </h3>
                            </a>
                            <p>
                              A wonderful serenity has take possession of my
                              entire soul like these sweet morning of spare
                              which enjoy whole heart.A wonderful serenity has
                              take possession of my entire soul like these sweet
                              morning of spare which enjoy whole heart.
                            </p>
                            <button class="btn btn-primary me-2">
                              <span class="me-2">
                                <i class="fa fa-heart"></i>
                              </span>
                              Like
                            </button>
                            <button
                              class="btn btn-secondary"
                              data-bs-toggle="modal"
                              data-bs-target="#replyModal"
                            >
                              <span class="me-2">
                                <i class="fa fa-reply"></i>
                              </span>
                              Reply
                            </button>
                          </div>
                          <div class="profile-uoloaded-post pb-3">
                            <img
                              src="images/profile/8.jpg"
                              alt=""
                              class="img-fluid w-100 rounded"
                            />
                            <a class="post-title" href="post-details.html">
                              <h3 class="text-black">
                                What Can Instagramm Teach You About EDUCATION
                              </h3>
                            </a>
                            <p>
                              There are various types of education like formal,
                              informal, and non-formal. All of them aim to
                              educate you and change your way of thinking.
                              Academic studies are necessary for us to gain some
                              global knowledge.
                            </p>
                            <button class="btn btn-primary me-2">
                              <span class="me-2">
                                <i class="fa fa-heart"></i>
                              </span>
                              Like
                            </button>
                            <button
                              class="btn btn-secondary"
                              data-bs-toggle="modal"
                              data-bs-target="#replyModal"
                            >
                              <span class="me-2">
                                <i class="fa fa-reply"></i>
                              </span>
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        id="about-me"
                        class="tab-pane fade active show"
                        role="tabpanel"
                      >
                        <div class="profile-about-me">
                          <div class="pt-4 border-bottom-1 pb-3">
                            <h5 class="text-primary">About </h5>
                            <p class="mb-2"></p>
                          </div>
                        </div>

                        <div class="profile-personal-info">
                          <h5 class="text-primary mb-4">
                            Personal Information
                          </h5>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Username <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.username}</span>
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Email Address <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.email}</span>
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Phone Number <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.phone}</span>
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Home Address <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.address}</span>
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Admission No <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.AdmNo}</span>
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Class <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.className}</span>
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Parents Name <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.parentsName}</span>
                            </div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-sm-3 col-5">
                              <h5 class="f-w-500">
                                Date of Birth <span class="pull-end">:</span>
                              </h5>
                            </div>
                            <div
                              class="col-sm-9 col-7"
                              style={{
                                color: "#042954 ",
                                fontSize: "17px",
                                fontWeight: "800",
                              }}
                            >
                              <span>{user.dob}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="profile-settings"
                        class="tab-pane fade"
                        role="tabpanel"
                      >
                        <div class="pt-3">
                          <div class="settings-form">
                            <h5 class="text-primary">Account Setting</h5>
                            <form>
                              <div class="row">
                                <div class="mb-3 col-md-6">
                                  <label class="form-label">Email</label>
                                  <input
                                    type="email"
                                    placeholder="Email"
                                    class="form-control"
                                  />
                                </div>
                                <div class="mb-3 col-md-6">
                                  <label class="form-label">Password</label>
                                  <input
                                    type="password"
                                    placeholder="Password"
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Address</label>
                                <input
                                  type="text"
                                  placeholder="1234 Main St"
                                  class="form-control"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Address 2</label>
                                <input
                                  type="text"
                                  placeholder="Apartment, studio, or floor"
                                  class="form-control"
                                />
                              </div>
                              <div class="row">
                                <div class="mb-3 col-md-6">
                                  <label class="form-label">City</label>
                                  <input type="text" class="form-control" />
                                </div>
                                <div class="mb-3 col-md-4">
                                  <label class="form-label">State</label>
                                  <div class="dropdown bootstrap-select form-control default-select wide">
                                    <select
                                      class="form-control default-select wide"
                                      id="inputState"
                                    >
                                      <option selected="">Choose...</option>
                                      <option>Option 1</option>
                                      <option>Option 2</option>
                                      <option>Option 3</option>
                                    </select>
                                    <button
                                      type="button"
                                      tabindex="-1"
                                      class="btn dropdown-toggle btn-light"
                                      data-bs-toggle="dropdown"
                                      role="combobox"
                                      aria-owns="bs-select-1"
                                      aria-haspopup="listbox"
                                      aria-expanded="false"
                                      title="Choose..."
                                      data-id="inputState"
                                    >
                                      <div class="filter-option">
                                        <div class="filter-option-inner">
                                          <div class="filter-option-inner-inner">
                                            Choose...
                                          </div>
                                        </div>{" "}
                                      </div>
                                    </button>
                                    <div class="dropdown-menu ">
                                      <div
                                        class="inner show"
                                        role="listbox"
                                        id="bs-select-1"
                                        tabindex="-1"
                                      >
                                        <ul
                                          class="dropdown-menu inner show"
                                          role="presentation"
                                        ></ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="mb-3 col-md-2">
                                  <label class="form-label">Zip</label>
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                              <div class="mb-3">
                                <div class="form-check custom-checkbox">
                                  <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="gridCheck"
                                  />
                                  <label
                                    class="form-check-label form-label"
                                    for="gridCheck"
                                  >
                                    {" "}
                                    Check me out
                                  </label>
                                </div>
                              </div>
                              <button class="btn btn-primary" type="submit">
                                Sign in
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal fade" id="replyModal">
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Post Reply</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <textarea class="form-control" rows="4">
                              Message
                            </textarea>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-danger light"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" class="btn btn-primary">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
