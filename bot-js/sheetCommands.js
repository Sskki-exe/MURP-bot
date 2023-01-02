const gSheets = require("./../APIs/gSheets.js");


class emailMatch {
    constructor(Name, Email, Allocation) {
        this.name = Name;
        this.email = Email;
        this.allocation = Allocation;
    }
}

async function match(m, url) {
    let sheetID = gSheets.urlToSheetID(url);
    m.channel.send("Getting Sheets...")
    const toVenues = await gSheets.sheetByTitle("toVenues", sheetID);
    const fromVenues = await gSheets.sheetByTitle("fromVenues", sheetID);
    let dCount = 0;
    let nmCount = 0;
    let matches = [];
    let outMsg = "";
    m.channel.send("Creating matches...")
    for (let alloc of fromVenues) { // Go through each allocation
        let names = [];
        for (let mbr of toVenues) { // Go through member
            // Check day, start time and end time; don't check date
            if (mbr["Day of Week"] == alloc["Scheduled Days"] && mbr["Start Time"].split(":").slice(0, 2).join(":") == alloc["Scheduled Start Time"].split(":").slice(0, 2).join(":") && mbr["End Time"].split(":").slice(0, 2).join(":") == alloc["Scheduled End Time"].split(":").slice(0, 2).join(":")) { //&& mbr["Start date"].replace("0", "") + "-" + mbr["End Date"].replace("0", "") == alloc["Activity Dates"].replace("0", "")) {
                if (!names.map(function(v) { return v[0]; }).includes(mbr["Game Master"])) {
                    names.push([mbr["Game Master"], mbr["Member Email"]]);
                }
            }
        }
        //console.log(names);
        if (names.length) {
            if (names.length == 1) {
                alloc["Name"] = names[0][0];
                allocation = [alloc["Scheduled Days"], alloc["Scheduled Start Time"], alloc["Scheduled End Time"], alloc["Allocated Location Name"], alloc["Activity Dates"]];
                matches.push(new emailMatch(names[0][0], names[0][1], allocation));
            } else {
                dCount++;
                alloc["Name"] = "Double Match: " + names[0][0];
                for (let name of names.slice(1)) {
                    alloc["Name"] += ", " + name[0];
                }
            }
        } else {
            nmCount++;
            alloc["Name"] = "";
        }
        await alloc.save();
    }
    // Report double matches and no matches
    for (let mbr of toVenues) {
        let flag = true;
        for (let alloc of fromVenues) {
            if (alloc["Name"].slice(0, 13) == "Double Match:") {
                for (let name of alloc["Name"].slice(14).split(", ")) {
                    if (mbr["Game Master"] == name) {
                        flag = false;
                        continue;
                    }
                }
            }
            if (mbr["Game Master"] == alloc["Name"]) {
                flag = false;
                continue;
            }
        }
        if (flag) {
            outMsg+=mbr["Game Master"] + " not allocated!";
        }
    }
    outMsg+="\n" + matches.length + " matches! " + dCount + " double matches! " + nmCount + " no matches!";
    console.log(outMsg);
    m.channel.send(outMsg);
    return matches
}

module.exports = {
    match
};