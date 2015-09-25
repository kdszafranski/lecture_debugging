var options = {};

var params = {
    calendarId : 'primary',
    timeMin : (new Date()).toISOString(),
    timeMax : undefined,
    maxResults : 25,
    singleEvents : true,
    orderBy : 'startTime'
};

if(options) {
    params.calendarId = options.calendarId;
    params.timeMin = options.timeMin ? options.timeMin : (new Date()).toISOString();
    params.timeMax  = options.timeMax ? options.timeMax : undefined;
    params.maxResults = options.maxResults ? options.maxResults : 25;
    params.singleEvents = options.singleEvents ? options.singleEvents : true;
    params.orderBy = options.orderBy ? options.orderBy : 'startTime';
}