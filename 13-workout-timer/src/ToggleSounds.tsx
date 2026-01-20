import {memo} from "react";

function ToggleSounds({
  allowSound,
  setAllowSound,
}: {
  allowSound: boolean;
  setAllowSound: (allow: boolean) => void;
}) {
  return (
    <button className="btn-sound" onClick={() => setAllowSound(!allowSound)}>
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);
