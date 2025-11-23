
function greetingGenerator(department, company) {
    const dept = String(department).trim();
    const comp = String(company).trim();
    return function (firstName, lastName, timeOfDay) {
        const validTimes = ["morning", "afternoon", "evening"];
        const time = String(timeOfDay).toLowerCase().trim();

        if (!validTimes.includes(time)) {
            throw new Error(
                `Invalid timeOfDay: "${timeOfDay}". Use one of: ${validTimes.join(", ")}`
            );
        }

        const f = String(firstName).trim();
        const l = String(lastName).trim();

        console.log(`Good ${time}, ${f} ${l}! Welcome to the ${dept} department at ${comp}.`);
    };
}


const marketingGreeter = greetingGenerator("Marketing", "TechCorp");

marketingGreeter("Alice", "Johnson", "morning");
marketingGreeter("Bob", "Smith", "afternoon");
marketingGreeter("Charlie", "Brown", "evening");

