const { readdirSync, readFileSync } = require('fs');

// read all the employees file name from the directory where all the schedules will be placed.
const employees = readdirSync('./employee_schedule', 'utf8', (err, files) => {
    if (err) {
        return err
    } else {
        return files
    }
});

// read the files content and put it in an array separated by comas
// create an object for every employee with name and schedule detail 
const getSchedules = () => {
    const employeeSchedules = []
    try {
        for (const name of employees) {
            const schedule = readFileSync(`./employee_schedule/${name}`, 'utf8')
            const sToArray = schedule.split(',')

            const key = name.slice(0, -4)

            const scheduleDetail = {}
            scheduleDetail["name"] = key
            scheduleDetail["schedule"] = sToArray
            employeeSchedules.push(scheduleDetail)

        }
    } catch (error) {
        console.log(error);
    }

    return employeeSchedules
}

// traverse through the schedules array and filter every element that matches with another employee time frame
// although it's a nested for loop, it has minimized runs to reduce time complexity, which I think it's O(2N)
// finally output a name pair of the employees and the time frames count that matched
const output = (schedules) => {
    const out = []
    const copy = [...schedules]
    for (let i = 0; i < schedules.length - 1; i++) {
        for (let j = 1 + i; j < copy.length; j++) {

            if (schedules[i].name !== copy[j].name) {
                out.push(
                    {
                        names: schedules[i].name + "-" + copy[j].name,
                        match: schedules[i].schedule.filter(el => copy[j].schedule.includes(el)).length
                    }
                )

            }

        }

    }
    return out
}
console.log(output(getSchedules()));