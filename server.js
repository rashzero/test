/*import users from './users.json';
import usersStat from './users_statistic.json';*/

const users = require('./users.json');
const usersStat = require('./users_statistic.json');

const express = require('express');
const path = require('path');

const app = express();
const cookieParser = require('cookie-parser');

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

app.get('/api/users', (req, res) => {
  const sliceStart = req.query.page * 50;
  const sliceEnd = sliceStart + 50;
  function getMergedObj(userId) {
    let totalClicks = usersStat.reduce(function (sum, user) {
      if (user.user_id === userId) {
        sum = sum + user.clicks;
      }
      return sum;
    }, 0); 
    let totalPageViews = usersStat.reduce(function (sum, user) {
      if (user.user_id === userId) {
        sum = sum + user.page_views;
      }
      return sum;
    }, 0); 

    const user = users.find(item => item.id === userId);
    const userFull = Object.assign({}, user);
    userFull.clicks = totalClicks;
    userFull.page_views = totalPageViews;
    return userFull;
  }
  
  const usersArrRes = users.map((item) => (
    getMergedObj(item.id)
  ));

  const numberOfButton = Math.ceil(usersArrRes.length / 50);
    const chunkUsers = usersArrRes.slice(sliceStart, sliceEnd);

  res.json({
    allUsers: usersArrRes,
    numbOfPage: numberOfButton,
    chunkUsers: chunkUsers,
  });

});
const getLastDayOfMonth = (year, month) => {
  return +(new Date(year, month, 1).setUTCHours(0));
}

const fillDayGaps = ({ data }) => {
  const result = [];
  const getDaysDiff = (a, b) => {
    const aDays = a / (1000 * 60 * 60 * 24);
    const bDays = b / (1000 * 60 * 60 * 24);
    return aDays - bDays;
  }

  const d = new Date(data[0].date);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();

  const startDate = getLastDayOfMonth(year, month);
  const finishDate = getLastDayOfMonth(year, month + 1);

  if (data[0].date > startDate) {
    const diffStart = getDaysDiff(data[0].date, startDate);
    for (let i = 1; i < diffStart; i++) {
      const dayMs = 1000*60*60*24;
      const missingDay = startDate + (dayMs * i);
      result.push({user_id: data[0].user_id, date: missingDay, page_views: 0, clicks: 0});
    }
  }

  data.forEach((userStat, index, arr) => {
    // first or last userStat
    if (index === 0 || index === arr.length) {
      result.push(userStat);
      return;
    }

    const current = new Date(userStat.date);
    const next = new Date(arr[index + 1]);
    const diff = getDaysDiff(next, current);

    result.push(userStat);

    if (diff > 1) {
      for (let i = 1; i < diff; i++) {
        const dayMs = 1000 * 60 * 60 * 24;
        const missingDay = current.getTime() + (dayMs * i);
        result.push(missingDay);
      }
    }

  });

  if (data[data.length - 1].date < finishDate) {
    const diffStart = getDaysDiff(finishDate, data[data.length - 1].date);
    for (let i = 1; i < diffStart; i++) {
      const dayMs = 1000*60*60*24;
      const missingDay = data[data.length - 1].date + (dayMs * i);
      result.push({user_id: data[data.length - 1].user_id, date: missingDay, page_views: 0, clicks: 0});
    }
  }

  return result;
}

app.get('/api/users/statistic', (req, res) => {
  console.log(req.query.id);
  const {id, start, end } = req.query;

  const userStatistic = usersStat.reduce(function (newArr, user) {
    if (user.user_id === +id) {
      newArr.push(user)
    }
    return newArr;
  }, []); 

  userStatistic.map((user) => {
    const date = +new Date(user.date).setHours(0);
    user.date = date;
  });
  
  const compare = (dateA, dateB) => {
    return dateA.date - dateB.date;
  }

  const userStatisticFilter = userStatistic.sort(compare);
  console.log(userStatisticFilter);
  const fullUserStatistics = fillDayGaps({ data: userStatisticFilter });
  console.log(fullUserStatistics);
  const userStatisticsFilter = { stat: fullUserStatistics.slice(+start, +end) };
  const user = users.find(user => user.id === +id);
  const userFull = Object.assign({}, user, userStatisticsFilter);

  res.json({
    user: userFull,
  });

});

app.head('/api/user', async (req, res) => {
  const id = +req.query.id;
  console.log(id);
  const user = await users.find(item => item.id === id);
  if (user) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.listen(8080);
