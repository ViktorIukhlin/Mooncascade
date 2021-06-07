# Mooncascade - Sports event timing  

## Background: sports event timing
There are 2 automatic digital timing points/locations in the finish corridor:
1. Entering into finish corridor
2. Crossing the finish line

From the timing point the following information is sent to our server:
1. The code of the chip that is attached to the athlete/sportsmen (identifier)
2. The identifier of the timing point
3. The (wall)clock time with a precision of a fraction of second, when the athlete (the given
chip) passed this timing point.

The database, that is prepared before the sports event, has a table with the following information
about the athletes participating the sports event:
1. The code/identifier of the chip that is attached to this athlete
2. The start number of the athlete
3. The full name (First name, Surname) of the athlete

## The task
Implement the following software:
1. Server/service, that receives the timing information in real-time. Protocol is not known at the
    moment -- just design it yourself in the way you wish it. You can’t use the real timing system
    for testing -- create a test-client that sends some dummy data instead.
2. Web user interface, that displays in real-time in table form the athletes who have entered the
finish corridor in the following way:
    a. When an athlete enters the finish corridor, a corresponding row is added to the table,
    where the athlete’s start number and name is displayed.
    b. When the athlete crosses the finish line, the finish time is added to the athlete’s row.
    c. Design the UI in the way that the athlete’s who entered to the finish corridor last,
    would be visible to the user without any effort from the user -- the older rows/records
    just move out of the visible area, sequentially.
    d. Demonstrate the functioning of the system with the test-client that sends the dummy
    data.
    e. Try to design the user interface in the way, that user don’t have to put any effort or do
    any additional moves in order to see something (for example, no need to “refresh” or
    scroll the page or do any other annoyances), so that he/she would understand
    adequately what is happening and won’t get confused.

## Non-mandatory additional tasks
3. Make sure that the athletes who cross the finish-line would be displayed in the correct
    order -- for example, if athlete A enters the finish corridor before athlete B, then they are
    displayed in the order of entering the corridor. But if athlete B passes the athlete A in the
    finish corridor (i.e. the athlete B crosses the finish line before the athlete A), then adjust
    the displayed order accordingly. Demonstrate it with the dummy test-client.

4. Do so that the web user interface would interact with the server in real-time only, when
    the browser window is in foreground / active. If the user brings some other application
    window into foreground, then the web user interface has to stop the communication with
    the server. If the user activates the web browser window again, the real-time
    communication with the server must be resumed.

5. If the browser window has been deactivated meantime and the user brings it to
    foreground again, then, depending on the technical solution, there might be situation
    where there is a “gap” in the information that has been received from the server
    (because the communication with the server didn’t happen and the information was not
    sent). In that case, think / propose how it could be handled in the user interface so, that
    user would understand it adequately and won’t get confused.

## 4 steps to run an app

```sh
Download ZIP
run the project in Code Editing
npm install
npm start
```
## App structure
```
Mooncascade
├── README.md
├── node_modules
├── package.json
├── .prettierrc
├── .gitignore
├── .gitattributes
├── client
│   ├── public
│   ├── src
│   ├── package-lock.json
│   └── package.json
├── server
│   ├── package-lock.json
│   ├── package.json
│   └── websocket.js
└── test-client
    ├── .env
    ├── public
    ├── src
    ├── package-lock.json
    └── package.json
```
## How it works? 

1. At the beginning after 2 clients and server start, you need to go to the tab **Test Client** and configure the data that will be transmitted to the main client

<p align='center'>
    <img src='https://github.com/ViktorIukhlin/Mooncascade/blob/main/1.png' width='600' alt='Build errors'>
</p>

You can use the default settings by simply clicking on the button  **SEND DUMMY DATA**.

2. Go to the tab **Client** and wait for data on athletes to appear gradually.

<p align='center'>
    <img src='https://github.com/ViktorIukhlin/Mooncascade/blob/main/2.png' width='100%' alt='Build errors'>
</p>

**Attention!**

**When you leave the Main Client tab, information reception stops, but when you return to the tab, the data will start to be received again**

## Credits

Thanks a lot to the [Mooncascade](https://mooncascade.com/about) team for this test! 
It was very interesting to do it!
