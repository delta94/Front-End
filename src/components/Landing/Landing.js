import React from 'react';
import Auth from 'Auth';
import ArrowIcon from '@material-ui/icons/CompareArrows';
import DiaryIcon from '@material-ui/icons/QuestionAnswer';
import ScanIcon from '@material-ui/icons/CenterFocusStrong';
import SvgIcon from '@material-ui/core/SvgIcon';
import { team } from './teamData';

const LogoImg = () => <img src={require('../../assets/logo.png')} alt='logo' />;

const Landing = () => {
  return (
    <div className='landing'>
      {/* header */}
      <header className='header'>
        <div className='product-data'>
          <h1>
            Welcome to <br />
            RxID Pill Identifier
          </h1>
          <hr />
          <p>
            Identify your medications on their appearance and log each
            medication and your experience with them. Schedule your medications
            and get notifications minutes before due time with image and dosage
            amount to be taken.
          </p>
        </div>
        <div className='buttons'>
          <button
            className='login'
            onClick={event => {
              event.preventDefault();
              Auth.lock.show();
            }}
          >
            Login
          </button>
          <button
            onClick={event => {
              event.preventDefault();
              Auth.lock.show();
            }}
            className='join'
          >
            Join us
          </button>
        </div>
      </header>
      {/* core features */}
      <section className='core-features'>
        <div className='text-content'>
          <h1>
            Our Core
            <br />
            Features
          </h1>
          <p>Check out our amazing features</p>
        </div>
        <div className='tiles'>
          <div className='tiles-column'>
            <div className='scan-tile'>
              <ScanIcon className='scan-icon' />
              <p>Scan & Identify Pills</p>
            </div>
            <div className='tile'>
              <SvgIcon className='icon'>
                <path d='M4.22,11.29L11.29,4.22C13.64,1.88 17.43,1.88 19.78,4.22C22.12,6.56 22.12,10.36 19.78,12.71L12.71,19.78C10.36,22.12 6.56,22.12 4.22,19.78C1.88,17.43 1.88,13.64 4.22,11.29M5.64,12.71C4.59,13.75 4.24,15.24 4.6,16.57L10.59,10.59L14.83,14.83L18.36,11.29C19.93,9.73 19.93,7.2 18.36,5.64C16.8,4.07 14.27,4.07 12.71,5.64L5.64,12.71Z' />
              </SvgIcon>
              <p>Medication List</p>
            </div>
          </div>
          <div className='tiles-column'>
            <div className='tile'>
              <ArrowIcon className='icon' />
              <p>Schedule Pills</p>
            </div>
            <div className='tile'>
              <DiaryIcon className='icon' />
              <p>Medication Diary</p>
            </div>
          </div>
        </div>
      </section>
      {/* testimonials */}
      <section className='testimonials'>
        <div className='text-content'>
          <h1>Testimonials</h1>
          <p>What our users said about our product</p>
        </div>
        <div className='tiles'>
          <div className='tile'>
            <div className='logo'>
              <LogoImg />
            </div>
            <div className='top-text-content'>
              <h2>Samuel</h2>
              <p>Arthritis Patient</p>
            </div>
            <p className='quote-content'>
              "I always miss my dosage time because of my work shedules and
              using this system will make me stay up-to-date with my
              medications"
            </p>
          </div>
          <div className='tile'>
            <div className='logo'>
              <LogoImg />
            </div>
            <div className='top-text-content'>
              <h2>Lateef</h2>
              <p>Kidney Transplant Patient</p>
            </div>
            <p className='quote-content'>
              "I overdosed recently because I took the wrong pill so I will
              definitely use this app and talk about it with my doctors."
            </p>
          </div>
          <div className='tile'>
            <div className='logo'>
              <LogoImg />
            </div>
            <div className='top-text-content'>
              <h2>Rihanot</h2>
              <p>Registered Nurse</p>
            </div>
            <p className='quote-content'>
              "This is a great product and it will help my outpatients who are
              generally senior citizens easily identify their pills."
            </p>
          </div>
        </div>
      </section>
      {/* team */}
      <section className='team'>
        <h2>Our Team</h2>
        <p>Meet the amazing team</p>
        <div className='tiles'>
          {team.map(teamMate => (
            <div className='tile' key={team.indexOf(teamMate)}>
              <img src={teamMate.image} alt={teamMate.name} />
              <div>
                <h3>{teamMate.name}</h3>
                <p>{teamMate.role}</p>
              </div>
              <div className='links'>
                {teamMate.medium ? (
                  <a href={teamMate.medium} target='blank'>
                    <i class='fab fa-medium' />
                  </a>
                ) : null}
                <a href={teamMate.linkedIn} target='blank'>
                  <i class='fab fa-linkedin' />
                </a>
                <a href={teamMate.gitHub} target='blank'>
                  <i class='fab fa-github' />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* footer */}
    </div>
  );
};

export default Landing;
