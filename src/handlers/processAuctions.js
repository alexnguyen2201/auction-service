import createHttpError from 'http-errors';
import { closeAuction } from '../lib/closeAution';
import { getEndedAuctions } from '../lib/getEndedAuctions';

async function processAuctions(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions();
    console.log(auctionsToClose)
    const closePromises = auctionsToClose.map(auction => closeAuction(auction));
    await Promise.all(closePromises)
    return {closed: closePromises.length}

  } catch (error) {
    console.log(error)
    throw new createHttpError.InternalServerError(error);
  }
}

export const handler = processAuctions;