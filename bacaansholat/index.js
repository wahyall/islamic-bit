// Request API Niat Sholat
$.ajax({
   url: 'https://islamic-api-zhirrr.vercel.app/api/niatshalat',
   success: results => {
      const dataNiatSholat = results
      let fragmentModalBacaanSholat = ''
      dataNiatSholat.forEach(niat => {
         fragmentModalBacaanSholat += `
            <div class="niat m-0 p-2" style="cursor: pointer;" data-niat="${niat.name}" data-id="${niat.id}" data-bs-dismiss="modal">
              <h6 class="m-0" style="font-weight: 400;">${niat.name}</h6>
            </div>
         `
      })

      $('.daftar-niat-sholat').html(fragmentModalBacaanSholat)

      // Ubah niat sholat pilihan saat daftar niat sholat di klik
      $('.niat').on('click', function () {
         $('.niat-pilihan .nama').text($(this).text())
         $('.niat-pilihan .arab').text(dataNiatSholat[$(this).data('id') - 1].arabic)
         $('.niat-pilihan .latin').text(dataNiatSholat[$(this).data('id') - 1].latin)
         $('.niat-pilihan .arti').text(dataNiatSholat[$(this).data('id') - 1].terjemahan)

      })
   }
})


// Request API Bacaan Sholat
$.ajax({
   url: 'https://islamic-api-zhirrr.vercel.app/api/bacaanshalat',
   success: results => {
      const dataBacaanSholat = results;
      let fragmentBacaanSholat = `
         <div class="bacaan niat-pilihan p-4">
               <div class="mb-3">
                  <h5 class="mb-3" style="font-weight: 600; cursor: pointer;" data-bs-toggle="modal" data-bs-target="#niatSholat">
                     <span class="nama">Niat Sholat Shubuh</span>
                     <span class="ganti-kota ms-2 fas fa-caret-down" style="font-size: 1.2rem;"></span>
                  </h5>
                  <h2 class="arab mb-3" style="text-align: right;">اُصَلِّى فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى</h2>
                  <h6 class="latin" style="font-style: italic; letter-spacing: 1px; line-height: 1.4rem;">
                     Ushalli fardhosh shubhi rok'ataini mustaqbilal qiblati adaa-an lillaahi ta'aala
                  </h6>
               </div>
               <div class="info-bacaan mb-3 mb-sm-0" style="overflow: hidden;">
                  <div class="info mt-0" style="letter-spacing: 1px;">
                     <div class="mb-3">
                        <h6 class="m-0" style="font-weight: 600;">Arti:</h6>
                        <h6 class="arti" style="letter-spacing: 1px; line-height: 1.4rem; font-weight: 400;">
                           Aku berniat shalat fardhu Shubuh dua raka 'at menghadap kiblat karena Allah Ta'ala
                        </h6>
                     </div>
                  </div>
               </div>

               <span class="expand-detail">
                  <img src="../img/arrow-down.png">
               </span>
            </div>
      `;

      dataBacaanSholat.forEach(bacaan => {
         fragmentBacaanSholat += `
            <div class="bacaan p-4">
               <div class="mb-3">
                  <h5 class="nama mb-3" style="font-weight: 600;">${bacaan.name}</h5>
                  <h2 class="arab mb-3" style="text-align: right;">${bacaan.arabic}</h2>
                  <h6 class="latin" style="font-style: italic; letter-spacing: 1px; line-height: 1.4rem;">${bacaan.latin}</h6>
               </div>
               <div class="info-bacaan mb-3 mb-sm-0" style="overflow: hidden;">
                  <div class="info mt-0" style="letter-spacing: 1px;">
                     <div class="mb-3">
                        <h6 class="m-0" style="font-weight: 600;">Arti:</h6>
                        <h6 class="arti" style="letter-spacing: 1px; line-height: 1.4rem; font-weight: 400;">${bacaan.terjemahan}</h6>
                     </div>
                  </div>
               </div>

               <span class="expand-detail">
                  <img src="../img/arrow-down.png">
               </span>
            </div>
         `;
      })

      $('.bacaan-sholat .container').html(fragmentBacaanSholat);

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