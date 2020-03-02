import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import CircularIndeterminate from './CircularIndeterminate';
import './css/User_table.scss';
import './css/User_statistic.scss';
import './css/Footer.scss';

class Statistic extends React.Component {
  quantityUsersOnPage = 50; 

  state = {
    users: [],
    isLoading: false,
    cache: {},
    paginationPagesQuantity: '',
  };

  componentDidMount() {
    this.getUsers(this.currentPage);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.getUsers(this.currentPage);
    }
  }

  get currentPage() {
    const { page } = this.props.match.params;
    if (+page) {
      return +page;
    } else {
      return 0;
    }
  }

  getUsersRequest = async (page) => {
    try{
      const url = `http://localhost:8080/api/users?page=${page}&quantity=${this.quantityUsersOnPage}`;
      const responseNumberOfPage = await fetch(url);
      const responseJsonNumberOfPage = await responseNumberOfPage.json();
      const users = responseJsonNumberOfPage.chunkUsers;
      
      if (users.length > 0) {
        return responseJsonNumberOfPage;
      } else {
        throw new RangeError("Данные некорректны");
      }

    } catch (e) {
      return { error: `${e.name}: users not found`, users: [] };
    }
  }

  getUsers = async (userId) => {
    const cacheCloned = { ...this.state.cache };

    this.setState({
      isLoading: true,
    });

    const usersRequest = await this.getUsersRequest(userId);

    if (usersRequest.error) {
      alert(usersRequest.error);
    } else if (userId in cacheCloned) {
      this.setState({
        users: cacheCloned[userId],
        isLoading: false,
      })
    } else {
      cacheCloned[userId] = usersRequest.chunkUsers;
      this.setState({
        users: usersRequest.chunkUsers,
        cache: cacheCloned,
        paginationPagesQuantity: usersRequest.numbOfPage,
        isLoading: false,
      })
    } 

    if (userId !== this.currentPage) {
      this.props.history.push(`/statistic/${userId}`);
    }
  }

  nextPage = () => {
    this.getUsers(this.currentPage + 1);
  }

  backPage = () => {
    this.getUsers(this.currentPage - 1);
  }

  handlerLinkToUser = (id) => {
    this.props.history.push(`/user/${id}`)
  }
 
  render() {
    const { users } = this.state;

    if (this.state.isLoading) {
      return <CircularIndeterminate />;
    }

    return (
      <div>
        <div className={this.props.classes.root}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/" >
              Main Page
            </Link>
            <Typography color="primary">User satistics</Typography>
          </Breadcrumbs>
        </div>
        <div>
          <Typography  className="content__user-name"> 
            Users statistics 
          </Typography>
        </div>
        <div className="content__table">
          <table>
            <thead>
              <tr className="content__table_header">
                <td className="content__table_header_no-even">id</td>
                <td>First name</td>
                <td>Last name</td>
                <td>Email</td>
                <td>Gender</td>
                <td>IP adress</td>
                <td>Total clicks</td>
                <td className="content__table_header_even">Total page views</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  style={{ backgroundColor: (user.id % 2) ? '#FBFBFB' : '#F1F1F1' }}
                  onClick={() => this.handlerLinkToUser(user.id)}
                  key={user.id}
                  className="content__table_rows"
                >
                  <td >{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.ip_address}</td>
                  <td>{user.click}</td>
                  <td >{user.view}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="content__pagination">
          <center>
            <ButtonGroup
              color="primary"
              aria-label="large outlined secondary button group"
              className="content__pagination_elem"
            >
              <Button  
                disabled={(this.currentPage <= 0) ? true : false} 
                onClick={this.backPage}
              >
                Назад
              </Button>
              {new Array(this.state.paginationPagesQuantity)
                .fill(null)
                .map((value, index) => (
                  <Button
                    style={{ backgroundColor: (this.currentPage === index) ? '#3A80BA' : '' }}
                    value={index}
                    onClick={() => this.getUsers(index)}
                    key={index}
                  >
                    {index + 1}
                  </Button>
              ))}
              <Button 
                disabled={(this.currentPage === this.state.paginationPagesQuantity - 1) ? true : false} 
                onClick={this.nextPage}
              >
                Вперед
              </Button>
            </ButtonGroup>
          </center>
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
}))(Statistic);

useStylesForm.propTypes = {
  match: PropTypes.object,
};

export default (useStylesForm);