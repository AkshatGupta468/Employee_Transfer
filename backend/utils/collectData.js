const puppeteer = require("puppeteer")
const ddoListURL = "https://ekoshonline.cg.nic.in/BCO_DDO%20Menu/ddoList.aspx"
async function getDDOnumberList() {
  const browser = await puppeteer.launch({ headless: "new" })
  const page = await browser.newPage()
  await page.goto(ddoListURL)
  await page.$eval("#OpSatus_0", (radio) => (radio.checked = true))
  await page.$eval("#ddlSelfddo", (select) => (select.selectedIndex = 1))
  await page.click("#btnReport")
  // Wait for the desired response or data to be available
  await page.waitForSelector("#tblRecord > tbody")
  const tableData = await page.evaluate(() => {
    const table = document.querySelector("#tblRecord > tbody") // table selector
    const rows = table.querySelectorAll("tr")

    const data = []

    for (const row of rows) {
      const rowData = []
      const cells = row.querySelectorAll("td")

      for (const cell of cells) {
        rowData.push(cell.textContent.trim())
      }

      data.push(rowData)
    }
    let ddoNumbers = []
    for (let i = 2; i < data.length; i++) {
      ddoNumbers.push(data[i][1])
    }
    return ddoNumbers
  })

  await browser.close()
  return tableData
}

const employeeListURL =
  "https://ekoshonline.cg.nic.in/ePayroll/frmEmpDetails.aspx"

async function getDDOwiseEmployeeList(ddoCode) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(employeeListURL)
  const updatedHTML = await page.evaluate(() => {
    return document.documentElement.innerHTML
  })

  const date = new Date()
  let month = date.getMonth()
  if (month == 0) {
    month = 12
    year--
  }
  let year = date.getFullYear()
  month = month.toString().padStart(2, "0")
  const monthYear = `${month}/${year}`
  const YY1 = Number(year.toString().slice(0, 2))
  const YY2 = Number(year.toString().slice(-2))

  const finacialYear =
    month < 4 ? `${YY1}${YY2 - 1}_${YY2}` : `${YY1}${YY2}_${YY2 + 1}`
  await page.type("#txtDDOCode", ddoCode)
  await page.type("#txtMon_Year", monthYear)
  await page.select("#ddlPayrollTypeId", "1")
  await page.waitForSelector("#ddlFin_Year")
  await page.select("#ddlFin_Year", finacialYear)
  await page.click("#btnShow1")

  // Wait for the desired response or data to be available
  await page.waitForSelector("#GridView1 > tbody")

  const tableData = await page.evaluate(() => {
    const table = document.querySelector("#GridView1 > tbody")
    const rows = table.querySelectorAll("tr")

    const data = []

    for (const row of rows) {
      const rowData = []
      const cells = row.querySelectorAll("td")

      for (const cell of cells) {
        rowData.push(cell.textContent.trim())
      }

      data.push(rowData)
    }

    return data
  })

  await browser.close()
  let employeeList = []
  for (let i = 1; i < tableData.length; i++) {
    let employee = {}
    employee["EMPLOYEE_CODE"] = tableData[i][1]
    employee["NAME"] = tableData[i][2]
    employeeList.push(employee)
  }
  return employeeList
}

// getDDOnumberList().then((ddoNumbers) => {
//   console.log(ddoNumbers[0])
//   console.log(ddoNumbers[1])
//   console.log(ddoNumbers[2])
//   console.log(ddoNumbers[3])
// })

getDDOwiseEmployeeList("0101002").then((data) => {
  console.log(data[0])
  console.log(data[1])
  console.log(data[2])
  console.log(data[3])
})
// async function getAllEmployeeList() {
//   const ddoNumbers = await getDDOnumberList()
//   let allEmployees = []
//   let cnt = 2
//   for (const ddoCode of ddoNumbers) {
//     console.log(ddoCode)
//     console.log(typeof ddoCode)
//     allEmployees.concat(await getDDOwiseEmployeeList(ddoCode))
//     cnt--
//     if (cnt == 0) break
//     console.log(cnt)
//   }
//   return allEmployees
// }

// getAllEmployeeList().then((employees) => {
//   console.log(employees[0])
//   console.log(employees[1])
//   console.log(employees[2])
//   console.log(employees.length)
//   console.log(employees[employees.length])
//   console.log(employees[employees.length - 1])
//   console.log(employees[employees.length - 2])
// })
