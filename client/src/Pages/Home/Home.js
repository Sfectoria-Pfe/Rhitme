import React from "react";
import "./home.css";
import pic from "./picture1.jpg";
import { useState, useEffect, useMemo } from "react";
import Lottie from "lottie-react";
import crown from "./crown.json";
import LoadingShape from "../../Components/LoadingShape.js/LoadingShape";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../../State/EmployeesState";
import Chart from "../../Components/Chart/Chart";
import congrats from "./congrats.json";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchDepartedEmployees } from "../../State/DepartedEmployeesState";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function Home() {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const departedEmployees = useSelector(
    (state) => state.departedEmployees.departedEmployees
  );
  const departedStatus = useSelector((state) => state.departedEmployees.status);
  const dispatch = useDispatch();
  const [newEmployees, setNewEmployees] = useState([]);
  const [departed, setDeparted] = useState([]);
  const allEmployees = [...employees, ...departedEmployees];
  const [activities, setAcitivities] = useState(false);
  const [newNote, setNewNote] = useState(false);
  const [note, setNote] = useState("");

  const getDepartedEmployeesByYear = useMemo(() => {
    return (employeesLeft) => {
      const currentYear = new Date().getFullYear();
      const departedEmployeesByYear = {};

      employeesLeft.forEach((employee) => {
        const dateLeftYear = new Date(employee.date_left).getFullYear();
        for (let year = dateLeftYear; year <= currentYear; year++) {
          if (!departedEmployeesByYear[year]) {
            departedEmployeesByYear[year] = 0;
          }
          if (year === dateLeftYear) {
            departedEmployeesByYear[year]++;
          }
        }
      });

      const result = Object.keys(departedEmployeesByYear).map((year) => ({
        year: year.toString(),
        Left: departedEmployeesByYear[year],
      }));

      result.sort((a, b) => parseInt(a.year) - parseInt(b.year));

      setDeparted(result);
    };
  }, [departed]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && departedStatus === "succeeded") {
      extractNewEmployees(allEmployees);
    }
  }, [status, departedStatus, employees, departedEmployees]);

  useEffect(() => {
    if (departedStatus === "idle") {
      dispatch(fetchDepartedEmployees());
    }
  }, [dispatch, departedStatus]);

  useEffect(() => {
    if (departedStatus === "succeeded") {
      getDepartedEmployeesByYear(departedEmployees);
    }
  }, [departedStatus, departedEmployees]);

  function getMaxYAxisValue(data, field) {
    const max = Math.max(...data.map((item) => item[field] ?? 0));
    return Math.ceil(max / 5) * 5;
  }

  function extractNewEmployees(data) {
    const years = {};
    const stillInByYear = {};
    const leftByYear = {};

    data.forEach((employee) => {
      const creationYear = new Date(employee.created_at).getFullYear();
      years[creationYear] = (years[creationYear] || 0) + 1;
      if (!employee.date_left) {
        stillInByYear[creationYear] = (stillInByYear[creationYear] || 0) + 1;
      } else {
        leftByYear[creationYear] = (leftByYear[creationYear] || 0) + 1;
      }
    });

    const currentYear = new Date().getFullYear();
    const res = [];
    for (
      let year = Math.min(...Object.keys(years), currentYear);
      year <= currentYear;
      year++
    ) {
      const newEmployeesCount = years[year] || 0;
      const stillInCount = stillInByYear[year] || 0;
      const leftCount = leftByYear[year] || 0;
      res.push({
        year: String(year),
        newEmployees: newEmployeesCount,
        stillIn: stillInCount,
        left: leftCount,
      });
    }

    setNewEmployees(res);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dateOptions = { weekday: "long", month: "long", day: "numeric" };
      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

      const formattedDate = now.toLocaleDateString("en-US", dateOptions);
      const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

      setFormattedDate(formattedDate);
      setFormattedTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formatYearAsString = (year) => {
    return String(year);
  };

  const createGenderData = (data) => {
    let maleCount = 0;
    let femaleCount = 0;

    data.forEach((employee) => {
      if (employee.gender === "Male") {
        maleCount++;
      } else if (employee.gender === "Female") {
        femaleCount++;
      }
    });

    return [
      { name: "Male", value: maleCount, fill: COLORS["Male"] },
      { name: "Female", value: femaleCount, fill: COLORS["Female"] },
    ];
  };

  const COLORS = {
    Male: "#8884d8",
    Female: "#ff5e78",
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const getTotalEmployees = useMemo(
    () => (employees) => {
      return employees.length;
    },
    [employees]
  );

  const getActiveEmployeesCount = useMemo(
    () => (employees) => {
      return employees.filter((employee) => employee.status === "active")
        .length;
    },
    [employees]
  );

  const getOutEmployeesCount = useMemo(
    () => (employees) => {
      return employees.filter((employee) => employee.status === "out").length;
    },
    [employees]
  );

  const getTotalSalaries = useMemo(
    () => (employees) => {
      return employees.reduce((total, employee) => total + employee.salary, 0);
    },
    [employees]
  );

  const getHighestSalary = useMemo(
    () => (employees) => {
      if (employees.length === 0) return 0;
      return Math.max(...employees.map((employee) => employee.salary));
    },
    [employees]
  );

  const getLowestSalary = useMemo(
    () => (employees) => {
      if (employees.length === 0) return 0;
      return Math.min(...employees.map((employee) => employee.salary));
    },
    [employees]
  );
  return (
    <div className="h-container d-flex flex-column align-items-center">
      <div className="h-header pt-5">
        <div className="h-header-content d-flex align-items-center justify-content-between">
          <div className="h-infos d-flex align-items-center">
            {status === "succeeded" && departedStatus === "succeeded" ? (
              <img src={pic} />
            ) : (
              <LoadingShape width="70px" height="70px" borderRadius="50%" />
            )}

            <div>
              {status === "succeeded" && departedStatus === "succeeded" ? (
                "Firas Trabelsi"
              ) : (
                <LoadingShape height="25px" width="220px" borderRadius="10px" />
              )}
            </div>
          </div>
          <div className="h-datetime d-flex flex-column align-items-center">
            <div className="h-time"> {formattedTime}</div>
            <div className="h-date"> {formattedDate}</div>
          </div>
        </div>
      </div>

      <div className="h-content container ">
        {status === "succeeded" && departedStatus === "succeeded" ? (
          <div className="row">
            <div className="col-xl container">
              <div className="row d-flex justify-content-center">
                <div
                  className="col-md-4 col-sm-6 h-field h-empl-month"
                  style={{ position: "relative" }}
                >
                  <Lottie
                    animationData={congrats}
                    loop={true}
                    className="h-congrats"
                  />

                  <div className="h-field-title">Employee of the month</div>
                  <div className="d-flex align-items-center h-empl-month-infos">
                    <div>
                      <img src={pic} />
                    </div>
                    <div className="d-flex align-items-center">
                      Flen Lfouleni
                      <Lottie
                        animationData={crown}
                        loop={true}
                        className="h-crown"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-3 col-sm-5 h-field"
                  style={{ border: "none", backgroundColor: "#FFE5E7" }}
                >
                  <div className="h-field-title">Open positions</div>
                  <div className="h-field-first-value">4</div>
                  <div className="h-small-values" style={{ color: "red" }}>
                    1 Urgently needed
                  </div>
                </div>

                <div
                  className="col-md-11 col-sm-12 h-field"
                  style={{
                    height: "500px",
                  }}
                >
                  <div className="h-field-title">Recruited employees</div>
                  <Chart
                    gridColor="#041b2a41"
                    lineColor="#8884d8"
                    data={newEmployees}
                    maxYAxisValue={getMaxYAxisValue(
                      newEmployees,
                      "newEmployees"
                    )}
                    dataKey="newEmployees"
                    xaxis={formatYearAsString}
                    menu={true}
                    tooltip={({ payload }) => {
                      if (payload && payload.length) {
                        const {
                          year,
                          newEmployees,
                          left,
                          stillIn,
                        } = payload[0].payload;
                        return (
                          <div className="h-tooltip border">
                            <div className="h-tooltip-year">{year}</div>
                            <div style={{ color: "#8884d8" }}>
                              New employees: {newEmployees}
                            </div>
                            <div style={{ color: "#8884d8" }}>
                              Still working: {stillIn}
                            </div>
                            <div style={{ color: "#8884d8" }}>Left: {left}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </div>
                <div className="col-md-3 col-sm-5 h-field">
                  <div className="h-field-title">Total employees</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="h-field-first-value">
                        {status === "succeeded"
                          ? getTotalEmployees(employees)
                          : null}
                      </div>
                      <div className="h-small-values">
                        <div className="text-muted">
                          {status === "succeeded"
                            ? getActiveEmployeesCount(employees) +
                              " " +
                              "Active"
                            : null}
                        </div>
                        <div className="text-muted">
                          {status === "succeeded"
                            ? getOutEmployeesCount(employees) + " " + "Out"
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 h-field">
                  <div className="h-field-title">Employee composition</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={createGenderData(employees)}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={60}
                        innerRadius={30}
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          percent,
                        }) => {
                          const radius =
                            innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x =
                            cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                          const y =
                            cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                          return (
                            <text
                              x={x}
                              y={y}
                              fill="white"
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }}
                        labelLine={false}
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-md-4 col-sm-6 h-field">
                  <div className="h-field-title">Total salary expenses</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="h-field-first-value">
                        {status === "succeeded"
                          ? getTotalSalaries(employees) + " " + "DT"
                          : null}
                      </div>
                      <div className="h-small-values">
                        <div className="text-muted">
                          {status === "succeeded"
                            ? "Highest salary" +
                              " : " +
                              getHighestSalary(employees)
                            : null}
                        </div>
                        <div className="text-muted">
                          {status === "succeeded"
                            ? "Lowest salary" +
                              " : " +
                              getLowestSalary(employees)
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-11 col-sm-12 h-field"
                  style={{
                    height: "500px",
                  }}
                >
                  <div className="h-field-title">Departed employees</div>
                  <Chart
                    gridColor="#041b2a41"
                    lineColor="#8884d8"
                    data={departed}
                    maxYAxisValue={getMaxYAxisValue(departed, "Left")}
                    dataKey="Left"
                    xaxis={formatYearAsString}
                    menu={true}
                  />
                </div>
                <div className="col-md-3 col-sm-5 h-field">
                  <div className="h-field-title">Total Projects</div>
                  <div className="h-field-first-value">20</div>
                  <div className="h-small-values">
                    <div className="text-muted">16 Done</div>
                    <div className="text-muted">4 In progress</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 h-field">
                  <div>Projects revenues</div>
                  <div>80000DT</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 container">
              <div className="row d-flex justify-content-between">
                <div className="h-recent d-flex flex-column col-12 col-md-5 col-xl-12 p-0">
                  <div className="h-recent-header px-3 ">Recent activities</div>
                  <div className="h-recent-content px-3 d-flex flex-column">
                    <div className="h-recent-item d-flex flex-column ">
                      <div className="h-recent-date ">
                        10:40, Fri 29 Mar 2024
                      </div>
                      <div className="h-recent-title">New job offer</div>
                      <div className="h-recent-desc">
                        You posted a new job offer named "azefzr gethr yjtuky"
                      </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                      <div className="h-nb-activities">
                        Today you made 10 activities
                      </div>
                      <button
                        className="h-see-all"
                        onClick={() => setAcitivities(!activities)}
                      >
                        {activities ? "Hide" : "See all"}
                      </button>
                    </div>
                    <div
                      className={`h-recent-rest flex-column ${
                        activities ? "d-flex" : "d-none"
                      }`}
                    >
                      <div className="h-recent-item d-flex flex-column ">
                        <div className="h-recent-date ">
                          10:40, Fri 29 Mar 2024
                        </div>
                        <div className="h-recent-title">New job offer</div>
                        <div className="h-recent-desc">
                          Firas Trablesi, you posted a new job offer named
                          "azefzr gethr yjtuky"
                        </div>
                      </div>
                      <div className="h-recent-item d-flex flex-column ">
                        <div className="h-recent-date ">
                          10:40, Fri 29 Mar 2024
                        </div>
                        <div className="h-recent-title">New job offer</div>
                        <div className="h-recent-desc">
                          Firas Trablesi, you posted a new job offer named
                          "azefzr gethr yjtuky"
                        </div>
                      </div>
                      <div className="h-recent-item d-flex flex-column ">
                        <div className="h-recent-date ">
                          10:40, Fri 29 Mar 2024
                        </div>
                        <div className="h-recent-title">New job offer</div>
                        <div className="h-recent-desc">
                          Firas Trablesi, you posted a new job offer named
                          "azefzr gethr yjtuky"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-notes border d-flex flex-column col-12 col-md-5 col-xl-12">
                  <div className="h-notes-title">Notes</div>
                  <div className="h-note d-flex flex-column">
                    <div className="h-note-header d-flex align-items-center justify-content-between">
                      <div>10:40, Fri 29 Mar 2024</div>
                      <MdDelete className="icon" />
                    </div>
                    <div className="h-note-body">
                      zef erht zrehtr zerehtrjy zerhetjt zegrh behtd srbeht
                      sbrfeht gerh(y reh(y erth tjyk rftnhrjy etrjy tnrjydf
                      dgbntryj dfbteh
                    </div>
                  </div>
                  <button
                    className="h-add-note align-self-end"
                    onClick={() => setNewNote(!newNote)}
                  >
                    {newNote ? (
                      <>
                        Close
                        <IoClose className="icon" />
                      </>
                    ) : (
                      <>
                        Add note
                        <IoAdd className="icon" />
                      </>
                    )}
                  </button>
                  <div
                    className={`h-add-note-input ${
                      newNote ? "d-flex" : "d-none"
                    } flex-column align-items-end`}
                  >
                    <textarea
                      maxLength="150"
                      className="py-1 px-2"
                      placeholder="Type your note ..."
                      value={note}
                      onChange={handleNoteChange}
                    />
                    <button disabled={note.trim() === ""}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ height: "65vh" }}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="spinner-container">
              <div className="spinner">
                <div className="spinner">
                  <div className="spinner">
                    <div className="spinner">
                      <div className="spinner">
                        <div className="spinner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
