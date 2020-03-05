import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import mobail from './static/img/mobile.png';
import artImg from './static/img/Group 13.png';
import artSec from './static/img/Group 15.png';
import artPC from './static/img/Group 14.png';
import macbook from './static/img/macbook.png';
import basic from './static/img/undraw_online_test_gba7 1.png';
import standart from './static/img/undraw_file_sync_ot38 1.png';
import unlimited from './static/img/undraw_quiz_nlyh 1.png';

class Main extends React.Component {
  hendlerClick = () => {
    this.props.history.push('/statistic/0');
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="header__content">
            <div className="header__content_title">
              <span>Brainstorming</span>
              {' '}
              for
              <br />
              {' '}
              desired perfect Usability
            </div>
            <div className="header-content_citat">Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!</div>
            <div>
              <button
                className="header__content_button"
                onClick={this.hendlerClick}
                type="button"
              >
                View Stats
              </button>
            </div>
          </div>
          <div><img src={mobail} alt="mobail" className="header__iphone" /></div>
        </div>
        <div className="blok1">
          <p className="blok1_area1">
            Why
            {' '}
            <b>small business owners</b>
            <br />
            <b>love</b>
            {' '}
AppCo?
          </p>
          <p className="blok1_area2">
            Our design projects are fresh and simple and will benefit your business
            <br />
            {' '}
greatly. Learn more about our work!
          </p>
        </div>
        <div className="container">
          <div className="box__container">
            <img src={artImg} alt="art" className="box__container_img" />
            <div className="box__container_card-name">
              Clean Design
            </div>
            <div className="box__container_text">
              Increase sales by showing true dynamics of your website.
            </div>
          </div>
          <div className="box__container">
            <img src={artSec} alt="art" className="box__container_img" />
            <div className="box__container_card-name">
              Secure Data
            </div>
            <div className="box__container_text">
              Build your online store’s trust using Social Proof & Urgency.
            </div>
          </div>
          <div className="box__container">
            <img src={artPC} alt="art" className="box__container_img" />
            <div className="box__container_card-name">
              Retina Ready
            </div>
            <div className="box__container_text">
              Realize importance of social proof in customer’s purchase decision.
            </div>
          </div>
        </div>
        <div>
          <div className="block2">
            <div>
              <p className="block2_text1">
                Start Managing your apps
                {' '}
                <br />
                {' '}
business, more faster
              </p>
              <p className="block2_text2">
                Objectively deliver professional value with diverse web-readiness.
                Collaboratively transition wireless customer
                service without goal-oriented catalysts for change.
                Collaboratively.
              </p>
              <button className="block2_button" type="button">
                Learn more
              </button>
            </div>
            <div>
              <img src={macbook} alt="macBook" className="block2_macBook" />
            </div>
          </div>
        </div>
        <div className="block3">
          <div className="block3__content">
            <p className="block3__content_text1">
              <b>Afforadble Pricing and Packages</b>
              <br />
              choose your best one
            </p>
            <p className="block3__content_text2">
              Monotonectally grow strategic process improvements vis-a-vis integrated resources.
            </p>
          </div>
          <div>
            <div className="box__conteiner">
              <div className="box__conteiner_block">
                <p>
                  Basic
                </p>
                <img src={basic} alt="Basic" />
                <div className="box__conteiner_price">
                    $29
                </div>
                <hr />
                <div className="box__conteiner_text">
                  Push Notifications
                  Data Transfer
                  SQL Database
                  Search & SEO Analytics
                  24/7 Phone Support
                  2 months technical support
                  2+ profitable keyword
                </div>
                <button type="button">
                  Purchase now
                </button>
              </div>
              <div className="box__conteiner_block">
                <p>
                  Standard
                </p>
                <img src={standart} alt="Standart" />
                <div className="box__conteiner_price price_blue">
                  $149
                </div>
                <hr />
                <div className="box__conteiner_text">
                  Push Notifications
                  Data Transfer
                  SQL Database
                  Search & SEO Analytics
                  24/7 Phone Support
                  2 months technical support
                  2+ profitable keyword
                </div>
                <button type="button">
                  Purchase now
                </button>
              </div>
              <div className="box__conteiner_block">
                <p>
                  Unlimited
                </p>
                <img src={unlimited} alt="Unlimited" />
                <div className="box__conteiner_price">
                  $39
                </div>
                <hr />
                <div className="box__conteiner_text">
                  Push Notifications
                  Data Transfer
                  SQL Database
                  Search & SEO Analytics
                  24/7 Phone Support
                  2 months technical support
                  2+ profitable keyword
                </div>
                <button type="button">
                  Purchase now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="block4">
          <div className="block4__content">
            <p className="block4__content_formContact">
              If you need custom services or Need more?
              {' '}
              <b>Contact us</b>
            </p>
            <form>
              <input placeholder="Enter your email" />
              <button type="button">
                Subscribe
              </button>
            </form>
          </div>
          <div className="block4__footer">
            <p>
              AppCo
            </p>
            <p>
              All rights reserved by ThemeTags
            </p>
            <p>
              Copyrights © 2019.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Main);
