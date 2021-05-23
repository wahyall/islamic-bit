$.ajax({
   url: 'sholawat.json',
   success: results => {
      const dataSholawatNabi = results;
      let fragmentSholawatNabi = '';

      dataSholawatNabi.forEach(sholawat => {
         fragmentSholawatNabi += `
            <div class="sholawat p-4">
               <div class="mb-3">
                  <h5 class="nama mb-3" style="font-weight: 600;">${sholawat.nama}</h5>
                  <h2 class="arab mb-3" style="text-align: right;">${sholawat.arab}</h2>
                  <h6 class="latin" style="font-style: italic; letter-spacing: 1px; line-height: 1.4rem;">${sholawat.latin}</h6>
               </div>
               <div class="info-sholawat mb-3 mb-sm-0" style="overflow: hidden;">
                  <div class="info mt-0" style="letter-spacing: 1px;">
                     <div class="mb-3">
                        <h6 class="m-0" style="font-weight: 600;">Arti:</h6>
                        <h6 class="arti" style="letter-spacing: 1px; line-height: 1.4rem; font-weight: 400;">${sholawat.arti}</h6>
                     </div>
                  </div>
               </div>

               <span class="expand-detail">
                  <img src="../img/arrow-down.png">
               </span>
            </div>
         `;
      })

      $('.sholawat-nabi .container').html(fragmentSholawatNabi);

      // Lihat detail sholawat saat tombol expand di click
      const expandDetail = document.querySelectorAll('.expand-detail');
      expandDetail.forEach(expand => {
         expand.addEventListener('click', function () {
            this.parentElement.querySelector('.info-sholawat').classList.toggle('open');
            this.classList.toggle('open');

            if (this.parentElement.querySelector('.info-sholawat').classList.contains('open')) {
               const infoHeight = getComputedStyle(this.parentElement.querySelector('.info')).height;
               this.parentElement.querySelector('.info-sholawat').style.height = `calc(${infoHeight} + .5rem)`;
            } else {
               this.parentElement.querySelector('.info-sholawat').style.height = '0';
            }
         })
      });
   }
})