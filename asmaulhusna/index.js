$.ajax({
   url: 'https://islamic-api-zhirrr.vercel.app/api/asmaulhusna',
   success: results => {
      const dataAsmaulHusna = results.data;
      let fragmentAsmaulHusna = '';

      dataAsmaulHusna.forEach(nama => {
         fragmentAsmaulHusna += `
            <div class="col">
               <div class="nama p-4 text-center">
                  <div>
                     <h1 class="arab">${nama.arabic}</h1>
                     <h4 class="latin mb-1" style="font-weight: 700;">${nama.latin}</h4>
                     <h6 class="arti" style="font-weight: 400;">${nama.translation_id}</h6>
                  </div>
               </div>
            </div>
         `;
      })

      $('.asmaul-husna .container').html(fragmentAsmaulHusna);

      new List('daftar-asmaul-husna', {
         valueNames: ['arab', 'latin', 'arti'],
      });
   }
})