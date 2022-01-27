import * as React from 'react';
import { useState } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { Stack, IStackTokens } from '@fluentui/react';
import axios from 'axios';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
const img = require("../../img.png");

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  closeButtonAriaLabel: 'Close',
  //subText: 'Do you want to send this message without a subject?',
};

const stackTokens: IStackTokens = { childrenGap: 40 };


export interface GameState {
  // These are set based on the toggles shown above the examples (not needed in real code)
  currentPlayer?: string;
  ImageId?: number;
  state: number; rounds: number;
  

  // checked?: boolean;
  // websocket?: WebSocket;
}
interface Props {
  currentPlayer: string;
  imageId: number;
  state: number;
  rounds: number;
  updateRounds(): void;
  }

  interface PropsWithToggle {
    currentPlayer: string;
    imageId: number;
    state: number;
    rounds: number;
    updateRounds(): void;
    toggleHideDialog(): void;
    }


export const ButtonDefaultExample: React.FunctionComponent<PropsWithToggle> = props => {
  const { currentPlayer, imageId } = props;
  
  function _alertClicked(_imageId:number): void {
    //send the image prop over 
    
    props.updateRounds()
    if(imageId===_imageId)
    {
      alert('You are Right!');
    }
    else{
      console.log("You are wrong!")
    }
    props.toggleHideDialog();
  }
  const allImages = [
    {
      number: 1,
      image: "1"
    },
    {
      number: 2,
      image: "2"
    },
    {
      number: 3,
      image: "3"
    },
    {
      number: 4,
      image: "4"
    },
    {
      number: 5,
      image: "5"
    },
    {
      number: 6,
      image: "6"
    },
    {
      number: 7,
      image: "7"
    },
    {
      number: 8,
      image: "8"
    },
    {
      number: 9,
      image: "9"
    },
    {
      number: 10,
      image: "10"
    },
    {
      number: 11,
      image: "11"
    },
    {
      number: 12,
      image: "12"
    },
  ]
  const [startIndex, setStart ] = useState();
  let num:number =imageId;
  if(imageId>=9)
  {
    num =0;
  }
  else
  {
    num = imageId;
  }
  let subset = allImages.slice(num, 4)
  
  
  return (
    <>
      {subset.map((item, index) => (
        <button key={index} >
          <img
            src={require('../../NaturePictures/' +
              item.image +
              '.png')}
            className="img-fluid"
            onClick={()=>_alertClicked(item.number)}
          />

        </button>
      ))}
    </>

  );
};
export const DialogBasicExample: React.FunctionComponent<Props> = props => {
  const { currentPlayer, imageId } = props;
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const [question, setQuestion] = useState("Default prompt: Guess the house!");
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    alert(`Fetch question ${question}`)
  }
  { console.log(imageId) }

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      isDarkOverlay: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],
  );

  return (
    <>
      <p style={{fontSize:"20px"}}>{"Turn: "+currentPlayer}</p>
      <PrimaryButton style ={{ zIndex: '999'}}secondaryText="click me to start the game!" onClick={toggleHideDialog} text="Start Game" />
      <label id={labelId} className={screenReaderOnly}>
       start
      </label>
      <label id={subTextId} className={screenReaderOnly}>
        startBtn
      </label>

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <ButtonDefaultExample currentPlayer={props.currentPlayer} imageId={props.imageId} state={props.state} rounds={props.rounds} updateRounds={props.updateRounds} toggleHideDialog={toggleHideDialog}/>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default DialogBasicExample;