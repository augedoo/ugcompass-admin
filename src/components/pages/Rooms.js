import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/LeftSidebar';
import Navbar from '../layout/MainNavbar';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions/rooms';

const Rooms = ({ fetchRooms, rooms }) => {
  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Navbar />

      <div className='admin-wrapper'>
        <Sidebar />

        <div className='admin-content'>
          <div className='top-section'>
            <div className='search section'>
              <form>
                <input
                  type='text'
                  name='search-term'
                  className='search-input'
                  placeholder='search...'
                />
              </form>
            </div>
            &nbsp;
            <Link to='/rooms/new' className='btn'>
              Add Room
            </Link>
          </div>
          <br />
          <div className='main-section'>
            {rooms &&
              rooms.map((room) => (
                <div key={room._id} className='admin-btn'>
                  <p>
                    {room.name} |{' '}
                    <span className='user-role'>{room.category}</span>
                  </p>
                  <div className='controls'>
                    <Link to='/rooms/edit'>
                      <i className='fas fa-edit'></i>
                    </Link>
                    <Link to='/rooms/delete'>
                      <i className='fas fa-trash-alt'></i>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.rooms,
  };
};

export default connect(mapStateToProps, { fetchRooms })(Rooms);
