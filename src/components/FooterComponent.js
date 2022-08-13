import React from 'react';

function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-7 col-sm-5">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone fa-lg"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax fa-lg"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-4 align-self-end">
            <div className="text-center">
              <a className="btn btn-social-icon btn-google mr-2" href="http://google.com/+">
                <i className="fa fa-google-plus"></i>
              </a>
              <a className="btn btn-social-icon btn-facebook mr-2" href="http://www.facebook.com/profile.php?id=">
                <i className="fa fa-facebook"></i>
              </a>
              <a className="btn btn-social-icon btn-linkedin mr-2 " href="http://www.linkedin.com/in/">
                <i className="fa fa-linkedin"></i>
              </a>
              <a className="btn btn-social-icon btn-twitter mr-2 " href="http://twitter.com/">
                <i className="fa fa-twitter"></i>
              </a>
              <a className="btn btn-social-icon btn-google mr-2" href="http://youtube.com/">
                <i className="fa fa-youtube"></i>
              </a>
              <a className="btn btn-social-icon" href="mailto:">
                <i className="fa fa-envelope-o"></i>
              </a>
            </div>
            <div className="col-auto mt-2">
              <p>© Copyright 2018 Ristorante Con Fusion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
