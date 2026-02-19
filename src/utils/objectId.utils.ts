/**
 * Extrae la fecha de un ObjectId de MongoDB
 * @param objectId - String del ObjectId de MongoDB
 * @returns Date object extraído del timestamp del ObjectId
 */
export const getDateFromObjectId = (objectId: string): Date => {
    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    return new Date(timestamp);
  };