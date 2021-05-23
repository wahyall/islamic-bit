const id = parseInt(document.location.href.split('?')[1].split('&')[0].split('=')[1])

$.ajax({
   url: 'https://islamic-api-zhirrr.vercel.app/api/kisahnabi',
   success: results => {
      const dataKisahNabi = results
      console.log(dataKisahNabi)
      let fragmentKisahNabi = ''

      // Var kisah Nabi Musa dibuat karena ada beberapa part dan nantinya akan dijadikan satu
      let kisahNabiMusa = ''
      dataKisahNabi.forEach((nabi, i) => {
         if (i === 14 || i === 15 || i === 16 || i === 17) {
            kisahNabiMusa += nabi.description
         }
      })

      dataKisahNabi.forEach((nabi, i) => {
         if (i == id) {
            if (i === 14) {
               fragmentKisahNabi += `
                  <div class="kisah-nabi px-4 pt-4 pb-3">
                     <h3 class="mb-3" style="font-weight: 600;">Kisah ${nabi.name.replace('(Part 1)', '')}</h3>
                     <p class="cerita">
                        ${kisahNabiMusa.replace(/\n/gi, '<br>')}
                     </p>
                  </div>
               `;
            } else {
               fragmentKisahNabi += `
                  <div class="kisah-nabi px-4 pt-4 pb-3">
                     <h3 class="mb-3" style="font-weight: 600;">Kisah ${nabi.name.replace('(Part 1)', '')}</h3>
                     <p class="cerita">
                        ${nabi.description.replace(/\n/gi, '<br>')}
                     </p>
                  </div>
               `;
            }
         }
      })

      $('.nama-nabi').text(dataKisahNabi[id].name.replace('(Part 1)', ''))

      $('.full-kisah-nabi .container').html(fragmentKisahNabi)
   }
})