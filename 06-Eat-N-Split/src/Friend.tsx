import type {FriendListTypes} from "./App";
import {Button} from "./Button";

export function Friend({
  currentFriend,
  selectedFriend,
  onSelect,
}: {
  currentFriend: FriendListTypes;
  selectedFriend: FriendListTypes | null;
  onSelect: (friend: FriendListTypes) => void;
}) {
  function handleClick() {
    onSelect(currentFriend);
  }
  return (
    <li className={selectedFriend?.id === currentFriend.id ? " selected" : ""}>
      <img src={currentFriend.image} alt={currentFriend.name} />
      <div>
        <h3>{currentFriend.name}</h3>
        {currentFriend.balance > 0 ? (
          <p className="green">
            {currentFriend.name} owes you {Math.abs(currentFriend.balance)}
          </p>
        ) : currentFriend.balance < 0 ? (
          <p className="red">
            You owe {currentFriend.name} {Math.abs(currentFriend.balance)}
          </p>
        ) : (
          <p>You and {currentFriend.name} are even</p>
        )}
      </div>
      <Button handleClick={handleClick}>
        {selectedFriend?.id === currentFriend.id ? "Close" : "Select"}
      </Button>
    </li>
  );
}
