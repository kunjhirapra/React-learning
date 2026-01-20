import {FriendList} from "./FriendList";
import {FormSplitBill} from "./FormSplitBill";
import {useState} from "react";

export interface FriendListTypes {
  id: string;
  name: string;
  image: string;
  balance: number;
}

const initialFriends: FriendListTypes[] = [
  {
    id: "118836",
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: "933372",
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: "499476",
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<FriendListTypes | null>(
    null
  );

  function handleSelection(friend: FriendListTypes) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }
  function handleAddFriend(friend: FriendListTypes) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleSplitBill(value: number) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? {...friend, balance: friend.balance + value}
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <FriendList
        friends={friends}
        onSelection={handleSelection}
        setFriends={handleAddFriend}
        selectedFriend={selectedFriend}
      />
      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
export default App;
