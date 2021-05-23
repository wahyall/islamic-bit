const param = document.location.href.split('?')[1].split('&');
const idPerawi = param[0].split('=')[1]
const jumlahHadits = param[1].split('=')[1]
const page = param[2].split('=')[1]
const range = param[3].split('=')[1]

$.ajax({
   url: `https://api.hadith.sutanlab.id/books/${idPerawi}?range=${range}`,
   success: results => {
      const namaPerawi = results.data.name
      const dataHadits = results.data.hadiths
      let fragmentHadits = ''
      dataHadits.forEach(hadits => {
         fragmentHadits += `
            <div class="hadits p-4 pt-5">
               <div class="detail">
                  <h5 class="nomer mb-3">${namaPerawi} No. ${hadits.number}</h5>
                  <h2 class="text-end mb-2" style="font-weight: 600; line-height: 2.8rem">${hadits.arab}</h2>
                  <div class="info-hadits mb-2 mb-sm-0" style="overflow: hidden;">
                     <div class="info mt-3" style="letter-spacing: 1px;">
                        <div class="arti">
                           <h6 class="m-0" style="font-weight: 600;">Arti:</h6>
                           <h6 class="m-0" style="font-weight: 400;">${hadits.id}</h6>
                        </div>
                     </div>
                  </div>
               </div>

               <span class="expand-detail">
                  <img src="../../img/arrow-down.png">
               </span>
            </div>
         `
      })

      $('.daftar-hadits .container').html(fragmentHadits)
      $('.nama-perawi').text(namaPerawi)

      // Lihat detail hadits saat tombol expand di click
      const expandDetail = document.querySelectorAll('.expand-detail');
      expandDetail.forEach(expand => {
         expand.addEventListener('click', function () {
            this.parentElement.querySelector('.info-hadits').classList.toggle('open');
            this.classList.toggle('open');

            if (this.parentElement.querySelector('.info-hadits').classList.contains('open')) {
               const infoHeight = getComputedStyle(this.parentElement.querySelector('.info')).height;
               this.parentElement.querySelector('.info-hadits').style.height = `calc(${infoHeight} + 2rem)`;
            } else {
               this.parentElement.querySelector('.info-hadits').style.height = '0';
            }
         })
      })

      // Mengubah display pagination menjadi block yang sebelumnya none saat API sudah diloads
      $('.pagination1').css('display', 'block')
      $('.pagination2').css('display', 'block')

      const pagiNext = document.querySelector('.paginationjs-next')
      const pagiPrev = document.querySelector('.paginationjs-prev')

      // Mengubah URL parameter saat pagination diclick sesuai dengan nomer
      pagiNext.addEventListener('click', function () {
         if (!this.classList.contains('disabled')) {
            changeURLParam(this)
         }
      })
      pagiPrev.addEventListener('click', function () {
         if (!this.classList.contains('disabled')) {
            changeURLParam(this)
         }
      })
   }
})

function changeURLParam(elem) {
   const rangeAwal = elem.getAttribute('data-num') * 20 - 19
   const rangeAkhir = (elem.getAttribute('data-num') * 20) > jumlahHadits ? jumlahHadits : (elem.getAttribute('data-num') * 20)

   document.location.href = `http://islamic-bit.netlify.app/hadits/daftar/?id=${idPerawi}&jumlah=${jumlahHadits}&page=${elem.getAttribute('data-num')}&range=${rangeAwal}-${rangeAkhir}`
}

// Set library pagination.js untuk membuat pagination
$('.pagination1 .container').pagination({
   dataSource: function (done) {
      var result = [];
      for (var i = 1; i <= parseInt(jumlahHadits); i++) {
         result.push(i);
      }
      done(result);
   },
   pageNumber: page,
   pageSize: 20,
   afterPageOnClick: function () {
      makeBorderRadiusPagination()
      changeURLParam(document.querySelector('.pagination1 .active'))
   }
})

$('.pagination2 .container').pagination({
   dataSource: function (done) {
      var result = [];
      for (var i = 1; i <= parseInt(jumlahHadits); i++) {
         result.push(i);
      }
      done(result);
   },
   pageNumber: page,
   pageSize: 20,
   afterPageOnClick: function () {
      makeBorderRadiusPagination()
      changeURLParam(document.querySelector('.pagination2 .active'))
   }
})

// Membuat border-radius pada item pagination di awal dan akhir
function makeBorderRadiusPagination() {
   const paginationBtn1 = document.querySelectorAll('.pagination1 li');
   paginationBtn1[1].style.borderTopLeftRadius = '6px'
   paginationBtn1[1].style.borderBottomLeftRadius = '6px'

   paginationBtn1[paginationBtn1.length - 2].style.borderTopRightRadius = '6px'
   paginationBtn1[paginationBtn1.length - 2].style.borderBottomRightRadius = '6px'

   const paginationBtn2 = document.querySelectorAll('.pagination2 li');
   paginationBtn2[1].style.borderTopLeftRadius = '6px'
   paginationBtn2[1].style.borderBottomLeftRadius = '6px'

   paginationBtn2[paginationBtn2.length - 2].style.borderTopRightRadius = '6px'
   paginationBtn2[paginationBtn2.length - 2].style.borderBottomRightRadius = '6px'
}
makeBorderRadiusPagination()