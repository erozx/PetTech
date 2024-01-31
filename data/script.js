/*
 * PetTech v1.0.0
 * Copyright 2024 SRN PetTech
 * Licensed under MIT (https://github.com/SANSDESU/PetTech/blob/main/LICENSE)
 */

function setup() {
  // Data doesn't exist in Chrome storage, load default from config.json
  fetch("/config.json") // Provide the correct relative path
    .then((response) => response.json())
    .then((data) => {
      const {
        uptime,
        status,
        freq,
        feedtimehour,
        feedtimeday,
        feedtype,
        ssid,
        passwordwifi,
        username,
        password,
        login,
      } = data;

      document.getElementById("status").value = status;
      document.getElementById("uptime").value = uptime;

      document.getElementById("ssid").value = ssid;
      document.getElementById("passwifi").value = passwordwifi;

      document.getElementById("username").value = username;
      document.getElementById("password").value = password;
      document.getElementById("enlogin").value = login;

      document.getElementById("feedingtype").value = feedtype;
      document.getElementById("freq").value = freq;

      document.getElementById("fhour").value = feedtimehour;
      document.getElementById("fday").value = feedtimeday;

      if (document.getElementById("feedingtype").value == "hours") {
        document.getElementById("feedcon").innerHTML = `

                    <div class="col pr-0">
                        <span
                            class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                            style="font-size: 17px;">Every</span>
                    </div>

                    <div class="col-6 pr-1">
                        <input type="number" class="form-control" placeholder="Feeding times per"
                            id="feedtime">
                        <input type="text" style="display: none; width: 0; height: 0;" id="feedtype">
                    </div>
                    <div class="col pl-0">
                    <span class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                        style="font-size: 17px;" id="feedtext"></span>
                    </div>

                `;

        document.getElementById("feedtext").textContent = "hours";
        document.getElementById("feedtime").placeholder =
          "Feeding times per hours";
        document.getElementById("feedtime").value =
          document.getElementById("fhour").value;
      } else if (document.getElementById("feedingtype").value == "day") {
        document.getElementById("feedcon").innerHTML = `

                    <div class="col-9 pr-1">

                    <input type="number" class="form-control" placeholder="Feeding times per" id="feedtime">
                    <input type="text" style="display: none; width: 0; height: 0;" id="feedtype">
                    </div>

                    <div class="col pl-0">
                    <span class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                        style="font-size: 17px;" id="feedtext"></span>
                    </div>

                `;

        document.getElementById("feedtext").textContent = "/day";
        document.getElementById("feedtime").placeholder =
          "Feeding times per day";
        document.getElementById("feedtime").value =
          document.getElementById("fday").value;
      }
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });

  document.getElementById("feedingtype").onchange = function () {
    if (document.getElementById("feedingtype").value == "hours") {
      document.getElementById("feedcon").innerHTML = `

            <div class="col pr-0">
              <span
                class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                style="font-size: 17px;">Every</span>
            </div>

            <div class="col-6 pr-1">
              <input type="text" style="display: none; width: 0; height: 0;" id="fhour">
              <input type="text" style="display: none; width: 0; height: 0;" id="fday">

              <input type="number" class="form-control" placeholder="Feeding times per"
                id="feedtime">
              <input type="text" style="display: none; width: 0; height: 0;" id="feedtype">
            </div>
            <div class="col pl-0">
              <span class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                style="font-size: 17px;" id="feedtext"></span>
            </div>

            `;

      document.getElementById("feedtext").textContent = "hours";
      document.getElementById("feedtime").placeholder =
        "Feeding times per hours";
      document.getElementById("feedtime").value =
        document.getElementById("fhour").value;
    } else if (document.getElementById("feedingtype").value == "day") {
      document.getElementById("feedcon").innerHTML = `

            <div class="col-9 pr-1">
               <input type="text" style="display: none; width: 0; height: 0;" id="fhour">
               <input type="text" style="display: none; width: 0; height: 0;" id="fday">

               <input type="number" class="form-control" placeholder="Feeding times per" id="feedtime">
               <input type="text" style="display: none; width: 0; height: 0;" id="feedtype">
             </div>

             <div class="col pl-0">
               <span class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                 style="font-size: 17px;" id="feedtext"></span>
             </div>

            `;

      document.getElementById("feedtext").textContent = "/day";
      document.getElementById("feedtime").placeholder = "Feeding times per day";
      document.getElementById("feedtime").value =
        document.getElementById("fday").value;
    }
  };

  const showpassBtnwifi = document.getElementById("viewpasswifi");
  const showpassBtn = document.getElementById("viewpass");

  showpassBtnwifi.addEventListener("click", function () {
    showPw(1);
  });
  showpassBtn.addEventListener("click", function () {
    showPw(2);
  });
}

function showPw(op) {
  shpw = document.getElementById("viewpasswifi");
  shpw = document.getElementById("viewpass");

  var x = document.getElementById("passwifi");
  var y = document.getElementById("password");

  if (op == 1) {
    if (x.type === "password") {
      shpw.textContent = "×";

      x.type = "text";
    } else {
      shpw.textContent = "+";

      x.type = "password";
    }
  } else if (op == 2) {
    if (y.type === "password") {
      shpw.teytContent = "×";

      y.type = "text";
    } else {
      shpw.textContent = "+";

      y.type = "password";
    }
  }
}

//save config
function datas() {
  var time;

  if (document.getElementById("feedingtype").value == "day") {
    updatedDatas = {
      feedtimehour: document.getElementById("fhour").value,
      feedtimeday: document.getElementById("feedtime").value,

      uptime: document.getElementById("uptime").value,
      status: document.getElementById("status").value,

      freq: document.getElementById("freq").value,
      feedtype: document.getElementById("feedingtype").value,
      ssid: document.getElementById("ssid").value,
      passwordwifi: document.getElementById("passwifi").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      login: document.getElementById("enlogin").value,
    };
  } else {
    updatedDatas = {
      feedtimehour: document.getElementById("feedtime").value,
      feedtimeday: document.getElementById("fday").value,

      uptime: document.getElementById("uptime").value,
      status: document.getElementById("status").value,

      freq: document.getElementById("freq").value,
      feedtype: document.getElementById("feedingtype").value,
      ssid: document.getElementById("ssid").value,
      passwordwifi: document.getElementById("passwifi").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      login: document.getElementById("enlogin").value,
    };
  }
  return updatedDatas;
}

function saveConfig(btn) {
  btn.innerHTML = "Saving...";

  var updatedDatas = datas();
  var jsonData = JSON.stringify(updatedDatas);

  fetch("/saveConfig", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      btn.innerHTML = "Saved!";
      setTimeout(function () {
        btn.innerHTML = "Save";
      }, 1000);
    })
    .catch((error) => {
      console.error("Error:", error);
      btn.innerHTML = "Save Failed";
    });
}

function saveWifiConfig(btn) {
  btn.innerHTML = "Saving...";

  var updatedDatas = datas();
  var jsonData = JSON.stringify(updatedDatas);

  fetch("/saveWifi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      btn.innerHTML = "Saved!";
      alert("Please reconnect to new WiFi configuration");

      setTimeout(function () {
        btn.innerHTML = "Save";
      }, 1000);
    })
    .catch((error) => {
      console.error("Error:", error);
      btn.innerHTML = "Save Failed";
    });
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(a, b) {
  let user = getCookie("XVHUQDPH");
  let pass = getCookie("SDVVZRUG");

  if (user != "" && user == a && pass != "" && pass == b) {
    showMain();
  } else {
    showLogin(a, b);
  }
}

function logout() {
  document.cookie = "XVHUQDPH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "SDVVZRUG=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}

window.onload = function () {
  let XVHUQDPH;
  let SDVVZRUG;

  fetch("/config.json") // Provide the correct relative path
    .then((response) => response.json())
    .then((data) => {
      const { username, password, login } = data;

      if (login || login == "true") {
        XVHUQDPH = username;
        SDVVZRUG = password;

        checkCookie(XVHUQDPH, SDVVZRUG);
      } else {
        showMain();
      }
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
};

function ORJLQ(a, b) {
  let _u$ = document.getElementById("x").value;
  let _p$ = document.getElementById("y").value;

  if (_u$ == a) {
    if (_p$ == b) {
      setCookie("XVHUQDPH", _u$, 30);
      setCookie("SDVVZRUG", _p$, 30);

      showMain();
    } else {
      document.getElementById("loginfailed").style.display = "block";
    }
  } else {
    document.getElementById("loginfailed").style.display = "block";
  }
}

function showLogin(a, b) {
  document.getElementById("main").innerHTML = `
    <div class="d-flex justify-content-center align-content-center h-100 ">
            <div class="container mt-3 d-flex justify-content-center align-content-center h-100">
              <div class="row d-flex justify-content-center align-content-center h-100">

                <div class="col-lg-4 mr-1 ml-1">
                  <div class="row">
                    <div class="col-12 rounded shadow bg mb-3 pb-2">
                      <div class="row d-flex justify-content-center align-content-center border-bottom mb-2 mr-1 ml-1">

                        <div class="col-6" style="width: auto;"><span class="font-weight-bold cntn"
                            style="font-size: 20px;">LOGIN</span></div>
                      </div>

                      <div class="col-md-12" style="text-align: left;">
                        <label class="labels cntn">Username</label>
                        <input type="text" class="form-control" placeholder="Username" id="x">
                      </div>

                      <div class="col-md-12" style="text-align: left;">
                        <label class="labels cntn">Password</label>
                        <input type="password" class="form-control" placeholder="Password" id="y">
                      </div>

                      <span id="loginfailed" class="text-danger"
                            style="font-size: 14px; display: none;">Username atau Password salah!</span>

                        <div class="form-group mt-3 align-content-center">
                          <button class="btn btn-primary pickImageBtn w-100 text-uppercase" type="button"
                            id="submitlog">Login</button>
                        </div>

                      </div>




                    </div>

                  </div>
                </div>


              </div>
            </div>
    `;

  document.getElementById("submitlog").onclick = function () {
    ORJLQ(a, b);
  };
}

function showMain() {
  document.getElementById("main").innerHTML = `
    <div class="d-flex justify-content-center align-content-center h-100 ">
          <div class="container row mt-3 d-flex justify-content-center align-content-center h-100">
            <div class="row d-flex justify-content-center align-content-center h-100">

              <div class="col-lg-4 mr-1 ml-1">
                <div class="row">
                  <div class="col-12 rounded shadow bg mb-3 pb-2">
                    <div class="row d-flex justify-content-center align-content-center border-bottom mb-2 mr-1 ml-1">

                      <div class="col-6" style="width: auto;"><span class="font-weight-bold cntn"
                          style="font-size: 20px;">Meal Times</span></div>
                    </div>

                    <div style="text-align:left;">

                      <div class="col-md-12">
                        <label class="labels cntn">Feeding type</label>
                        <select class="form-control" id="feedingtype">
                          <option value="hours">Every ~ Hours</option>
                          <option value="day">Per Day</option>
                        </select>
                      </div>

                      <div class="col-md-12">
                        <label class="labels cntn">Set feeding times</label>
                        <input type="text" style="display: none; width: 0; height: 0;" id="fhour">
                        <input type="text" style="display: none; width: 0; height: 0;" id="fday">
                        <div class="d-flex justify-content-center align-content-center h-100 " id="feedcon">




                        </div>
                      </div>

                      <div class="col-md-12">
                        <label class="labels cntn">Frequency feeding</label>
                        <div class="d-flex justify-content-center align-content-center h-100 ">

                            <div class="col-9 pr-1">

                              <input type="number" class="form-control" placeholder="Frequency feeding" id="freq">
                            </div>

                            <div class="col pl-0">
                              <span class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                                style="font-size: 12px;">seconds</span>
                            </div>

                        </div>
                      </div>


                      <div class="form-group mt-3 align-content-center">
                        <button class="btn btn-primary pickImageBtn w-100 text-uppercase" type="button"
                          onclick="saveConfig(this)">Save</button>
                      </div>

                    </div>




                  </div>

                </div>
              </div>

              <div class="col-lg-3 mr-1 ml-1">
                <div class="row">
                  <div class="col-12 rounded shadow bg mb-3 pb-2">
                    <div class="row d-flex justify-content-center align-content-center border-bottom mb-2 mr-1 ml-1">

                      <div class="col-6" style="width: auto;"><span class="font-weight-bold cntn"
                          style="font-size: 20px;">Device
                          Config</span></div>
                    </div>

                    <div style="text-align:left;">

                      <div class="col-md-12">
                        <label class="labels cntn">Device Status</label>
                        <select class="form-control" id="status">
                          <option value="on">ON</option>
                          <option value="off">OFF</option>
                        </select>
                      </div>

                      <div class="col-md-12">
                        <label class="labels cntn">Update Time</label>
                        <div class="d-flex justify-content-center align-content-center h-100 ">

                          <div class="col-9 pr-1">

                            <input type="number" class="form-control" placeholder="UpTime" id="uptime">
                          </div>

                          <div class="col pl-0">
                            <span class="font-weight-bold cntn d-flex justify-content-center align-items-end h-100"
                              style="font-size: 12px;">seconds</span>
                          </div>


                        </div>
                      </div>



                      <div class="form-group mt-3 align-content-center">
                        <button class="btn btn-primary pickImageBtn w-100 text-uppercase" type="button"
                          onclick="saveConfig(this)">Save</button>
                      </div>

                    </div>




                  </div>

                </div>


              </div>

              <div class="col-lg-3 mr-1 ml-1">

              <div class="row">
                  <div class="col-12 rounded shadow bg mb-3 pb-2">
                    <div class="row d-flex justify-content-center align-content-center mr-1 ml-1">

                      <div class="col-6"><span class="font-weight-bold cntn"
                          style="font-size: 20px;">Security</span>
                      </div>

                    </div>

                  </div>
              </div>

              <div class="row">
                  <div class="col-12 rounded shadow bg mb-3 pb-2">
                    <div class="row d-flex justify-content-center align-content-center border-bottom mb-2 mr-1 ml-1">

                      <div class="col-6" style="width: auto;"><span class="font-weight-bold cntn"
                          style="font-size: 20px;">Login
                          Config</span></div>
                    </div>

                    <div style="text-align:left;">

                    <div class="col-md-12">
                        <label class="labels cntn">Login</label>
                        <select class="form-control" id="enlogin">
                          <option value="true">Enable</option>
                          <option value="false">Disable</option>
                        </select>
                    </div>

                    <div class="col-md-12"><label class="labels cntn">Username</label>
                      <input type="text" class="form-control" placeholder="Username" id="username">
                    </div>

                    <div class="col-md-12">
                      <label class="labels cntn">Password</label>
                      <div class="d-flex justify-content-center align-content-center h-100 ">

                        <div class="col-10 pr-2">

                          <input type="password" class="form-control" placeholder="Password" id="password">

                        </div>
                        <div class="col">
                          <button class="btn btn-primary pickImageBtn text-uppercase h-100 w-100 p-0" type="button"
                            id="viewpass" style="font-size: large;">+</button>
                        </div>

                      </div>
                    </div>

                      <div class="form-group mt-3 align-content-center">
                        <button class="btn btn-primary pickImageBtn w-100 text-uppercase" type="button"
                          onclick="saveConfig(this)">Save</button>
                      </div>

                    </div>




                  </div>

                </div>


                <div class="row">
                  <div class="col-12 rounded shadow bg mb-3 pb-2">
                    <div class="row d-flex justify-content-center align-content-center border-bottom mb-2 mr-1 ml-1">

                      <div class="col-6" style="width: auto;"><span class="font-weight-bold cntn"
                          style="font-size: 20px;">Wifi
                          Config</span></div>
                    </div>

                    <div style="text-align:left;">

                      <div id="offline">

                        <div class="col-md-12"><label class="labels cntn">SSID</label>
                          <input type="text" class="form-control" placeholder="SSID" id="ssid">
                        </div>

                        <div class="col-md-12">
                          <label class="labels cntn">Password</label>
                          <div class="d-flex justify-content-center align-content-center h-100 ">

                            <div class="col-10 pr-2">

                              <input type="password" class="form-control" placeholder="Password" id="passwifi">

                            </div>
                            <div class="col">
                              <button class="btn btn-primary pickImageBtn text-uppercase h-100 w-100 p-0" type="button"
                                id="viewpasswifi" style="font-size: large;">+</button>
                            </div>

                          </div>
                        </div>

                      </div>

                      <div class="form-group mt-3 align-content-center">
                        <button class="btn btn-primary pickImageBtn w-100 text-uppercase" type="button"
                          onclick="saveWifiConfig(this)">Save</button>
                      </div>

                    </div>




                  </div>

                </div>


              </div>

            </div>

            <div class="row-3 d-flex justify-content-center align-content-center">
            <button class="btn btn-primary pickImageBtn text-uppercase reds mb-2" type="button" onclick="logout()">Logout</button>
            </div

          </div>
        </div>
    `;

  setup();
}
