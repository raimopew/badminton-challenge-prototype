import React from "react";
import { Link } from "react-router-dom";
import { Table, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import PropTypes from "prop-types";

const RankingTable = ({ data, loading, type, displayJoinLeaveButton }) => {
  const user = useSelector((state) => state.auth.user);
  const onList = user && data.some((e) => e.user._id === user._id);
  const history = useHistory();
  const typeToGender = { ms: "m", ws: "f" };

  const redirectToChallenge = (id) => history.push(`/challenges/create/${id}`);

  const columns = [
    {
      title: "#",
      width: "5%",
      render: (...args) => args[2] + 1,
    },
    {
      title: "Nimi",
      dataIndex: "user",
      width: "40%",
      render: (row) => {
        return (
          <Link to={`/challenges/history/${row._id}`}>
            {row.firstName} {row.lastName}
          </Link>
        );
      },
    },
    {
      title: "Võite",
      align: "right",
      dataIndex: "wins",
      responsive: ["md"],
    },
    {
      title: "Kaotuseid",
      dataIndex: "losses",
      align: "right",
      responsive: ["md"],
    },
    {
      title: "Punkte",
      dataIndex: "points",
      align: "right",
      defaultSortOrder: "descend",
    },
    {
      title: "Väljakutse",
      width: "5%",
      align: "center",
      render: (row) => {
        return onList ? (
          user && row.user._id !== user._id ? (
            <Tooltip title="Esita väljakutse">
              <button onClick={() => redirectToChallenge(row._id)}>
                <PlusCircleTwoTone twoToneColor="#52c41a" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Iseendale ei saa väljakutset esitada">
              <StopTwoTone twoToneColor="red" />
            </Tooltip>
          )
        ) : (
          <Tooltip title="Vaja olla liitunud edetabeliga, et väljakutse esitada">
            <StopTwoTone twoToneColor="red" />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      {user && user.gender === typeToGender[type]
        ? onList
          ? displayJoinLeaveButton("leave")
          : displayJoinLeaveButton("join")
        : null}
      <Table
        loading={loading}
        pagination={false}
        locale={{ emptyText: "Osalejad puuduvad" }}
        columns={columns}
        rowKey="_id"
        dataSource={data}
      />
    </>
  );
};

RankingTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  displayJoinLeaveButton: PropTypes.func.isRequired
};

export default RankingTable;
