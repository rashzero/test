import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import ChartClicks from './ChartClicks';
import ChartViews from './ChartViews';

class User extends React.Component {
  
  state = {
    user: {},
    weekStatistic: '',
    startFilter: '2019-10-01',
    finishFilter: '2019-10-07',
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.searchUser(id);
  }



  searchUser = async (id) => {
    const url = `http://localhost:8080/api/user?id=${id}`;
    const response = await fetch(url, {method: 'HEAD'});
    const status = await response.status;
    console.log(status);
    if (status === 200) {
      this.getUsers(id);
    } else {
      return null;
    };
  };

  getUsers = async (id) => {
    const {startFilter, finishFilter} = this.state;
    const start = startFilter;
    const end = finishFilter;
    const url = `http://localhost:8080/api/users/statistic?id=${id}&start=${start}&end=${end}`;
    const responseNumberOfPage = await fetch(url);
    const responseJsonNumberOfPage = await responseNumberOfPage.json();
    this.setState({
      user: responseJsonNumberOfPage.user,
    });
  }

  handleChangeStart = async (event) => {
    await this.setState({ 
      startFilter: event.target.value,
    });
    this.getUsers(this.state.user.id);
  }

  handleChangeFinish = async (event) => {
    await this.setState({ 
      finishFilter: event.target.value,
    });
    this.getUsers(this.state.user.id);
  }

  render() {
    const {user} = this.state;
    console.log(user);
    console.log(this.state);

    return (
      <div>
        <div className={this.props.classes.root}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/" >
              Main Page
            </Link>
            <Link color="inherit" href="/statistic/0" >
              User statistics
            </Link>
            <Typography color="primary">{`${user.first_name} ${user.last_name}`}</Typography>
          </Breadcrumbs>
        </div>
        <div>
          <Typography  className="header_statistic_user_name"> 
            {`${user.first_name} ${user.last_name}`} 
          </Typography>
        </div>
        <div>
          <center>
            <label name="date">От </label>
            <input 
              id="dateStart" 
              type="date" 
              min="2019-10-01" 
              max="2019-10-31" 
              className="sort"
              defaultValue="2019-10-01" 
              onChange={this.handleChangeStart} 
            />
            <label name="date" className="header_statistic_before">До </label>
            <input 
              id="dateFinish" 
              type="date" 
              min="2019-10-01" 
              max="2019-10-31" 
              className="sort"
              defaultValue="2019-10-07" 
              onChange={this.handleChangeFinish} 
            />
          </center>
        </div>
        <div>
          <Typography  className="header_statistic_click"> 
            Clicks 
          </Typography>
        </div>
        <div>
          <ChartClicks statistics={this.state.user.stat}/>
        </div>
        <div>
          <Typography  className="header_statistic_click"> 
            Views 
          </Typography>
        </div>
        <div>
          <ChartViews statistics={this.state.user.stat}/>
        </div>
        <div className="footer">
          <span className="footer_company">
            AppCo
          </span>
          <span>
            All rights reserved by ThemeTags
          </span>
          <span>
            Copyrights © 2019. 
          </span>
        </div>
      </div>
    )
  }        
}

const useStylesForm = withStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginTop: '25px',
    marginLeft: '10%',
    fontSize: '16px',
  },
}))(User);

export default (useStylesForm);
