import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/MainNavbar';
import Sidebar from '../layout/LeftSidebar';
import PageLoading from '../layout/PageLoading';
import Statistics from '../layout/Statistics';
import { loadUser } from '../../actions/auth';
import { fetchUsers } from '../../actions/users';
import { fetchRooms } from '../../actions/rooms';
import { fetchFacilities, fetchTopFacilities } from '../../actions/facilities';
import TopFacilities from '../facilities/TopFacilities';

export const Dashboard = (props) => {
  const {
    loadUser,
    currentUser,
    authloading,
    fetchRooms,
    fetchUsers,
    fetchFacilities,
    fetchTopFacilities,
    usersLoading,
    topFacilities,
    facilitiesLoading,
    roomsLoading,
    users,
    numberOfUsers,
    numberOfRooms,
    numberOfFacilities,
  } = props;

  useEffect(() => {
    if (!currentUser) loadUser();
    fetchRooms();
    fetchFacilities();
    fetchTopFacilities();
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {currentUser !== null && !authloading ? (
        <div>
          <Navbar />

          <main className='admin-wrapper'>
            <Sidebar />
            <div className='admin-content'>
              <Statistics
                currentUser={currentUser}
                facilitiesLoading={facilitiesLoading}
                roomsLoading={roomsLoading}
                usersLoading={usersLoading}
                numberOfFacilities={numberOfFacilities}
                numberOfUsers={numberOfUsers}
                numberOfRooms={numberOfRooms}
                users={users}
              />

              <TopFacilities
                topFacilities={topFacilities}
                facilitiesLoading={facilitiesLoading}
              />
            </div>
          </main>
        </div>
      ) : (
        <PageLoading />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: { authLoading, currentUser, isAuthenticated },
    facilities: { facilities, topFacilities, facilitiesLoading },
    rooms: { rooms, roomsLoading },
    users: { users, usersLoading },
  } = state;

  return {
    currentUser,
    authLoading,
    users,
    rooms,
    facilities,
    topFacilities,
    isAuthenticated,
    numberOfFacilities: facilities !== null ? facilities.length : 0,
    numberOfRooms: rooms !== null ? rooms.length : 0,
    numberOfUsers: users !== null ? users.length : 0,
    facilitiesLoading,
    roomsLoading,
    usersLoading,
  };
};

const mapDispatchToProps = {
  loadUser,
  fetchUsers,
  fetchFacilities,
  fetchTopFacilities,
  fetchRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
