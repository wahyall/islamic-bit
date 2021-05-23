$.ajax({
   url: 'https://islamic-api-zhirrr.vercel.app/api/tahlil',
   success: results => {
      const dataBacaanTahlil = results.data
      let fragmentBacaanTahlil = ''
      dataBacaanTahlil.forEach(bacaan => {
         fragmentBacaanTahlil += `
            <div class="bacaan p-4">
               <h5 class="nama-bacaan mb-3" style="font-weight: 500;">${bacaan.title}</h5>
               <h2 class="mb-3" style="text-align: right;">${bacaan.arabic}</h2>
               <div class="info-bacaan mb-3 mb-sm-0" style="overflow: hidden;">
                  <div class="info mt-0" style="letter-spacing: 1px;">
                     <div class="mb-3">
                        <h6 class="m-0" style="font-weight: 600;">Arti:</h6>
                        <h6 class="arti" style="letter-spacing: 1px; line-height: 1.4rem; font-weight: 400;">${bacaan.translation}</h6>
                     </div>
                  </div>
               </div>

               <span class="expand-detail">
                  <img src="../img/arrow-down.png">
               </span>
            </div>
         `;
      })

      $('.bacaan-tahlil .container').html(fragmentBacaanTahlil);

      // Lihat detail bacaan saat tombol expand di click
      const expandDetail = document.querySelectorAll('.expand-detail');
      expandDetail.forEach(expand => {
         expand.addEventListener('click', function () {
            this.parentElement.querySelector('.info-bacaan').classList.toggle('open');
            this.classList.toggle('open');

            if (this.parentElement.querySelector('.info-bacaan').classList.contains('open')) {
               const infoHeight = getComputedStyle(this.parentElement.querySelector('.info')).height;
               this.parentElement.querySelector('.info-bacaan').style.height = `calc(${infoHeight} + .5rem)`;
            } else {
               this.parentElement.querySelector('.info-bacaan').style.height = '0';
            }
         })
      });
   }
})