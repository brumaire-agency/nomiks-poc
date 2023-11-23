'use client'

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Input, Table, Modal, Button, MessageError, RoundForm } from '@/components';
import type { AssetType, ProjectType, RoundDetailType } from '@/types';
import { getFoundingPublicRoundDetail, getFoundingRoundDetail, getFoundingRoundPublicDetailDefault, getMaxRoundPrice, sumCollectedFound, sumCurrencyShare, sumRoundSupplyShare, transformProjectData } from '@/utils';

export interface FormFoundingProps {
  assets: AssetType[];
  assetName: string;
  project?: ProjectType;
  projectExample?: ProjectType;
  totalSupply: number;
}
  
export const FormFounding = ({ assets, assetName, project, projectExample, totalSupply }: FormFoundingProps) => {
  // States - Content
  const [hardCap, setHardCap] = useState<number|undefined>(project?.hardCap);
  const [softCap, setSoftCap] = useState<number|undefined>(project?.softCap);
  const [ratioPv, setRatioPv] = useState<number|undefined>(project?.ratioPv);
  const [roundsDetails, setRoundsDetails] = useState<RoundDetailType[]>([]);
  const [roundPublicDetail, setRoundPublicDetail] = useState<RoundDetailType|null>(null);
  const [error, setError] = useState<string|null>(null);

  // Memo
  const defaultCurrencies = useMemo(() => [{ currency: assets[0].label, share: 0 }], [assets]);
  const totalCollectedFound = useMemo(() => {
    return roundPublicDetail ? sumCollectedFound(roundsDetails, roundPublicDetail) : 0
  }, [roundsDetails, roundPublicDetail]);
  const canEditTable = useMemo(() => !!hardCap && !!softCap && !!ratioPv, [hardCap, softCap, ratioPv]);
  const canSave = useMemo(() => !error && canEditTable, [error, canEditTable]);

  // States - Modal
  const [modalAddOpen, setModalAddOpen] = useState<boolean>(false);
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [modalEditPublicOpen, setModalEditPublicOpen] = useState<boolean>(false);
  const [roundIdToEdit, setRoundIdToEdit] = useState<number|null>(null);

  useEffect(() => {
    if (project) {
      setRoundsDetails(project.rounds.map(round => getFoundingRoundDetail(round, totalSupply, 0, defaultCurrencies)));
    }
  }, [project, totalSupply, defaultCurrencies])

  useEffect(() => {
    if (roundsDetails && roundPublicDetail) {
      setRoundsDetails(roundsDetails.map(round => getFoundingRoundDetail(round, totalSupply, roundPublicDetail.roundPrice, defaultCurrencies, round.currencies)));
    }
  }, [roundPublicDetail, totalSupply, defaultCurrencies])

  useEffect(() => {
    if (!!hardCap && !!softCap && !!ratioPv) {
      setRoundPublicDetail(getFoundingRoundPublicDetailDefault(hardCap, ratioPv, totalSupply, defaultCurrencies));
    }
  }, [hardCap, softCap, ratioPv, totalSupply])

  // Handle Error Message
  useEffect(() => {
    if (!!hardCap && !!softCap && (hardCap < softCap)) {
      setError('Hard cap must be higher than Soft cap');
    } else if(roundPublicDetail && sumRoundSupplyShare(roundsDetails, roundPublicDetail) > 1) {
      setError('The sum of rounds supply share must be lower than 100%');
    } else if (roundPublicDetail && getMaxRoundPrice(roundsDetails) > roundPublicDetail.roundPrice) {
      setError('The round price must be lower than public price');
    } else if (roundsDetails && roundPublicDetail && !sumCurrencyShare([...roundsDetails, roundPublicDetail]).every(currency => currency <= 1)) {
      setError('The sum of currencies in round must be lower than 100%');
    } else {
      setError(null);
    }
  }, [hardCap, softCap, roundsDetails, roundPublicDetail]);

  // Functions
  const handleAddRound = (newRound: RoundForm) => {
    if (roundPublicDetail) {
      // Add new Round
      const newRoundDetail = getFoundingRoundDetail(newRound, totalSupply, roundPublicDetail.roundPrice, defaultCurrencies);
      // Sort Rounds
      setRoundsDetails([...roundsDetails, newRoundDetail].sort((a, b) => a.roundPrice - b.roundPrice));
    }
    // Close modal
    setModalAddOpen(false);
  }
  const handleEditRound = (newRound: RoundForm, id: number|null) => {
    if (roundPublicDetail) {
      let newRounds = [...roundsDetails];
      // Edit Round
      if (id !== null) newRounds[id] = getFoundingRoundDetail(newRound, totalSupply, roundPublicDetail.roundPrice, defaultCurrencies, newRounds[id].currencies);
      // Sort Rounds
      setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
    }
    // Close modal
    setModalEditOpen(false);
  }
  const handleEditPublicRound = (newRound: RoundForm) => {
    // Edit Public Round
    setRoundPublicDetail(getFoundingPublicRoundDetail(newRound, totalSupply, defaultCurrencies, roundPublicDetail?.currencies));
    // Close modal
    setModalEditPublicOpen(false);
  }
  const handleDeleteRound = (id: number|null) => {
    let newRounds = [...roundsDetails];
    // Remove Round
    if (id !== null) newRounds.splice(id, 1);
    // Sort Rounds
    setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
    // Close modal
    setModalEditOpen(false);
  }

  const handleChangeCurrency = (idRound: number, idCurrency: number, currencyValue: string, shareValue: number) => {
    let newRounds = [...roundsDetails];
    // Edit Round
    newRounds[idRound] = {
      ...newRounds[idRound],
      currencies: newRounds[idRound].currencies.map((currency, id) => id === idCurrency ? { currency: currencyValue, share: shareValue } : currency)
    }
    // Sort Rounds
    setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
  }
  const handleChangeCurrencyPublic = (idCurrency: number, currencyValue: string, shareValue: number) => {
    if (roundPublicDetail) {
      const newCurrencies = roundPublicDetail.currencies.map((currency, id) => id === idCurrency ? { currency: currencyValue, share: shareValue } : currency);
      setRoundPublicDetail({
        ...roundPublicDetail,
        currencies: newCurrencies
      })
    }
  }
  const handeAddCurrency = (idRound: number) => {
    let newRounds = [...roundsDetails];
    // Edit Round
    newRounds[idRound] = {
      ...newRounds[idRound],
      currencies: [...newRounds[idRound].currencies, { currency: assets[0].label, share: 0 }],
    }
    // Sort Rounds
    setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
  }
  const handeAddCurrencyPublic = () => {
    if (roundPublicDetail) {
      setRoundPublicDetail({
        ...roundPublicDetail,
        currencies: [...roundPublicDetail.currencies, { currency: assets[0].label, share: 0 }]
      })
    }
  }


  const handleSave = () => {
    if (!!hardCap && !!softCap && !!ratioPv && !!roundPublicDetail && !!roundsDetails) {
    const projectData = async () => {
      const data = transformProjectData(hardCap, softCap, ratioPv, roundPublicDetail, roundsDetails);
      const response = await fetch("/api/project/create", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    projectData().then((data) => {
      alert(data.message);
    });
    } else {
      console.log('Error');
    }
  }

  const handleLoad = () => {
    if (projectExample) {
      setHardCap(projectExample.hardCap);
      setSoftCap(projectExample.softCap);
      setRatioPv(projectExample.ratioPv);
      setRoundsDetails(projectExample.rounds.map(round => getFoundingRoundDetail(round, totalSupply, projectExample.publicPrice, defaultCurrencies, round.currencies)))
    }
  }

  return (
    <div className='flex flex-col items-start gap-8'>
      <div className="w-full flex justify-between">
        <h2 className="text-xl">{assetName}</h2>
        <Button 
          variant="secondary"
          disabled={!projectExample}
          onClick={() => handleLoad()}
          data-cy="button-load"
        >
          Load
        </Button>
      </div>
      {error && <MessageError>{error}</MessageError>}
      <div className="flex gap-2">
        <Input
          label="Hard cap"
          type="number"
          value={hardCap}
          onChange={(event) => setHardCap(Number(event.target.value))}
          data-cy="input-hard-cap"
        />
        <Input
          label="Soft cap"
          type="number"
          value={softCap}
          onChange={(event) => setSoftCap(Number(event.target.value))}
          data-cy="input-soft-cap"
        />
        <Input
          label="Ratio Public/Private Sale"
          type="number"
          value={ratioPv}
          onChange={(event) => setRatioPv(Number(event.target.value))}
          data-cy="input-ratio-pv"
        />
        <Input
          label="Total collected found"
          type="number"
          value={totalCollectedFound}
          disabled
          data-cy="input-total-collected-found"
        />
        <Input
          label="Total Tokens amounts Sale (private/public)"
          type="number"
          value={totalSupply}
          disabled
          data-cy="input-total-supply"
        />
      </div>

      {/* Table - Founding */}
      <Table
        assets={assets}
        disabled={!canEditTable}
        rounds={roundsDetails}
        roundPublic={roundPublicDetail}
        onClickAdd={() => setModalAddOpen(true)}
        onClickEdit={(id: number) => {
          setRoundIdToEdit(id);
          setModalEditOpen(true);
        }}
        onClickEditPublic={() => setModalEditPublicOpen(true)}
        onCurrencyChange={(idRound, idCurrency, currencyValue, shareValue) => handleChangeCurrency(idRound, idCurrency, currencyValue, shareValue)}
        onCurrencyAdd={(idCurrency) => handeAddCurrency(idCurrency)}
        onCurrencyPublicChange={(idCurrency, currencyValue, shareValue) => handleChangeCurrencyPublic(idCurrency, currencyValue, shareValue)}
        onCurrencyPublicAdd={() => handeAddCurrencyPublic()}
      />

      {/* Button - Save */}
      <Button
        disabled={!canSave}
        onClick={() => handleSave()}
      >
        Save
      </Button>

      {/* Modal - Add Round */}
      {modalAddOpen && createPortal(
        <Modal 
          title="Add a round" 
          onClose={() => setModalAddOpen(false)} 
          onSave={(newRound) => handleAddRound(newRound)}
          roundsLength={roundsDetails.length}
        />,
        document.body
      )}
      {/* Modal - Edit Round */}
      {modalEditOpen && createPortal(
        <Modal
          title="Edit a round"
          onClose={() => {
            setRoundIdToEdit(null);
            setModalEditOpen(false);
          }}
          onSave={(newRound) => handleEditRound(newRound, roundIdToEdit)}
          onDelete={() => handleDeleteRound(roundIdToEdit)}
          round={roundIdToEdit !== null ? roundsDetails[roundIdToEdit] : undefined}
          roundsLength={roundsDetails.length}
        />,
        document.body
      )}
      {/* Modal - Edit Public Round */}
      {modalEditPublicOpen && createPortal(
        <Modal
          title="Edit public round"
          onClose={() => setModalEditPublicOpen(false)}
          onSave={(newRound) => handleEditPublicRound(newRound)} 
          round={roundPublicDetail}
          roundsLength={roundsDetails.length}
          isPublic
        />,
        document.body
      )}
    </div>
  )
}