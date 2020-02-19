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

app.get('/api/users/user', (req, res) => {
  const id = +req.query.id;
  function getMergedObj(userId) {
    const userStat = usersStat.reduce(function (newArr, user) {
      if (user.user_id === userId) {
        newArr.push(user)
      }
      return newArr;
    }, []);  

    userStat.map((user) => {
      const date = new Date(user.date);
      const dateNum = Date.parse(date);
      user.date = dateNum;
    });

    const fillDayGaps = ({ user }) => {
      const result = [];
      const getDaysDiff = (a, b) => {
          const aDays = a / (1000*60*60*24);
          const bDays = b / (1000*60*60*24);
          return aDays - bDays;
      }

      const startDate = 1569801600000;
      const finishDate = 1572566400000;

      if (user[0].date > startDate) {
        console.log(user[0].date);
        console.log(startDate);
        const diffStart = getDaysDiff(user[0].date, startDate);
        for (let i = 1; i < diffStart; i++) {
          const dayMs = 1000*60*60*24;
          const missingDay = startDate + (dayMs * i);
          result.push({user_id: user[0].user_id, date: missingDay, page_views: 0, clicks: 0});
        }
        console.log(diffStart);
      }
   
      user.forEach((user, index, arr) => {
        if (index === arr.length) {
          result.push(user);
          return;
        }
        const current = new Date(user.date);
        const next = new Date(arr[index+1]);
        const diff = getDaysDiff(next, current);
    
        result.push(user);

        if (diff > 1) {
          for (let i = 1; i < diff; i++) {
            const dayMs = 1000*60*60*24;
            const missingDay = current.getTime() + (dayMs * i);
            result.push(missingDay);
          }
        }
    
      });

      if (user[user.length - 1].date < finishDate) {
        console.log(user[user.length - 1].date);
        console.log(startDate);
        const diffStart = getDaysDiff(finishDate, user[user.length - 1].date);
        for (let i = 1; i < diffStart; i++) {
          const dayMs = 1000*60*60*24;
          const missingDay = user[user.length - 1].date + (dayMs * i);
          result.push({user_id: user[user.length - 1].user_id, date: missingDay, page_views: 0, clicks: 0});
        }
        console.log(diffStart);
      }

    return result;
  }
   
    const userStatistic = fillDayGaps({ user: userStat });

    const user = users.find(item => item.id === userId);
    const userFull = Object.assign({}, user);
    userFull.stat = userStatistic;
    return userFull;
  }

  const userData = getMergedObj(id);

  res.json({
    user: userData,
  });

});

app.head('/api/users/user', (req, res) => {
  const id = +req.query.id;
  const user = users.find(item => item.id === id);
  if (user) {
    res.status(200);
  }
  res.status(404);
});

app.listen(8080);
