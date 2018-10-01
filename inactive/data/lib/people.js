const xlsx = require('xlsx')

const PEOPLE_PATH = 'C:\\Users\\JohnGruber\\OneDrive - John Gruber\\people.xlsx'
const workbook = xlsx.readFile(PEOPLE_PATH)
const people = xlsx.utils.sheet_to_json(workbook.Sheets.people)

module.exports = {people}
