const URL = 'https://google-doodles.herokuapp.com/doodles/year/month?hl=en';
const GOOGLE_HANDOFF = "https://www.google.com/search?q=query";
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = getYears();

let monthData = [];
let previousMonth = new Date().getMonth();

export async function fetchMonthly(selectedDate) {
    let urls = []
    for (const year of years)
        urls.push(URL.replace("year", year).replace("month", selectedDate.getMonth() + 1));

    let requests = urls.map(url => fetch(url));
    let responses = await Promise.all(requests);

    // Get all the jsons
    let jsons = [];
    for (const response of responses) {
        const json = await response.json();
        jsons.push(json);
    }
    return jsons;
}

export async function getTodayByYear(selectedDate, forceFetch, showLoader) {
    if (forceFetch) {
        showLoader(true);
        monthData = await fetchMonthly(selectedDate);
        showLoader(false);
    } else {
        // Only fetch if the month is different
        if (previousMonth !== selectedDate.getMonth()) {
            showLoader(true);
            monthData = await fetchMonthly(selectedDate);            
            previousMonth = selectedDate.getMonth();
            showLoader(false);
        }
    }

    let jsons = [];
    for (const json of monthData) {
        try {
            const todayDoodle = extractTodayFromMonth(json, selectedDate.getDate());
            if (todayDoodle.length > 0)
                jsons.push(todayDoodle[0]);
        } catch (error) { }
    }
    return jsons;
}

function extractTodayFromMonth(jsonList, day) {
    let todayList = [];
    for (const json of jsonList)
        if (json.run_date_array[2] === day)
            todayList.push(json);

    return todayList;
}

function getYears() {
    let arr = [];
    let currentYear = new Date().getFullYear();
    while (currentYear !== 1997)
        arr.push(currentYear--);

    return arr;
}

export function getFormattedDate(selectedDate, date) {
    return months[selectedDate.getMonth()] + " " + date[2] + ", " + date[0];
}

export function getHandoffLink(handoff) {
    return GOOGLE_HANDOFF.replace("query", handoff);
}

export function getFormattedDate2(date) {
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}