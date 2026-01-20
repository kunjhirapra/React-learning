import {useState} from "react";
import type {FriendListTypes} from "./App";
import {Button} from "./Button";
import {Friend} from "./Friend";
import {AddFriendForm} from "./AddFriendForm";

export function FriendList({
  friends,
  setFriends,
  onSelection,
  selectedFriend,
}: {
  friends: FriendListTypes[];
  onSelection: (friend: FriendListTypes) => void;
  setFriends: (friend: FriendListTypes) => void;
  selectedFriend: FriendListTypes | null;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  function handleShowAddFriend() {
    setIsActive(!isActive);
  }

  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            currentFriend={friend}
            selectedFriend={selectedFriend}
            onSelect={onSelection}
          />
        ))}
      </ul>
      {isActive && !selectedFriend && (
        <AddFriendForm onAddFriend={setFriends} setActive={setIsActive} />
      )}
      <Button handleClick={handleShowAddFriend}>
        {isActive && !selectedFriend ? "Close" : "Add Friend"}
      </Button>
    </div>
  );
}
