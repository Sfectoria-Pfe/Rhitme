import React, { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaChartLine } from "react-icons/fa";
import { MdCoPresent } from "react-icons/md";
import Chart from "../../../Components/Chart/Chart";
import { fetchAbsenceByEmployeeId } from "../../../State/AbsenceState";
import EmployeeChange from "./EmployeeChange";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import productivity from "./productivity.png";
import { fetchEmployees } from "../../../State/EmployeesState";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";

function Performance() {
  const { employee } = useOutletContext();
  const employees = useSelector((state) => state.employees.employees);
  const [editableEmployee, setEditableEmployee] = useState(employee);
  const employeesStatus = useSelector((state) => state.employees.status);
  const status = useSelector((state) => state.absence.status);
  const absences = useSelector((state) => state.absence.absences);
  const [editableAbsences, setEditableAbsences] = useState([]);
  const [selectedAbsence, setSelectedAbsence] = useState("month");
  const [selectedPoints, setSelectedPoints] = useState("month");
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const [save, setSave] = useState(false);
  const [selectedPointsChartType, setSelectedPointsChartType] = useState(
    "yearChart"
  );

  const handlePointsChartTypeChange = (event) => {
    setSelectedPointsChartType(event.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(fetchAbsenceByEmployeeId(employee.user_id));
    if (absences.length > 0) setEditableAbsences([...absences]);
  }, [dispatch, employee, status, absences]);

  useEffect(() => {
    if (employee && employeesStatus === "idle") {
      dispatch(fetchEmployees());
    }
  }, [employee]);

  const onCancel = () => {
    setSave(false);
    setEditableAbsences(absences);
    setEditableEmployee(employee);
  };

  const handleCheckboxChange = (absenceId) => {
    setEditableAbsences((prevAbsences) =>
      prevAbsences.map((absence) =>
        absence.absence_id === absenceId
          ? { ...absence, justificated: !absence.justificated }
          : absence
      )
    );
    setSave(true);

    const updatedAbsence = editableAbsences.find(
      (absence) => absence.absence_id === absenceId
    );

    if (updatedAbsence) {
      const absenceDate = new Date(updatedAbsence.date);
      const month = absenceDate.toLocaleString("default", { month: "long" });
      const year = absenceDate.getFullYear();

      const pointsChange = updatedAbsence.justificated ? -15 : 15;

      setEditableEmployee((prevEmployee) => ({
        ...prevEmployee,
        monthly_points: {
          ...prevEmployee.monthly_points,
          [month]: prevEmployee.monthly_points[month] + pointsChange,
        },
        yearly_points: {
          ...prevEmployee.yearly_points,
          [year]: prevEmployee.yearly_points[year] + pointsChange,
        },
      }));
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(absences.length / itemsPerPage)
    ) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedAbsences = editableAbsences.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const total = (yearly_absence) => {
    let total = 0;
    for (const year in yearly_absence) {
      total += yearly_absence[year];
    }
    return total;
  };

  const [chartType, setChartType] = useState("yearChart");

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  function getMaxYAxisValue(data, dataType) {
    const max = Math.max(
      ...data.map((item) =>
        dataType === "Absences" ? item.Absences ?? 0 : item.Points ?? 0
      )
    );
    return Math.ceil(max / 5) * 5;
  }

  const filter_monthly_absence = Object.entries(employee.monthly_absence)
    .filter(([month]) => new Date(`${month} ${currentYear}`) <= currentDate)
    .reduce((obj, [month, value]) => {
      obj[month] = value;
      return obj;
    }, {});

  const monthlyAbsenceData = Object.entries(
    filter_monthly_absence
  ).map(([month, Absences]) => ({ month, Absences }));

  const yearlyAbsenceData = Object.entries(employee.yearly_absence)
    .map(([year, Absences]) => ({ year, Absences }))
    .map((data) => ({
      month: data.year,
      Absences: data.Absences,
    }));

  const handleSelectAbsenceChange = (event) => {
    setSelectedAbsence(event.target.value);
  };

  const handleSelectPointsChange = (event) => {
    setSelectedPoints(event.target.value);
  };

  function getRank(employee, employees, selectedPoints) {
    const points =
      selectedPoints === "month"
        ? employee.monthly_points[currentMonth]
        : selectedPoints === "year"
        ? employee.yearly_points[currentYear]
        : total(employee.yearly_points);

    const sortedEmployees = [...employees].sort((a, b) => {
      const pointsA =
        selectedPoints === "month"
          ? a.monthly_points[currentMonth]
          : selectedPoints === "year"
          ? a.yearly_points[currentYear]
          : total(a.yearly_points);

      const pointsB =
        selectedPoints === "month"
          ? b.monthly_points[currentMonth]
          : selectedPoints === "year"
          ? b.yearly_points[currentYear]
          : total(b.yearly_points);

      return pointsB - pointsA;
    });

    const rank =
      sortedEmployees.findIndex((emp) => emp.user_id === employee.user_id) + 1;

    return rank;
  }

  const filter_monthly_points = Object.entries(editableEmployee.monthly_points)
    .filter(([month]) => new Date(`${month} ${currentYear}`) <= currentDate)
    .reduce((obj, [month, value]) => {
      obj[month] = value;
      return obj;
    }, {});

  const monthlyPointsData = Object.entries(
    filter_monthly_points
  ).map(([month, Points]) => ({ month, Points }));

  const yearlyPointsData = Object.entries(editableEmployee.yearly_points)
    .map(([year, Points]) => ({ year, Points }))
    .map((data) => ({
      month: data.year,
      Points: data.Points,
    }));

  const getChangePercentage = (currentValue, previousValue) => {
    if (!previousValue) return null;
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return change >= 0 ? `${change.toFixed(2)}%` : `${-change.toFixed(2)}%`;
  };

  return (
    <div className="pi-container w-100 mt-3 d-flex flex-column ">
      <EmployeeChange save={save} onCancel={onCancel} />
      <div className="pi-header d-flex align-items-center">
        <FaChartLine className="pi-header-icon" />
        <div className="pi-title">Performance</div>
      </div>

      <div className="pi-section d-flex flex-column py-3">
        <div className="pi-section-title d-flex align-items-center">
          <MdCoPresent />
          <div>Attendance</div>
        </div>
        <div className="pi-section-content d-flex flex-column ">
          <div className="pi-section-group d-flex container m-0 p-0">
            <div className="row">
              <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                <label>Number of absences</label>
                <select
                  value={selectedAbsence}
                  onChange={handleSelectAbsenceChange}
                >
                  <option value="month">Current month</option>
                  <option value="year">Current year</option>
                  <option value="total">Total absences</option>
                </select>
              </div>

              {selectedAbsence === "month" ? (
                <label className="align-self-end col text-nowrap pb-1">
                  <span className="fw-bold">
                    {employee.monthly_absence[currentMonth]}
                  </span>{" "}
                  absences
                </label>
              ) : selectedAbsence === "total" ? (
                <label className="align-self-end col text-nowrap pb-1">
                  <span className="fw-bold">
                    {total(employee.yearly_absence)}
                  </span>{" "}
                  absences
                </label>
              ) : (
                <label className="align-self-end col text-nowrap pb-1">
                  <span className="fw-bold">
                    {employee.yearly_absence[currentYear]}
                  </span>{" "}
                  absences
                </label>
              )}
            </div>
          </div>
          <div className="w-100 border per-chart mb-2 d-flex flex-column align-items-center ">
            <div className="mt-3  d-flex justify-content-center">
              <select value={chartType} onChange={handleChartTypeChange}>
                <option value="yearChart">This year's absences chart</option>
                <option value="totalChart">All years' absences chart</option>
              </select>
            </div>
            <Chart
              gridColor="#ccc"
              lineColor="#8884d8"
              data={
                chartType === "yearChart"
                  ? monthlyAbsenceData
                  : yearlyAbsenceData
              }
              maxYAxisValue={
                chartType === "yearChart"
                  ? getMaxYAxisValue(monthlyAbsenceData, "Absences")
                  : getMaxYAxisValue(yearlyAbsenceData, "Absences")
              }
              xaxis={
                chartType === "yearChart"
                  ? (month) => month.slice(0, 3)
                  : (year) => year
              }
              dataKey={"Absences"}
            />
          </div>
          <div className="pi-content-single-info d-flex flex-column w-100">
            <label>Dates of absences</label>
            {status === "succeeded" ? (
              <div className="per-abs-table d-flex flex-column">
                <table className="unselectable my-2">
                  <thead>
                    <tr>
                      <th className="per-date">Date</th>
                      <th className="per-just">Justificated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAbsences.map((absence) => (
                      <tr key={absence.absence_id}>
                        <td>{formatDate(absence.date)}</td>
                        <td>
                          <div className="per-just-container ">
                            <input
                              style={{ display: "none" }}
                              id={`cbx-${absence.absence_id}`}
                              className="cbx"
                              type="checkbox"
                              checked={absence.justificated}
                              onChange={() =>
                                handleCheckboxChange(absence.absence_id)
                              }
                            />
                            <label
                              className="per-check-just"
                              htmlFor={`cbx-${absence.absence_id}`}
                            >
                              <svg
                                viewBox="0 0 18 18"
                                height="18px"
                                width="18px"
                              >
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {absences.length > itemsPerPage && (
                  <div className="per-abs-paging mt-2 d-flex align-self-end align-items-center">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <MdNavigateBefore />
                    </button>
                    <span>{`${currentPage} of ${Math.ceil(
                      absences.length / itemsPerPage
                    )}`}</span>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(absences.length / itemsPerPage)
                      }
                    >
                      <MdNavigateNext />
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="pi-section d-flex flex-column py-3">
        <div className="pi-section-title d-flex align-items-center">
          <img src={productivity} height="20px" />
          <div>Productivity</div>
        </div>
        <div className="pi-section-content d-flex flex-column ">
          <div className="pi-section-group d-flex container m-0 p-0">
            <div className="row">
              <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                <label>Points</label>
                <select
                  value={selectedPoints}
                  onChange={handleSelectPointsChange}
                >
                  <option value="month">Current month</option>
                  <option value="year">Current year</option>
                  <option value="total">Total points</option>
                </select>
              </div>
              {selectedPoints === "month" ? (
                <label className="align-self-end col text-nowrap pb-1">
                  <span className="fw-bold">
                    {editableEmployee.monthly_points[currentMonth]}
                  </span>{" "}
                  points
                  {monthlyPointsData.length > 1 && (
                    <>
                      <span
                        style={{
                          marginLeft: "10px",
                          borderLeft: "solid 1px",
                          paddingLeft: "10px",
                        }}
                      >
                        {getChangePercentage(
                          editableEmployee.monthly_points[currentMonth],
                          monthlyPointsData[monthlyPointsData.length - 2].Points
                        )}
                      </span>
                      {editableEmployee.monthly_points[currentMonth] >
                      monthlyPointsData[monthlyPointsData.length - 2].Points ? (
                        <GoArrowUpRight
                          style={{ color: "green", fontSize: "120%" }}
                        />
                      ) : (
                        <GoArrowDownRight
                          style={{ color: "red", fontSize: "120%" }}
                        />
                      )}
                    </>
                  )}
                </label>
              ) : selectedPoints === "total" ? (
                <label className="align-self-end col text-nowrap pb-1">
                  <span className="fw-bold">
                    {total(employee.yearly_points)}
                  </span>{" "}
                  points
                </label>
              ) : (
                <label className="align-self-end col text-nowrap pb-1">
                  <span className="fw-bold">
                    {editableEmployee.yearly_points[currentYear]}
                  </span>{" "}
                  points
                  {yearlyPointsData.length > 1 && (
                    <>
                      <span
                        style={{
                          marginLeft: "10px",
                          borderLeft: "solid 1px",
                          paddingLeft: "10px",
                        }}
                      >
                        {getChangePercentage(
                          editableEmployee.yearly_points[currentYear],
                          yearlyPointsData[yearlyPointsData.length - 2].Points
                        )}
                      </span>
                      {editableEmployee.yearly_points[currentYear] >
                      yearlyPointsData[yearlyPointsData.length - 2].Points ? (
                        <GoArrowUpRight
                          style={{ color: "green", fontSize: "120%" }}
                        />
                      ) : (
                        <GoArrowDownRight
                          style={{ color: "red", fontSize: "120%" }}
                        />
                      )}
                    </>
                  )}
                </label>
              )}
              <div className="pi-content-info d-flex flex-column col">
                <label htmlFor="rank">Rank</label>
                <input
                  id="rank"
                  value={
                    employeesStatus === "succeeded"
                      ? getRank(editableEmployee, employees, selectedPoints)
                      : "..."
                  }
                  readOnly
                  style={{ width: "90px" }}
                />
              </div>
            </div>
          </div>
          <div className="w-100 border per-chart mb-2 d-flex flex-column align-items-center ">
            <div className="mt-3  d-flex justify-content-center">
              <select
                value={selectedPointsChartType}
                onChange={handlePointsChartTypeChange}
              >
                <option value="yearChart">This year's points chart</option>
                <option value="totalChart">All years' points chart</option>
              </select>
            </div>
            <Chart
              gridColor="#ccc"
              lineColor="#8884d8"
              data={
                selectedPointsChartType === "yearChart"
                  ? monthlyPointsData
                  : yearlyPointsData
              }
              maxYAxisValue={
                selectedPointsChartType === "yearChart"
                  ? getMaxYAxisValue(monthlyPointsData, "Points")
                  : getMaxYAxisValue(yearlyPointsData, "Points")
              }
              dataKey={"Points"}
              xaxis={
                selectedPointsChartType === "yearChart"
                  ? (month) => month.slice(0, 3)
                  : (year) => year
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
