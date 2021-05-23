$.ajax({
   url: 'https://islamic-api-zhirrr.vercel.app/api/kisahnabi',
   success: results => {
      const dataKisahNabi = results
      console.log(dataKisahNabi)
      let fragmentKisahNabi = ''

      dataKisahNabi.forEach((nabi, i) => {
         if (i !== 15 && i !== 16 && i !== 17) {
            fragmentKisahNabi += `
            <a href="full/?id=${i}&kisah=${nabi.name.replace('(Part 1)', '')}" class="d-block" style="color: var(--blue2);">
               <div class="nama-nabi px-4 pt-4 pb-3">
                  <h3 class="mb-3" style="font-weight: 600;">Kisah ${nabi.name.replace('(Part 1)', '')}</h3>
                  <p class="highlight">
                     ${nabi.description.replace(/\n\n/gi, '<br>')}
                  </p>
                  <span style="text-decoration: underline; font-size: .8rem">Lihat lebih banyak</span>
               </div>
            </a>
         `;
         }
      })

      $('.kisah-nabi .container').html(fragmentKisahNabi)
   }
})