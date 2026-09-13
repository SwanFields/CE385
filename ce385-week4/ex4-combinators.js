const wait = (ms, value, willFail = false) =>
    new Promise ((resolve, reject) => {
        setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
    });

async function main() {
    console.log("--- 1. Promise.all ---");
    try {
        const s1 = await Promise.all([
            wait(300, "โปรไฟล์"),
            wait(400, "ตารางเรียน"),
            wait(500, "ประกาศ", true)
        ]);
        console.log("้เปิดหน้าแรก", s1)
    } catch (err) {
        console.log("หน้าแรกเปิดไม่ได้:", err.message)
    }

    console.log("\n--- 2. Promise.allSettled ---");
    const s2 = await Promise.allSettled([
        wait(300, "อีเมล"),
        wait(500, "SMS", true),
        wait(400, "แอป")
    ]);
    console.log("รายงานผลสอบ");
    s2.forEach(res => console.log(res));

    console.log("\n--- 3. Promise.any ---");
    const s3 = await Promise.any([
        wait(300, "mirror-A", true),
        wait(600, "mirror-B")    
  ]);
  console.log("ใช้ข้อมูลจาก:", s3);

  console.log("\n--- 4. Promise.race ---");
  try {
    const timeout = wait(800, "Timeout", true);
    const db = wait(1200, "ฐานข้อมูล");
    const s4 = await Promise.race([db, timeout]);
    console.log("ข้อมูลที่ได้:", s4);
  } catch (err) {
    console.log("ใช้แคชเก่า");
  }
}

main();