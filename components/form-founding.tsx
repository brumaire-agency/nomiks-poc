'use client'

import {createPortal} from 'react-dom';
import {Input, Table, Modal, Button, MessageError, RoundForm} from '@/components';
import {useContext} from "react";
import {FundingContext} from "@/contexts/FundingContext";
import {getFoundingPublicRoundDetail, getFoundingRoundDetail, transformProjectData} from "@/utils";


export const FormFounding = () => {


    const {
        roundPublicDetail,
        setRoundsDetails,
        roundsDetails,
        totalSupply,
        setModalAddOpen, modalAddOpen,
        setModalEditOpen, modalEditOpen,
        setModalEditPublicOpen, modalEditPublicOpen,
        defaultCurrencies,
        setRoundPublicDetail,
        assets,
        hardCap, setHardCap,
        softCap, setSoftCap,
        ratioPv, setRatioPv,
        projectExample,
        assetName,
        error, setError,
        totalCollectedFound,
        canEditTable,
        setRoundIdToEdit, roundIdToEdit,
        canSave
    } = useContext(FundingContext)


    // Functions
    const handleAddRound = (newRound: RoundForm) => {
        if (roundPublicDetail) {
            // Add new Round
            const newRoundDetail = getFoundingRoundDetail(newRound, totalSupply || 0, roundPublicDetail.roundPrice, defaultCurrencies);
            // Sort Rounds
            setRoundsDetails && setRoundsDetails([...roundsDetails || [], newRoundDetail].sort((a, b) => a.roundPrice - b.roundPrice));
        }
        // Close modal
        setModalAddOpen && setModalAddOpen(false);
    }
    const handleEditRound = (newRound: RoundForm, id: number | null) => {
        if (roundPublicDetail) {
            let newRounds = [...roundsDetails || []];
            // Edit Round
            if (id !== null) newRounds[id] = getFoundingRoundDetail(newRound, totalSupply || 0, roundPublicDetail.roundPrice, defaultCurrencies, newRounds[id].currencies);
            // Sort Rounds
            setRoundsDetails && setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
        }
        // Close modal
        setModalEditOpen && setModalEditOpen(false);
    }
    const handleEditPublicRound = (newRound: RoundForm) => {
        // Edit Public Round
        setRoundPublicDetail && setRoundPublicDetail(getFoundingPublicRoundDetail(newRound, totalSupply || 0, defaultCurrencies, roundPublicDetail?.currencies));
        // Close modal
        setModalEditPublicOpen && setModalEditPublicOpen(false);
    }
    const handleDeleteRound = (id: number | null) => {
        let newRounds = [...roundsDetails || []];
        // Remove Round
        if (id !== null) newRounds.splice(id, 1);
        // Sort Rounds
        setRoundsDetails && setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
        // Close modal
        setModalEditOpen && setModalEditOpen(false);
    }

    const handleChangeCurrency = (idRound: number, idCurrency: number, currencyValue: string, shareValue: number) => {
        let newRounds = [...roundsDetails || []];
        // Edit Round
        newRounds[idRound] = {
            ...newRounds[idRound],
            currencies: newRounds[idRound].currencies.map((currency, id) => id === idCurrency ? {currency: currencyValue, share: shareValue} : currency)
        }
        // Sort Rounds
        setRoundsDetails && setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
    }
    const handleChangeCurrencyPublic = (idCurrency: number, currencyValue: string, shareValue: number) => {
        if (roundPublicDetail) {
            const newCurrencies = roundPublicDetail.currencies.map((currency, id) => id === idCurrency ? {currency: currencyValue, share: shareValue} : currency);
            setRoundPublicDetail && setRoundPublicDetail({
                ...roundPublicDetail,
                currencies: newCurrencies
            })
        }
    }
    const handeAddCurrency = (idRound: number) => {
        let newRounds = [...roundsDetails || []];
        // Edit Round
        newRounds[idRound] = {
            ...newRounds[idRound],
            currencies: [...newRounds[idRound].currencies, {currency: assets?.at(0)?.label || '', share: 0}],
        }
        // Sort Rounds
        setRoundsDetails && setRoundsDetails(newRounds.sort((a, b) => a.roundPrice - b.roundPrice))
    }
    const handeAddCurrencyPublic = () => {
        if (roundPublicDetail) {
            setRoundPublicDetail && setRoundPublicDetail({
                ...roundPublicDetail,
                currencies: [...roundPublicDetail.currencies, {currency: assets?.at(0)?.label || '', share: 0}]
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
            setHardCap && setHardCap(projectExample.hardCap);
            setSoftCap && setSoftCap(projectExample.softCap);
            setRatioPv && setRatioPv(projectExample.ratioPv);
            setRoundsDetails && setRoundsDetails(projectExample.rounds.map(round => getFoundingRoundDetail(round, totalSupply || 0, projectExample.publicPrice, defaultCurrencies, round.currencies)))
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
                    onChange={(event) => setHardCap && setHardCap(Number(event.target.value))}
                    data-cy="input-hard-cap"
                />
                <Input
                    label="Soft cap"
                    type="number"
                    value={softCap}
                    onChange={(event) => setSoftCap && setSoftCap(Number(event.target.value))}
                    data-cy="input-soft-cap"
                />
                <Input
                    label="Ratio Public/Private Sale"
                    type="number"
                    value={ratioPv}
                    onChange={(event) => setRatioPv && setRatioPv(Number(event.target.value))}
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
                assets={assets || []}
                disabled={!canEditTable}
                rounds={roundsDetails || []}
                roundPublic={roundPublicDetail}
                onClickAdd={() => setModalAddOpen && setModalAddOpen(true)}
                onClickEdit={(id: number) => {
                    setRoundIdToEdit && setRoundIdToEdit(id);
                    setModalEditOpen && setModalEditOpen(true);
                }}
                onClickEditPublic={() => setModalEditPublicOpen && setModalEditPublicOpen(true)}
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
                    onClose={() => setModalAddOpen && setModalAddOpen(false)}
                    onSave={(newRound) => handleAddRound(newRound)}
                    roundsLength={roundsDetails?.length || 0}
                />,
                document.body
            )}
            {/* Modal - Edit Round */}
            {modalEditOpen && createPortal(
                <Modal
                    title="Edit a round"
                    onClose={() => {
                        setRoundIdToEdit && setRoundIdToEdit(undefined);
                        setModalEditOpen && setModalEditOpen(false);
                    }}
                    onSave={(newRound) => handleEditRound(newRound, roundIdToEdit || 0)}
                    onDelete={() => handleDeleteRound(roundIdToEdit || 0)}
                    round={roundIdToEdit !== null ? roundsDetails?.at(roundIdToEdit || 0) : undefined}
                    roundsLength={roundsDetails?.length || 0}
                />,
                document.body
            )}
            {/* Modal - Edit Public Round */}
            {modalEditPublicOpen && createPortal(
                <Modal
                    title="Edit public round"
                    onClose={() => setModalEditPublicOpen && setModalEditPublicOpen(false)}
                    onSave={(newRound) => handleEditPublicRound(newRound)}
                    round={roundPublicDetail}
                    roundsLength={roundsDetails?.length || 0}
                    isPublic
                />,
                document.body
            )}
        </div>
    )
}