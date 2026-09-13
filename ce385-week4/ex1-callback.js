const students = [
    { id : "6501", name: "สมรักษ์", major: "CE", score: 78},
    { id : "6502", name: "สมหญิง", major: "CE", score: 92},
    { id : "6503", name: "สมหมาย", major: "IT", score: 55},
    { id : "6504", name: "สมฟิวสฺ", major: "LE", score: 85},
];

function fetchStudentById(id, callback) {
    setTimeout(() => {
        if (typeof id !== "string" || id.trim() === ""){
            return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
        }
        const student = students.find(s => s.id === id);
        if (!student) {
            return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
        }
        callback(null, {...student });
    }, 300);
}

fetchStudentById("6501", (err, student) => {
    if (err) return console.log("กรณีที่ 1 ล้มเหลว:", err.message);
    console.log("กรณี 1 สำเร็จ:", student.name);       
});

fetchStudentById("6502", (err, student) => {
    if (err) return console.log("กรณีที่ 2 ล้มเหลว:", err.message);
    console.log("กรณี 2 สำเร็จ:", student.name);       
});

fetchStudentById(42, (err, student) => {
    if (err) return console.log("กรณีที่ 3 ล้มเหลว:", err.message);
    console.log("กรณี 3 สำเร็จ:", student.name);       
});