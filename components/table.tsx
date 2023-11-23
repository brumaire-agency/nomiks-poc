'use client'

import { Button, OptionProps, Select } from "@/components";
import { AssetType, RoundDetailType } from "@/types";
import { useEffect } from "react";

export interface TableProps {
  assets: AssetType[];
  disabled?: boolean;
  rounds: RoundDetailType[];
  roundPublic: RoundDetailType|null;
  onClickAdd: () => void;
  onClickEdit: (id: number) => void;
  onClickEditPublic: () => void;
  onCurrencyChange: (idRound: number, idCurrency: number, currencyValue: string, shareValue: number) => void;
  onCurrencyAdd: (idRound: number) => void;
  onCurrencyPublicChange: (idCurrency: number, currencyValue: string, shareValue: number) => void;
  onCurrencyPublicAdd: () => void;
}

export const Table = ({ assets, disabled, rounds, roundPublic, onClickAdd, onClickEdit, onClickEditPublic, onCurrencyChange, onCurrencyAdd, onCurrencyPublicChange, onCurrencyPublicAdd }: TableProps) => {
  const optionsPercent: OptionProps[] = [
    { value: 0, label: '0%' },
    { value: 0.05, label: '5%' },
    { value: 0.1, label: '10%' },
    { value: 0.15, label: '15%' },
    { value: 0.2, label: '20%' },
    { value: 0.25, label: '25%' },
    { value: 0.3, label: '30%' },
    { value: 0.35, label: '35%' },
    { value: 0.4, label: '40%' },
    { value: 0.45, label: '45%' },
    { value: 0.5, label: '50%' },
    { value: 0.55, label: '55%' },
    { value: 0.6, label: '60%' },
    { value: 0.65, label: '65%' },
    { value: 0.7, label: '70%' },
    { value: 0.75, label: '75%' },
    { value: 0.8, label: '80%' },
    { value: 0.85, label: '85%' },
    { value: 0.9, label: '90%' },
    { value: 0.95, label: '95%' },
    { value: 1, label: '100%' }
  ];

  const optionsAsset: OptionProps[] = assets.map(asset => {
    return { value: asset.code, label: asset.label }
  });

  return (
    <table className={`w-full text-sm text-left rtl:text-right text-gray-500 ${disabled && 'pointer-events-none opacity-40'}`}>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-6 py-3">Rounds</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Token amount</th>
          <th className="px-6 py-3">Discount</th>
          <th className="px-6 py-3">Founds collected ($)</th>
          <th className="px-6 py-3">Currencies</th>
        </tr>
      </thead>
      <tbody>
        {/* Rows - Round */}
        {rounds.map((round, idRound) => (
          <tr key={idRound} className="bg-white border-b">
            <td className="px-6 py-4">
              {round.roundName}
              <Button 
                size="small"
                className="ml-3"
                onClick={() => onClickEdit(idRound)}
                data-cy={`table-button-edit-round-${idRound}`}
              >Edit</Button>
            </td>
            <td className="px-6 py-4">{round.roundPrice}</td>
            <td className="px-6 py-4">{round.roundTokenAmount}</td>
            <td className="px-6 py-4">{round.roundDiscount && (round.roundDiscount * 100).toFixed(0)}%</td>
            <td className="px-6 py-4">{round.roundCollectedFound}</td>
            <td className="px-6 py-4">
              {round.currencies.map((currency, idCurrency) => (
                <div className="flex gap-1" key={idCurrency}>
                  <Select 
                    options={optionsAsset}
                    selectedValue={currency.currency}
                    onChange={(event) => onCurrencyChange(idRound, idCurrency, event.target.value, currency.share)}
                    data-cy={`table-select-asset-round-${idRound}-currency-${idCurrency}`}
                  />
                  <Select
                    options={optionsPercent}
                    selectedValue={currency.share}
                    onChange={(event) => onCurrencyChange(idRound, idCurrency, currency.currency, Number(event.target.value))}
                    data-cy={`table-select-share-round-${idRound}-currency-${idCurrency}`}
                  />
                </div>
              ))}
              {round.currencies.length < 3 && <Button variant="secondary" size="small" onClick={() => onCurrencyAdd(idRound)} data-cy={`table-button-add-currency-round-${idRound}`}>Add</Button>}
            </td>
          </tr>
        ))}

        {/* Button - Add a round */}
        <tr className="bg-white border-b">
          <td className="px-6 py-4">
            <Button 
              variant="secondary"
              size="small"
              onClick={() => onClickAdd()}
              data-cy="table-button-add-round"
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
                data-cy="table-button-edit-public"
                onClick={() => onClickEditPublic()}
              >Edit</Button>
            </td>
            <td className="px-6 py-4">{roundPublic.roundPrice}</td>
            <td className="px-6 py-4">{roundPublic.roundTokenAmount}</td>
            <td className="px-6 py-4">{roundPublic.roundDiscount || '-'}</td>
            <td className="px-6 py-4">{roundPublic.roundCollectedFound}</td>
            <td className="px-6 py-4">
              {roundPublic.currencies.map((currency, idCurrency) => (
                <div className="flex gap-1" key={idCurrency}>
                  <Select 
                    options={optionsAsset}
                    selectedValue={currency.currency}
                    onChange={(event) => onCurrencyPublicChange(idCurrency, event.target.value, currency.share)}
                    data-cy={`table-select-asset-public-currency-${idCurrency}`}
                  />
                  <Select 
                    options={optionsPercent}
                    selectedValue={currency.share}
                    onChange={(event) => onCurrencyPublicChange(idCurrency, currency.currency, Number(event.target.value))}
                    data-cy={`table-select-share-public-currency-${idCurrency}`}
                  />
                </div>
              ))}
              {roundPublic.currencies.length < 3 && <Button variant="secondary" size="small" onClick={() => onCurrencyPublicAdd()} data-cy={`table-button-add-currency-public`}>Add</Button>}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}