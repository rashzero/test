import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import CircularIndeterminate from './CircularIndeterminate';


class Statistic extends React.Component {
  numberOfPage;

  state = {
    users: [],
    isLoading: false,
    cache: {},
    numberOfPage: '',
    quantityUsersOnPage: 50,
  };

  componentDidMount() {
    this.getUsersPage(this.currentPage);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.getUsersPage(this.currentPage);
    }
  }

  get currentPage() {
    const { params } = this.props.match;
    if (+params.page) {
      return +params.page;
    }
    return 0;
  }

  getUsers = async (page) => {
    const cacheCloned = { ...this.state.cache };
    const responseNumberOfPage = await fetch(`http://localhost:8080/api/users?page=${page}&quantity=${this.state.quantityUsersOnPage}`);
    const responseJsonNumberOfPage = await responseNumberOfPage.json();
    if (page in cacheCloned) {
      this.setState({
        users: [page],
      })
    } else {
      cacheCloned[page] = responseJsonNumberOfPage.chunkUsers;

      this.setState({
        users: responseJsonNumberOfPage.chunkUsers,
        cache: cacheCloned,
        numberOfPage: responseJsonNumberOfPage.numbOfPage,
      })

    }
    this.setState({
      users: responseJsonNumberOfPage.chunkUsers,
    })
  }

  getUsersPage = async (index) => {
    this.setState({
      isLoading: true,
    });
    const seriesArr = await this.getUsers(index);
    console.log(seriesArr);
    this.props.history.push(`/statistic/${index}`);
    this.numberOfPage = this.state.numberOfPage;
    this.setState({
      isLoading: false,
    });
  }

  nextPage = () => {
    this.getUsersPage(this.currentPage + 1);
  }

  backPage = () => {
    this.getUsersPage(this.currentPage - 1);
  }

  handlerLinkToUser = (id) => {
    this.props.history.push(`/user/${id}`)
  }


  
  render() {
    const { users } = this.state;

    if (this.state.isLoading) {
      return <CircularIndeterminate />;
    }

    console.log(this.state);
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
          <Typography  className="header_statistic_user_name"> 
            Users statistics 
          </Typography>
        </div>
        <div className="table">
          <table>
            <tr className="table_header">
              <td className="cell1">id</td>
              <td>First name</td>
              <td>Last name</td>
              <td>Email</td>
              <td>Gender</td>
              <td>IP adress</td>
              <td>Total clicks</td>
              <td className="cell2">Total page views</td>
            </tr>
            {users.map((user) => (
              <tr 
                className="table_row_data" 
                style={{ backgroundColor: (user.id % 2) ? '#FBFBFB' : '#F1F1F1' }}
                onClick={() => this.handlerLinkToUser(user.id)}
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
          </table>
        </div>
        <div className="pagination">
          <center>
            <ButtonGroup
              color="primary"
              aria-label="large outlined secondary button group"
              className="pagination_elem"
            >
              <Button  
                disabled={(this.currentPage <= 0) ? true : false} 
                onClick={this.backPage}
              >
                Назад
              </Button>
              {new Array(this.numberOfPage).fill(null).map((value, index) => (
                <Button
                  style={{ backgroundColor: (this.currentPage === index) ? '#3A80BA' : '' }}
                  value={index}
                  onClick={() => this.getUsersPage(index)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button 
                disabled={(this.currentPage === this.state.numberOfPage - 1) ? true : false} 
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

export default (useStylesForm);