const gMail = require("./../APIs/gMail.js");

class emailOptions {
    constructor(To, Subject, Html) {
        this.to = To;
        this.subject = Subject;
        this.html = Html;
    }
}

var signature = "<div style='font-family:Times New Roman'><p>Best wishes,<br>MURP-bot (they/them)<br>Archivist Assistant<br><span style='color:#888888'>Monash University Role Players (MURP)</span><br><i><a href='mailto:murp@monashclubs.org'>murp@monashclubs.org</a></i></p></div>"

function bookingConfirm(m, emailMatch) {
    let html = "<div style='font-family:Times New Roman'><p>Hi " + emailMatch["name"] + ",<br>I've just received your room allocations from Venues. Thank you for waiting.</p><table style='border-collapse: collapse; font-size: 10pt;'><tr><th style='border: solid black 1px; padding: 2px 5px;'>Day</th><th style='border: solid black 1px; padding: 2px 5px;'>Start Time</th><th style='border: solid black 1px; padding: 2px 5px;'>End Time</th><th style='border: solid black 1px; padding: 2px 5px;'>Location</th><th style='border: solid black 1px; padding: 2px 5px;'>Dates</th></tr><tr><td style='border: solid black 1px; padding: 2px 5px;'>" + emailMatch["allocation"][0] + "</td><td style='border: solid black 1px; padding: 2px 5px;'>" + emailMatch["allocation"][1] + "</td><td style='border: solid black 1px; padding: 2px 5px;'>" + emailMatch["allocation"][2] + "</td><td style='border: solid black 1px; padding: 2px 5px;'>" + emailMatch["allocation"][3] + "</td><td style='border: solid black 1px; padding: 2px 5px;'>" + emailMatch["allocation"][4] + "</td></tr></table><p>I hope you enjoy your weekly games and if you have any questions please let me know.</p></div>" + signature;
    var options = new emailOptions(emailMatch["email"], "Allocated Rooms (Bot Test)", html);
    gMail.sendMail(options);
    let outMsg = "Sent B.C. to " + emailMatch["name"] + " at " + emailMatch["email"];
    console.log(outMsg);
    m.channel.send(outMsg);
    return outMsg
}

module.exports = {
    bookingConfirm
}