import React, { useEffect, useState } from "react";
import "./sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import Avatar from "@material-ui/core/Avatar";
import MicIcon from "@material-ui/icons/Mic";
import HeadSetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter the Channel Name");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Welcome to chatRoom,</h3>
        <br></br>
        <h1>{user.displayName}</h1>

        {/* <ExpandMoreIcon /> */}
      </div>

      <div className="sidebar__channels scrollbar" id="style-2">
        <div className="force-overflow">
          <div className="sidebar__channelsHeader">
            <div className="sidebar__header">
              {/* <ExpandMoreIcon /> */}
              <h4>Text Channels</h4>
            </div>
            <AddIcon
              className="sidebar__addChannel"
              onClick={handleAddChannel}
              alt={"add new channel"}
            />
          </div>

          <div className="sidebar__channelsList">
            {channels.map(({ id, channel }) => (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcons"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          variant="rounded"
          // className={classes.rounded}
        />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 7)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadSetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
