import React from 'react';
import mobail from './mobile.png';
import artImg from './Group 13.png';
import artSec from './Group 15.png';
import artPC from './Group 14.png';
import macbook from './macbook.png';
import wawe2 from './Rectangle 51.png';
import basic from './undraw_online_test_gba7 1.png'
import standart from './undraw_file_sync_ot38 1.png'
import unlimited from './undraw_quiz_nlyh 1.png'
import wawe3 from './Rectangle 54.png'

export default class Main extends React.Component {

  hendlerClick = async () => {
    this.props.history.push('/statistic/page');
  }

  render () {
    return (
      <div className="first">
        <div className="header">
          <p className="textToHeader">
            <span>Brainstorming</span> for<br/> desired perfect Usability
          </p>
          <p className="textToHeaderCitat">
            Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!
          </p>
          <button className='buttonToHeader' onClick={this.hendlerClick}>
            <span className="textForButton">View Stats</span>
          </button>
          <div className="iphone">
            <img src={mobail} alt="mobail" />
          </div>
        </div> 
        <div>
          <p className="textArea1">
            Why <b>small business owners</b><br/>
            <b>love</b> AppCo?
          </p>
          <p className="textArea2">
            Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!
          </p>
        </div>  
        <div>
          <div className="box1">
            <img src={artImg} alt="art" className="imgBox"/>
            <div className="cardName">
              Clean Design
            </div>
            <div className="cardText">
              Increase sales by showing true dynamics of your website.
            </div>
          </div>
          <div className="box2">
            <img src={artSec} alt="art" className="imgBox"/>
            <div className="cardName">
              Secure Data
            </div>
            <div className="cardText">
              Build your online store’s trust using Social Proof & Urgency.
            </div>
          </div>
          <div className="box3">
            <img src={artPC} alt="art" className="imgBox"/>
            <div className="cardName">
              Retina Ready
            </div>
            <div className="cardText">
              Realize importance of social proof in customer’s purchase decision.
            </div>
          </div>
        </div> 
        <div className="block2a">
          <div className="block2">
            <p className="block2_text1">
              Start Managing your apps business, more faster
            </p>
            <p className="block2_text2">
              Objectively deliver professional value with diverse web-readiness. Collaboratively transition wireless customer service without goal-oriented catalysts for change. Collaboratively.
            </p>
            <button className="block2_button">
              <span>Learn more</span>
            </button>
            <img src={macbook} alt="macBook" className="macBook" />
          </div> 
        </div>  
        <div className="block3">
          <div className="wawe2">
            <img src={wawe2} alt="wawe"  />
          </div>
          <div>
            <img src={wawe3} alt="wawe3" className="wawe3" />
          </div>
          <p className="block3_text1">
            <b>Afforadble Pricing and Packages</b><br />
            choose your best one
          </p>
          <p className="block3_text2">
            Monotonectally grow strategic process improvements vis-a-vis integrated resources.
          </p>
          <div className="blockPanel">
            <div className="block_1">
              <p>
                Basic
              </p>
              <img src={basic} alt="Basic" />
              <div className="price">
                $29
              </div>
              <hr />
              <div className="text">
                Push Notifications
                Data Transfer
                SQL Database
                Search & SEO Analytics
                24/7 Phone Support
                2 months technical support
                2+ profitable keyword
              </div>
              <button>
                Purchase now
              </button>
            </div>
            <div className="block_2">
              <p>
                Standard
              </p>
              <img src={standart} alt="Standart" />
              <div className="price">
                $149
              </div>
              <hr />
              <div className="text">
                Push Notifications
                Data Transfer
                SQL Database
                Search & SEO Analytics
                24/7 Phone Support
                2 months technical support
                2+ profitable keyword
              </div>
              <button>
                Purchase now
              </button>
            </div>
            <div className="block_3">
              <p>
                Unlimited
              </p>
              <img src={unlimited} alt="Unlimited" />
              <div className="price">
                $39
              </div>
              <hr />
              <div className="text">
                Push Notifications
                Data Transfer
                SQL Database
                Search & SEO Analytics
                24/7 Phone Support
                2 months technical support
                2+ profitable keyword
              </div>
              <button>
                Purchase now
              </button>
            </div> 
          </div>   
          <div>
            <p className="formContact">
              If you need custom services or Need more? <b>Contact us</b>
            </p>
            <form>
              <input value="Enter your email"/>
              <button className="buttonForm">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <p className="footerText1">
              AppCo
            </p>
            <p className="footerText2">
              All rights reserved by ThemeTags
            </p>
            <p className="footerText3">
              Copyrights © 2019. 
            </p>

          </div>
        </div>

      </div>
    )
  }
}