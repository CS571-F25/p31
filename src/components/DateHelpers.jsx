export function getDueDistance(dateString, timeString = null) {
    if (!dateString) return "";

    // Build full datetime
    let due = new Date(dateString);
    if (timeString) {
        const [hour, minute] = timeString.split(":").map(Number);
        due.setHours(hour, minute, 0, 0);
    } else {
        due.setHours(23, 59, 59, 999); // end of day for no-time tasks
    }

    const now = new Date();

    const diffMinutes = (due - now) / (1000 * 60);

    // --- Minute-based overdue ---
    if (diffMinutes < 0) return "Overdue";

    // --- Day-based display ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOnlyDue = new Date(due);
    dayOnlyDue.setHours(0, 0, 0, 0);

    const diffDays = Math.round((dayOnlyDue - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "";
    return `(${diffDays} day${diffDays > 1 ? "s" : ""} away)`;
}

export function formatDueDate(dateString, timeString = null) {
    if (!dateString) return "";
    
    let dueDate;
    if (dateString.includes("T")) {
        dueDate = new Date(dateString);
    } else {
        const [yearStr, monthStr, dayStr] = dateString.split("-");
        dueDate = new Date(yearStr, monthStr - 1, dayStr);
    }
    if (isNaN(dueDate)) return "";

    const today = new Date();
    today.setHours(0,0,0,0);

    const diffDays = Math.round((dueDate - today) / (1000*60*60*24));

    let prefix;
    if (diffDays === 0) prefix = "Today";
    else if (diffDays === 1) prefix = "Tomorrow";
    else if (diffDays === -1) prefix = "Yesterday";
    else prefix = dueDate.toLocaleDateString("en-US", { 
        weekday: "long", 
        month: "long", 
        day: "numeric" 
    });

    if (timeString) {
        const [hour, minute] = timeString.split(":").map(Number);
        dueDate.setHours(hour, minute);
        const formattedTime = dueDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
        return `${prefix} at ${formattedTime}`;
    }

    return prefix;
}
