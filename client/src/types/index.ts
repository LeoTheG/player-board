export enum WidgetTypes {
  time = "time",
  joke = "joke",
  leaderboard = "leaderboard",
  celebrity = "celebrity",
<<<<<<< HEAD
  texttospeech = "text-to-speech",
=======
  balances = "balances",
  bear_faucet = "bear_faucet",
  bear_transfer = "bear_transfer",
  //   audio_player = "audio_player",
>>>>>>> 2d4f412e0e2144a4c058741dce6f09bfc0a909f4
}

export const ItemTypes = {
  BOX: "BOX",
  TRACK: "TRACK",
  WIDGET: "WIDGET",
};

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
}

export enum ACTIONS {
  dragAndDropFile = "drag and drop file",
  selectFromFolder = "select from folder",
  //   selectFromLibrary = "select from library",
}
