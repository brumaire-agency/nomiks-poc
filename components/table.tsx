'use client'

import { Button } from "@/components";
import { RoundDetailType } from "@/types";

export interface TableProps {
  disabled?: boolean;
  rows: RoundDetailType[];
  roundPublic: RoundDetailType|null;
  onClickAdd: () => void;
  onClickEdit: (id: number) => void;
  onClickEditPublic: () => void;
}

export const Table = ({ disabled, rows, roundPublic, onClickAdd, onClickEdit, onClickEditPublic }: TableProps) => {
  return (
    <table className={`w-full text-sm text-left rtl:text-right text-gray-500 ${disabled && 'pointer-events-none opacity-40'}`}>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-6 py-3">Rounds</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Token amount</th>
          <th className="px-6 py-3">Discount</th>
          <th className="px-6 py-3">Founds collected ($)</th>
        </tr>
      </thead>
      <tbody>
        {/* Rows - Round */}
        {rows.map((round, index) => (
          <tr key={index} className="bg-white border-b">
            <td className="px-6 py-4">
              {round.roundName}
              <Button 
                size="small"
                className="ml-3"
                onClick={() => onClickEdit(index)}
                data-cy="button-edit-round"
              >Edit</Button>
            </td>
            <td className="px-6 py-4">{round.roundPrice}</td>
            <td className="px-6 py-4">{round.roundTokenAmount}</td>
            <td className="px-6 py-4">{round.roundDiscount && (round.roundDiscount * 100).toFixed(0)}%</td>
            <td className="px-6 py-4">{round.roundCollectedFound}</td>
          </tr>
        ))}

        {/* Button - Add a round */}
        <tr className="bg-white border-b">
          <td className="px-6 py-4">
            <Button 
              variant="secondary"
              size="small"
              onClick={() => onClickAdd()}
              data-cy="button-add-round"
            >Add a round</Button>
          </td>
        </tr>

        {/* Row - Public */}
        {roundPublic && (
          <tr className="bg-white border-b">
            <td className="px-6 py-4">
              {roundPublic.roundName}
              <Button 
                size="small"
                className="ml-3"
                data-cy="button-edit-round-public"
                onClick={() => onClickEditPublic()}
              >Edit</Button>
            </td>
            <td className="px-6 py-4">{roundPublic.roundPrice}</td>
            <td className="px-6 py-4">{roundPublic.roundTokenAmount}</td>
            <td className="px-6 py-4">{roundPublic.roundDiscount || '-'}</td>
            <td className="px-6 py-4">{roundPublic.roundCollectedFound}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}