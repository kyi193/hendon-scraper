const puppeteer = require('puppeteer');

const findTournamentData = () => {
  (async () => {
    const url = 'https://pokerdb.thehendonmob.com/festival.php?a=r&n=35173'
    let browser = await puppeteer.launch()
    let page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle2' })

    const data = await page.evaluate(() => {
      const extractTournamentNameAndURL = (list, tournamentURLs) => {
        let tournamentListArr = []

        for (let i = 0; i < list.length; i++) {
          tournamentListArr.push({
            name: list[i].innerText,
            url: tournamentURLs[i]
          })
        }

        return tournamentListArr
      }

      const tournamentNameClass = document.querySelectorAll('.name')
      const tournamentURLs = Array.from(document.querySelectorAll('.name > a')).filter(link => link.href.includes('event')).map(link => link.href)
      const tournamentListArr = extractTournamentNameAndURL(tournamentNameClass, tournamentURLs)

      return {
        tournamentList: tournamentListArr
      }
    })

    await browser.close()
  })()
}

findTournamentData()
