'use client'

import { useState } from "react";
import { Button, Input, MessageError } from "@/components";
import type { RoundDetailType, RoundType } from "@/types"

export interface ModalProps {
  title: string;
  isPublic?: boolean;
  round?: RoundDetailType|null;
  roundsLength: number;
  onClose: () => void;
  onSave: (round: RoundType) => void;
  onDelete?: () => void;
}
  
export const Modal = ({ title, isPublic, round, roundsLength, onClose, onSave, onDelete }: ModalProps) => {
  // State
  const [roundName, setRoundName] = useState<string|undefined>(round ? round.roundName : `Round ${roundsLength + 1}`);
  const [roundSupplyShare, setRoundSupplyShare] = useState<number|undefined>(round?.roundSupplyShare);
  const [roundPrice, setRoundPrice] = useState<number|undefined>(round?.roundPrice);
  const [error, setError] = useState<string>('');

  // Functions
  const handleSave = () => {
    if (roundName && roundSupplyShare && roundPrice) {
      onSave({ roundPrice, roundName, roundSupplyShare });
    } else {
      setError('All fields must be completed');
    }
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center bg-gray-500/80">
      <div className="relative w-full max-w-xl max-h-full bg-white rounded-lg shadow">
        <div className="flex flex-col gap-3 p-6">
          <div className="flex justify-between">
            <h2 className="text-xl">{title}</h2>
            {!isPublic && !!round && onDelete && (
              <Button 
                variant="secondary"
                size="small"
                onClick={() => onDelete()}
                data-cy="modal-button-delete"
              >Delete round</Button>
            )}
          </div>

          {/* Message Error */}
          {error && <MessageError>{error}</MessageError>}

          {/* Name */}
          <Input
            label="Round name"
            placeholder="Round name"
            value={roundName}
            onChange={(event) => setRoundName(event.target.value)}
            disabled={isPublic}
            data-cy="modal-input-round-name"
          />
          {/* Total supply */}
          <Input
            label="Total supply %"
            placeholder="0"
            type="number"
            value={roundSupplyShare && roundSupplyShare * 100}
            suffixText="%"
            onChange={(event) => setRoundSupplyShare(Number(event.target.value)/100)}
            data-cy="modal-input-round-supply-share"
          />
          {/* Price */}
          <Input
            label="Price"
            placeholder="0"
            type="number"
            value={roundPrice}
            onChange={(event) => setRoundPrice(Number(event.target.value))}
            data-cy="modal-input-round-price"
          />
          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              variant="secondary"
              onClick={() => onClose()}
              data-cy="modal-button-close"
            >Cancel</Button>
            <Button 
              onClick={() => handleSave()}
              data-cy="modal-button-save"
            >Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}