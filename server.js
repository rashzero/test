
const express = require('express');
const path = require('path');

const app = express();
const cookieParser = require('cookie-parser');
const usersStat = require('./users_statistic.json');
const users = require('./users.json');

app.use(express.static(path.join(__dirname, 'build')));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use(express.json());
app.use(cookieParser());

const dayMs = (1000 * 60 * 60 * 24);

function getMergedObj(userId) {
  const totalStatistic = usersStat.reduce((sum, user) => {
    if (user.user_id === userId) {
      sum.click += user.clicks;
      sum.view += user.page_views;
    }
    return sum;
  }, { click: 0, view: 0 });

  const user = users.find((item) => item.id === userId);
  const userFull = { ...user, ...totalStatistic };
  return userFull;
}

function getDaysDiff(a, b) {
  const aDays = a / (1000 * 60 * 60 * 24);
  const bDays = b / (1000 * 60 * 60 * 24);
  return aDays - bDays;
}


function createDatesRange(startTimeStamp, finishTimeStamp) {
  const result = [];
  const periodDays = getDaysDiff(finishTimeStamp, startTimeStamp);
  for (let i = 0; i <= periodDays; i++) {
    result.push({
      date: startTimeStamp + (i * dayMs), page_views: 0, clicks: 0,
    });
  }

  return result;
}

app.get('/api/users', (req, res) => {
  const sliceStart = req.query.page * req.query.quantity;
  const sliceEnd = sliceStart + +req.query.quantity;
  const chunkUsers = users.slice(sliceStart, sliceEnd);
  const usersArrRes = chunkUsers.map((user) => {
    const fullActionsPeriod = getMergedObj(user.id);
    return fullActionsPeriod;
  });
  const numberOfButton = Math.ceil(users.length / req.query.quantity);

  if (usersArrRes.length > 0) {
    res.json({
      page: numberOfButton,
      users: usersArrRes,
    });
  } else {
    res.json({ error: 'users not found' });
  }
});

app.get('/api/users/statistic', (req, res) => {
  const { id, start, end } = req.query;
  const userStatistic = usersStat.filter((user) => user.user_id === +id);

  const userStatisticDateInMs = userStatistic.map((user) => {
    const dateMilisecond = new Date(user.date).getTime();
    return {
      user_id: user.user_id,
      date: dateMilisecond,
      clicks: user.clicks,
      page_views: user.page_views,
    }
  });

  const compareDatesInMs = (dateA, dateB) => dateA.date - dateB.date;

  const userStatisticSorted = userStatisticDateInMs.sort(compareDatesInMs);
  const arrDatesRange = createDatesRange(
    new Date(start).getTime(),
    new Date(end).getTime(),
  );

  const userAllDayActions = arrDatesRange.map((date) => {
    const dayActiveReal = userStatisticSorted.find((day) => day.date === date.date);

    return dayActiveReal || date;
  });

  const user = users.find((user) => user.id === +id);
  const userFull = { ...user, stat: userAllDayActions };

  res.json({
    user: userFull,
  });
});

app.head('/api/users/status', async (req, res) => {
  const id = +req.query.id;
  const user = await users.find((user) => user.id === id);
  if (user) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.listen(8080);
