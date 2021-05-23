$.ajax({
   url: 'https://islamic-api-zhirrr.vercel.app/api/doaharian',
   success: results => {
      const dataDoaHarian = results.data;
      let fragmentDoaHarian = '';

      dataDoaHarian.forEach(doa => {
         fragmentDoaHarian += `
            <div class="doa p-4">
               <div class="mb-3">
                  <h5 class="nama mb-3" style="font-weight: 600;">${doa.title}</h5>
                  <h2 class="arab mb-3" style="text-align: right;">${doa.arabic}</h2>
                  <h6 class="latin" style="font-style: italic; letter-spacing: 1px; line-height: 1.4rem;">${doa.latin}</h6>
               </div>
               <div class="info-doa mb-3 mb-sm-0" style="overflow: hidden;">
                  <div class="info mt-0" style="letter-spacing: 1px;">
                     <div class="mb-3">
                        <h6 class="m-0" style="font-weight: 600;">Arti:</h6>
                        <h6 class="arti" style="letter-spacing: 1px; line-height: 1.4rem; font-weight: 400;">${doa.translation}</h6>
                     </div>
                  </div>
               </div>

               <span class="expand-detail">
                  <img src="../img/arrow-down.png">
               </span>
            </div>
         `;
      })

      $('.doa-harian .container').html(fragmentDoaHarian);

      new List('daftar-doa-harian', {
         valueNames: ['nama', 'arab', 'latin', 'arti'],
      });

      // Lihat detail doa saat tombol expand di click
      const expandDetail = document.querySelectorAll('.expand-detail');
      expandDetail.forEach(expand => {
         expand.addEventListener('click', function () {
            this.parentElement.querySelector('.info-doa').classList.toggle('open');
            this.classList.toggle('open');

            if (this.parentElement.querySelector('.info-doa').classList.contains('open')) {
               const infoHeight = getComputedStyle(this.parentElement.querySelector('.info')).height;
               this.parentElement.querySelector('.info-doa').style.height = `calc(${infoHeight} + .5rem)`;
            } else {
               this.parentElement.querySelector('.info-doa').style.height = '0';
            }
         })
      });
   }
})