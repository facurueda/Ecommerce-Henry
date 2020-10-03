import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import "./Users.css";
import { actionGetUsers, actionSetAdminUser, actionSetUser, actionDeleteUser } from "../../redux/usersActions";

const Users = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetUsers());
  }, []);

  const setAdmin = user => {
    dispatch(actionSetAdminUser(user))
    window.location.reload()
  }
  const setUser = user => {
    dispatch(actionSetUser(user))
    window.location.reload()
  }
  const deleteUser = user => {
    dispatch(actionDeleteUser(user))
  }

  return (
    <Table className="categoryTable">
      <thead>
        <tr className="NameAndDesc">
          <th className="Name">Nombre</th>
          <th className="Desc">Email</th>
          <th className="Desc">Level</th>
          <th className="buttons" />
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map((user) =>
            user.level != "GUEST" ? (
              <tr className="categories" key={user.idUser}>
                <th className="categoryInfo">{user.name}</th>
                <th className="categoryInfo">{user.email}</th>
                <th className="categoryInfo">{user.level}</th>
                <th className="buttonContainer">
                        <button
                        type="button"
                        className="buttonEdit"
                        onClick={() => setAdmin(user)}
                      >
                        ToAdmin
                      </button>{" "}
                      <button
                        type="button"
                        className="buttonEdit"
                        onClick={() => setUser(user)}
                      >
                        ToUser
                      </button>
                      <button
                        type="button"
                        className="buttonEdit"
                        onClick={() => deleteUser(user)}
                      >
                        Delete
                      </button>
                </th>
              </tr>
            ) : (
              null
            )
          )
        ) : (
          <tr>
            <td>No Users</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionGetUsers: () => {
      dispatch(actionGetUsers());
    },
    actionSetAdminUser: (user) => {
      dispatch(actionSetAdminUser(user))
    },
    actionSetUser: (user) => {
      dispatch(actionSetUser(user))
    },
    actionDeleteUser: (user) => {
      dispatch(actionDeleteUser(user))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
