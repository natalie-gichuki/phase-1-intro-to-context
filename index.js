// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    //convert time into an interger using parseInt
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour) })
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    //convert time into an interger
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour) });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let inEvents = employee.timeInEvents.find(e => e.date === date);
    let outEvents = employee.timeOutEvents.find(e => e.date === date);
    return (outEvents.hour - inEvents.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor (employee) {
    return employee.timeInEvents
    .map(events => wagesEarnedOnDate(employee, events.date))
    .reduce((total, wage) => total + wage, 0);
}

function calculatePayroll(employee) {
    return employee
    .map(allWagesFor.bind(null))
    .reduce((total, wage) => total + wage, 0);
}