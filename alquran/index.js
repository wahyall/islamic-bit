$.ajax({
   url: 'https://api.quran.sutanlab.id/surah',
   success: results => {
      // Mengecek apakah yang dihasilkan dari request API adalah JSON atau String
      results = typeof results == 'string' ? JSON.parse(results) : results

      const daftarSurat = results.data;
      let fragmentDaftarSurat = '';
      daftarSurat.forEach(surat => {
         fragmentDaftarSurat += `
            <div class="surat p-3 p-sm-4">
               <h3 class="nomer-surat text-center mb-0 py-2 me-3" style="font-style: italic;">${surat.number}.</h3>
               <div class="detail-surat mb-1">
                  <a href="surah/?nama=${surat.name.transliteration.id}&nomer=${surat.number}"
                  style="display: block; color: var(--blue2)" >
                     <div class="nama-surat">
                        <div div style="letter-spacing: .1rem;">
                           <h4 class="nama mb-0" style="font-weight: 700;">${surat.name.transliteration.id}</h4>
                           <h6 class="arti">${surat.name.translation.id}</h6>
                        </div>
                        <h1 class="arab text-end mt-1 mt-sm-0 me-3">${surat.name.short}</h1>
                     </div>
                  </a>
                  <div class="info-surat mb-3 mb-sm-0" style="overflow: hidden;">
                     <div class="info mt-3" style="letter-spacing: 1px">
                        <ul class="ayat m-0">
                           <li>
                              <h6 style="font-weight: 400;">Memiliki <span style="font-weight: 600;">${surat.numberOfVerses} ayat</span></h6>
                           </li>
                        </ul>
                        <ul class="jenis m-0">
                           <li>
                              <h6 style="font-weight: 400;">Merupakan golongan surat <span style="font-weight: 600;">${surat.revelation.id}</span></h6>
                           </li>
                        </ul>
                        <ul class="penjelasan m-0">
                           <li style="line-height: 1.5rem">
                              <h6 style="font-weight: 400;">${surat.tafsir.id}</h6>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>

               <span class="expand-detail">
                  <img src="../img/arrow-down.png">
               </span>
            </div>
         `;

         $('.daftar-surat .container').html(fragmentDaftarSurat);

         // Mengaktifkan library List.js agar bisa melakukan searching
         new List('daftar-surat', {
            valueNames: ['nama', 'arti', 'arab'],
         });

         // Lihat detail surat saat tombol expand di click
         const expandDetail = document.querySelectorAll('.expand-detail');
         expandDetail.forEach(expand => {
            expand.addEventListener('click', function () {
               this.parentElement.querySelector('.info-surat').classList.toggle('open');
               this.classList.toggle('open');

               if (this.parentElement.querySelector('.info-surat').classList.contains('open')) {
                  const infoMaxHeight = getComputedStyle(this.parentElement.querySelector('.info')).height;
                  this.parentElement.querySelector('.info-surat').style.height = `calc(${infoMaxHeight} + 2rem)`;
               } else {
                  this.parentElement.querySelector('.info-surat').style.height = '0';
               }
            })
         });
      })

      // Memberi id pada surat yang terkahir dibaca
      if (JSON.parse(localStorage.getItem('ISLAMIC BIT')).bacaanTerakhir) {
         const bacaanSuratTerakhir = JSON.parse(localStorage.getItem('ISLAMIC BIT')).bacaanTerakhir.nomerSurat
         console.log(bacaanSuratTerakhir)
         document.querySelectorAll('.surat')[bacaanSuratTerakhir - 1].setAttribute('id', 'last-read')
      }
   }
})

// Loncat ke surat yang terkahir dibaca
$('.index-surat span').on('click', function () {
   let elementTujuan = $('#last-read');

   const mediaQueryXS = window.matchMedia('(max-width: 576px)').matches;

   if (mediaQueryXS) {
      $('html, body').animate({
         scrollTop: elementTujuan.offset().top - 120
      })
   } else {
      $('html, body').animate({
         scrollTop: elementTujuan.offset().top - 100
      })
   }
});