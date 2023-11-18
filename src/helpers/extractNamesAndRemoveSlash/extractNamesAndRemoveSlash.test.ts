import { PracticeValues } from '../../types/types.ts'
import { extractNamesAndRemoveSlash } from '../extractNamesAndRemoveSlash/extractNamesAndRemoveSlash.ts'

describe('extractNamesAndRemoveSlash', () => {
  test('should extract names and remove slashes correctly for educational practice type', () => {
    const str =
      'Учебная практика "Выполнение макета малоэтажного жилого дома и общественного здания"\n Ваганов Г.П. С 09:00 до 14:00.'

    const expected = {
      practiceType: PracticeValues.EDUCATIONAL,
      subjectTitleWithoutSurname:
        'Учебная практика "Выполнение макета малоэтажного жилого дома и общественного здания" С 09:00 до 14:00.',
      surNames: ['Ваганов Г.П.'],
    }

    const result = extractNamesAndRemoveSlash(str)

    expect(result).toEqual(expected)
  })

  test('should extract names and remove slashes correctly for internship practice type', () => {
    const str =
      'Производственная практика "Разработка визуально-графического стиля организации" С 09:00 до 14:00, Фунтиков И.Е.'
    const expected = {
      practiceType: PracticeValues.INTERNSHIP,
      subjectTitleWithoutSurname:
        'Производственная практика "Разработка визуально-графического стиля организации" С 09:00 до 14:00',
      surNames: ['Фунтиков И.Е.'],
    }

    const result = extractNamesAndRemoveSlash(str)

    expect(result).toEqual(expected)
  })

  test('should handle missing practice type', () => {
    const str = 'Прикладная математика \nОсиновой П.Ю./\nБулатова Е.В.'
    const expected = {
      practiceType: null,
      subjectTitleWithoutSurname: 'Прикладная математика',
      surNames: ['Осиновой П.Ю.', 'Булатова Е.В.'],
    }

    const result = extractNamesAndRemoveSlash(str)

    expect(result).toEqual(expected)
  })

  test('should handle missing subject title and surnames', () => {
    const str = 'Цветоведение \nи колористика \nв граф. дизайне'
    const expected = {
      practiceType: null,
      subjectTitleWithoutSurname: 'Цветоведение и колористика в граф. дизайне',
      surNames: ['Не указан преподаватель'],
    }

    const result = extractNamesAndRemoveSlash(str)

    expect(result).toEqual(expected)
  })
})
