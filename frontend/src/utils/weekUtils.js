export function getWeekYear(dateString) {
    const date = new Date(dateString);
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

    return {
        year: d.getUTCFullYear(),
        week: weekNo,
        label: `Week ${weekNo}, ${d.getUTCFullYear()}`
    };
}