import { useEffect, useState, React } from "react";

const Login2 = () => {
  const spanStyle = {
    "--i": 9,
  };
  const spanStyle1 = {
    "--i": 1,
  };
  const spanStyle2 = {
    "--i": 2,
  };
  const spanStyle3 = {
    "--i": 3,
  };
  const spanStyle4 = {
    "--i": 4,
  };
  const spanStyle5 = {
    "--i": 5,
  };
  const spanStyle6 = {
    "--i": 6,
  };
  const spanStyle7 = {
    "--i": 7,
  };
  const spanStyle8 = {
    "--i": 8,
  };
  const spanStyle9 = {
    "--i": 9,
  };
  const spanStyle10 = {
    "--i": 10,
  };
  const spanStyle11 = {
    "--i": 11,
  };
  const spanStyle12 = {
    "--i": 12,
  };
  const spanStyle13 = {
    "--i": 13,
  };

  return (
    <div>
      <div class="login-6">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-8 col-lg-7 col-md-12 bg-img">
              <div class="info">
                <div class="waviy">
                  <span style={spanStyle1}>W</span>
                  <span style={spanStyle2}>e</span>
                  <span style={spanStyle3}>l</span>
                  <span style={spanStyle4}>c</span>
                  <span style={spanStyle5}>o</span>
                  <span style={spanStyle6}>m</span>
                  <span style={spanStyle7}>e</span>
                  <span class="color-yellow" style={spanStyle}>
                    t
                  </span>
                  <span class="color-yellow" style={spanStyle}>
                    o
                  </span>

                  <span style={spanStyle10}>o</span>
                  <span style={spanStyle11}>d</span>
                  <span style={spanStyle12}>d</span>
                  <span style={spanStyle13}>o</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                </p>
              </div>
              <div class="bg-photo">
                {/*}  <img src="assets/img/img-6.png" alt="bg" class="img-fluid" />*/}
              </div>
            </div>
            <div class="col-xl-4 col-lg-5 col-md-12 bg-color-6">
              <div class="form-section">
                <div class="logo">
                  <a href="login-6.html">
                    {/*} <img src="assets/img/logos/logo.png" alt="logo" />*/}
                  </a>
                </div>
                <h3>Sign Into Your Account</h3>
                <div class="login-inner-form">
                  <form action="#" method="GET">
                    <div class="form-group clearfix">
                      <label for="first_field" class="form-label">
                        Email address
                      </label>
                      <div class="form-box">
                        <input
                          name="email"
                          type="email"
                          class="form-control"
                          id="first_field"
                          placeholder="Email Address"
                          aria-label="Email Address"
                        />
                        <i class="flaticon-mail-2"></i>
                      </div>
                    </div>
                    <div class="form-group clearfix">
                      <label for="second_field" class="form-label">
                        Password
                      </label>
                      <div class="form-box">
                        <input
                          name="password"
                          type="password"
                          class="form-control"
                          autocomplete="off"
                          id="second_field"
                          placeholder="Password"
                          aria-label="Password"
                        />
                        <i class="flaticon-password"></i>
                      </div>
                    </div>
                    <div class="checkbox form-group clearfix">
                      <div class="form-check float-start">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberme"
                        />
                        <label class="form-check-label" for="rememberme">
                          Remember me
                        </label>
                      </div>
                      <a
                        href="forgot-password-6.html"
                        class="link-light float-end forgot-password"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div class="form-group clearfix mb-0">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg btn-theme"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div class="extra-login">
                    <span>Or Login With</span>
                  </div>
                  <ul class="social-list clearfix">
                    <li>
                      <a href="#" class="facebook-bg">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" class="twitter-bg">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#" class="google-bg">
                        Google
                      </a>
                    </li>
                  </ul>
                </div>
                <p class="text-center">
                  Don't have an account?
                  <a href="register-6.html"> Register here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
