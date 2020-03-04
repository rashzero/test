import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import ChartClicks from './ChartClicks';
import ChartViews from './ChartViews';
import './css/User_statistic.scss';
import './css/Footer.scss';

class User extends React.Component {
  
  state = {
    user: {},
    startFilter: '2019-10-01',
    finishFilter: '2019-10-07',
  };

  componentDidMount() {
    this.getUserWithStat();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.startFilter !== prevState.startFilter || this.state.finishFilter !== prevState.finishFilter) {
      this.getUserWithStat();
    }
  }

  checkUserExistenceRequest = async () => {
    const url = `http://localhost:8080/api/users/status?id=${this.props.match.params.id}`;
    const response = await fetch(url, {method: 'HEAD'});
    if (response.status === 200) {
      return { userExist: true }
    } else {
      return { error: 'User not found' };
    };
  };

  getUserWithStatRequest = async () => {
    const {startFilter, finishFilter} = this.state;
    const url = `http://localhost:8080/api/users/statistic?id=${this.props.match.params.id}&start=${startFilter}&end=${finishFilter}`;
    const responseNumberOfPage = await fetch(url);
    const responseJsonNumberOfPage = await responseNumberOfPage.json();
    if (responseJsonNumberOfPage) {
      return { user: responseJsonNumberOfPage.user };
    } else {
      return { error: 'user not get' }
    }
  }

  getUserWithStat = async () => {
    const UserWithStatRequest = await this.checkUserExistenceRequest();
    if (UserWithStatRequest.error) {
      console.log(5);
      alert(UserWithStatRequest.error);
      return
    }

    const userWithStatRequest = await this.getUserWithStatRequest();
    if (userWithStatRequest.error) {
      console.log(6);
      alert(userWithStatRequest.error);
      return
    } 
      
    console.log(7);
    console.log(userWithStatRequest);
    this.setState({
      user: userWithStatRequest.user,
    });
  }

  handleChangeStart = (event) => {
    this.setState({
      startFilter: event.target.value,
    });
  }

  handleChangeFinish = (event) => {
    this.setState({ 
      finishFilter: event.target.value,
    });
  }

  render() {
    const {user} = this.state;

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
          <Typography  className="content__user-name"> 
            {`${user.first_name} ${user.last_name}`} 
          </Typography>
        </div>
        <div>
          <center>
            <label name="date">От </label>
            <input 
              id="dateStart" 
              type="date" 
              className="sort"
              value={this.state.startFilter}
              onChange={this.handleChangeStart} 
            />
            <label name="date" className="content__date">До </label>
            <input 
              id="dateFinish" 
              type="date" 
              className="sort"
              value={this.state.finishFilter} 
              onChange={this.handleChangeFinish} 
            />
          </center>
        </div>
        <div>
          <Typography  className="content__title"> 
            Clicks 
          </Typography>
        </div>
        <div>
          <ChartClicks statistics={this.state.user.stat}/>
        </div>
        <div>
          <Typography  className="content__title"> 
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

useStylesForm.propTypes = {
  match: PropTypes.object,
};

export default withRouter(useStylesForm);
