const students = [
    { id : "6501", name: "สมรักษ์", major: "CE", score: 78},
    { id : "6502", name: "สมหญิง", major: "CE", score: 92},
    { id : "6503", name: "สมหมาย", major: "IT", score: 55},
    { id : "6504", name: "สมฟิวสฺ", major: "LE", score: 85},
];

function fetchStudentByIdAsync(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof id !== "string" || id.trim() === ""){
                return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
            }
            const student = students.find(s => s.id === id);
            if (!student) {
                return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
            }
            resolve({...student });
        }, 300);
    })
}

fetchStudentByIdAsync("6501")
    .then(student => {
        const grade = student.score >= 80 ? 'A' : (student.score >= 50 ? 'P' : 'F');
        return {name: student.name, grade: grade };
    })
    .then(data => {
        return `รายงาน : ${data.name} ได้เกรด ${data.grade}`;
    })
    .then(message => {
        console.log(message);
    })
    .catch(err => console.log("ล้มเหลว:", err.message))
    .finally(() => console.log("จบการทำงาน"));

fetchStudentByIdAsync("9999")
    .then(student => {
        const grade = student.score >= 80 ? 'A' : (student.score >= 50 ? 'P' : 'F');
        return {name: student.name, grade: grade };
    })
    .then(data => {
        return `รายงาน : ${data.name} ได้เกรด ${data.grade}`;
    })
    .then(message => {
        console.log(message);
    })
    .catch(err => console.log("ล้มเหลว:", err.message))
    .finally(() => console.log("จบการทำงาน"))

fetchStudentByIdAsync(42)
    .then(student => {
        const grade = student.score >= 80 ? 'A' : (student.score >= 50 ? 'P' : 'F');
        return {name: student.name, grade: grade };
    })
    .then(data => {
        return `รายงาน : ${data.name} ได้เกรด ${data.grade}`;
    })
    .then(message => {
        console.log(message);
    })
    .catch(err => console.log("ล้มเหลว:", err.message))
    .finally(() => console.log("จบการทำงาน"))


    