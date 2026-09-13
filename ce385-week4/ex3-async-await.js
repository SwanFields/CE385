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

async function reportSequential() {
    console.log("--- แบบดึงทีละคน ---");
    const t0 = Date.now();
    const ids = ["6501", "6502", "6503"];
    for (const id of ids) {
        await fetchStudentByIdAsync(id);
    }
    console.log("ตามลำดับใช้เวลา:", Date.now() - t0, "ms");
}

async function reportParallel() {
    console.log("--- แบบดึงพร้อมกัน ---");
    const t0 = Date.now();
    const ids = ["6501", "6502", "6503"];
    await Promise.all(ids.map(id => fetchStudentByIdAsync(id)));
    console.log("ขนานใช้เวลา:", Date.now() - t0, "ms\n");
}

async function safeReport(id){
    try {
        const student = await fetchStudentByIdAsync(id);
        const grade = student.score >= 80 ? 'A' : (student.score >= 50 ? 'P' : 'F');
        console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
    } catch (error) {
        console.log(`ตรวจไม่พบ : ${error.message}`);
    } finally {
        console.log(`--- จบการตรวจสอบ ---\n`);
    }
}

async function main() {
    await reportSequential();
    await reportParallel();

    console.log("--- ทดสอบแบบปลอดภัย ---");
    await safeReport("6501");
    await safeReport("9999");
}

main();