import { GROUP_NAME } from '@/common/constants/config'
import { KeysGroupName } from '@/common/types'

type GroupNames = {
  group: string
  items: string[]
}

export const getGroupNameDataSelect = (names: string[]): GroupNames[] => {
  const groupData: GroupNames[] = []
  const groupItemsMap = new Map()
  const groupKeys = Object.keys(GROUP_NAME)
  const defaultGroupKey = GROUP_NAME['Остальные']

  names.forEach(name => {
    const extractedLetters = extractText(name) as KeysGroupName

    if (extractedLetters && groupKeys.includes(extractedLetters)) {
      const groupKey = truncateString(GROUP_NAME[extractedLetters], 80)

      if (groupItemsMap.has(groupKey)) {
        const allValues = groupItemsMap.get(groupKey)

        groupItemsMap.set(groupKey, [...allValues, name])
      } else {
        groupItemsMap.set(groupKey, [name])
      }
    } else if (groupItemsMap.has(defaultGroupKey)) {
      const allValues = groupItemsMap.get(defaultGroupKey)

      groupItemsMap.set(defaultGroupKey, [...allValues, name])
    } else {
      groupItemsMap.set(defaultGroupKey, [name])
    }
  })

  const groupItemsObject = Object.fromEntries([...groupItemsMap])

  for (const key in groupItemsObject) {
    groupData.push({ group: key, items: groupItemsObject[key] })
  }

  return groupData
}

function extractText(str: string): string {
  const regex = /^([^,-]+)/
  const match = str.match(regex)

  if (match && match[1]) {
    return match[1]
  }

  return ''
}

function truncateString(str: string, length: number): string {
  if (str.length <= length) {
    return str
  } else {
    return `${str.slice(0, length)}...`
  }
}
