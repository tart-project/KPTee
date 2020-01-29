import Card from './card'

export const cardArchiveList = [];

export function archiveCard(archivedCard) {
    // Add card infomation
    cardArchiveList.push(archivedCard)
}

// Get card information from archive list → Create card
export function restoreCardFromArchive() {

    // Get target card infomation
    const targetCardInfo = cardArchiveList[cardArchiveList.length - 1]

    // Create a card
    const restoredCardInfo = new Card(targetCardInfo)

    // Delete target card information
    cardArchiveList.pop()

    return restoredCardInfo
}