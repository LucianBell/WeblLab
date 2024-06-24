window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('formSubmitBtn').addEventListener('click', function(e) {
        // Prevent the default form submission
        e.preventDefault();  

        // Getting values from the form input
        const userName = document.getElementById('exampleInputName1');
        const userMail = document.getElementById('exampleFormControlEmail1');
        const userPhone = document.getElementById('exampleFormPhone');
        const userIdade = document.getElementById('exampleFormIdade');
        const userSintomas = document.getElementById('sintomas');
        const userFrequenc = document.getElementById('freqSintomas');

        // Creating the feedback variables
        const feedbackName = document.getElementById('fdk-name');
        const feedbackEmail = document.getElementById('fdk-email');
        const feedbackPhone = document.getElementById('fdk-phone');
        const feedbackIdade = document.getElementById('fdk-idade');
        const feedbackSintomas = document.getElementById('fdk-sintomas');
        const feedbackFreq = document.getElementById('fdk-freqSintomas');

        // Email regex used in the email verification
        let emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

        // Verification name
        if (userName.value != '' && userName.value.length > 10) {
            feedbackName.classList.remove('null-class')
            feedbackName.classList.remove('bad-fdk')
            feedbackName.classList.add('okay-fdk')
        } else {
            feedbackName.classList.remove('null-class')
            feedbackName.classList.add('bad-fdk')          
            feedbackName.classList.remove('okay-fdk')  
        }
        
        // Verification email
        if (userMail.value != '' && emailRegex.test(userMail.value)) {
            feedbackEmail.classList.remove('null-class')
            feedbackEmail.classList.remove('bad-fdk')
            feedbackEmail.classList.add('okay-fdk')
        } else {
            feedbackEmail.classList.remove('null-class')
            feedbackEmail.classList.add('bad-fdk')          
            feedbackEmail.classList.remove('okay-fdk')  
        }

        // Verification age
        if (userIdade.value > 0) {
            feedbackIdade.classList.remove('null-class')
            feedbackIdade.classList.remove('bad-fdk')
            feedbackIdade.classList.add('okay-fdk')
        } else {
            feedbackIdade.classList.add('bad-fdk')          
            feedbackIdade.classList.remove('null-class')
            feedbackIdade.classList.remove('okay-fdk')  
        }

        // Verification phone number
        let regexPhone = new RegExp('^[0-9]+$');

        if ((regexPhone.test(userPhone.value) && userPhone.value.length >= 11)) {
            feedbackPhone.classList.remove('null-class')
            feedbackPhone.classList.remove('bad-fdk')
            feedbackPhone.classList.add('okay-fdk')
        } else {
            feedbackPhone.classList.remove('null-class')
            feedbackPhone.classList.add('bad-fdk')          
            feedbackPhone.classList.remove('okay-fdk')  
        }
        

        // Verification symptoms
        if (userSintomas.value != '') {
            feedbackSintomas.classList.remove('null-class')
            feedbackSintomas.classList.remove('bad-fdk')
            feedbackSintomas.classList.add('okay-fdk')
        } else {
            feedbackSintomas.classList.remove('null-class')
            feedbackSintomas.classList.add('bad-fdk')          
            feedbackSintomas.classList.remove('okay-fdk')  
        }
        
        // Verification symptoms frequency
        if (userFrequenc.value != 'N') {
            feedbackFreq.classList.remove('null-class')
            feedbackFreq.classList.remove('bad-fdk')
            feedbackFreq.classList.add('okay-fdk')
        } else {
            feedbackFreq.classList.remove('null-class')
            feedbackFreq.classList.add('bad-fdk')          
            feedbackFreq.classList.remove('okay-fdk')  
        }

        // Checking all elements to complete registration
        let isRegistered = checkRegistration(feedbackName, feedbackEmail, feedbackPhone, feedbackIdade, feedbackSintomas, feedbackFreq)

        // Relocating to success page if user is registered
        if (isRegistered) {
            window.location.replace('../pages/sucesso.html')
        }
    })
})

$( function() {
    // Listing symptoms for the autocomplete function
    var availableTags = [
      "Dor de cabeça",
      "Suor noturno",
      "Sangramento nasal",
      "Manchas roxas na pele",
      "Perda de peso",
      "Palidez",
      "Cansaço",
      "Vômito"
    ];

    // Defining ranks and what symptoms are present in each one of them (using arrays that store strings)
    let rankingAtual = 0;
    let ranking5 = ["Cansaço", "Vômito"]
    let ranking4 = ["Perda de peso", "Palidez"]
    let ranking3 = ["Sangramento nasal", "Manchas roxas na pele"]
    let ranking2 = ["Suor noturno"]
    let ranking1 = ["Dor de cabeça"]

    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
    

    // jQuery UI autocomplete function for symptoms tag
    $( "#sintomas" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );

        // Function to check if all elements of an array are in another array
        function containsAll(arr, target) {
          return target.every(elem => arr.includes(elem));
        }
      
        // Variable that stores the information in the input symptoms tag
        let currentInput = this.value.split(/,\s*/);
        
        // Check if the indicacao element exists
        let indicacaoElement = $("#biririIndicacao");

        // Check if the points element exists
        let pointsElement = $("#biririPoints");
      
        /* 
        Verification code to check if all the symptoms that are present in one rankign variable
        are present in the input symptoms tag. If that happens, the correct text for medical 
        recomendation (indicacaoElement) is inserted in the screen, same for the current ranking
        of the user and the color for the border and number shown in the screen changes to indicate
        the level of attention the user should have towards it's symptoms.
        */
        if (currentInput.length === 1 && currentInput[0] === "") {
          rankingAtual = 0;
        } else if (containsAll(currentInput, ranking5)) {
            rankingAtual = 0;
            rankingAtual = Math.max(rankingAtual, 5);
            indicacaoElement.text("Procure uma unidade de saúde");
            pointsElement.css('border', '#cc3300 2px solid')
            pointsElement.css('color', '#cc3300')
        } else if (containsAll(currentInput, ranking4)) {
            rankingAtual = 0;
            rankingAtual = Math.max(rankingAtual, 4);
            indicacaoElement.text("Monitore seu estado de saúde");
            pointsElement.css('border', '#ffcc00 2px solid')
            pointsElement.css('color', '#ffcc00')
        } else if (containsAll(currentInput, ranking3)) {
            rankingAtual = 0;
            rankingAtual = Math.max(rankingAtual, 3);
            indicacaoElement.text("Cuidado!");
            pointsElement.css('border', '#ffcc00 2px solid')
            pointsElement.css('color', '#ffcc00')
        } else if (ranking2.includes(ui.item.value)) {
            rankingAtual = 0;
            rankingAtual = Math.max(rankingAtual, 2);
            indicacaoElement.text("Verifique o número de casos semanais");
            pointsElement.css('border', '#99cc33 2px solid')
            pointsElement.css('color', '#99cc33')
        } else if (ranking1.includes(ui.item.value)) {
            rankingAtual = 0;
            rankingAtual = Math.max(rankingAtual, 1);
            indicacaoElement.text("Cuide de sua saúde, procure se hidratar");
            pointsElement.css('border', '#99cc33 2px solid')
            pointsElement.css('color', '#99cc33')
        }
       
        // Update the points text
        if (pointsElement.length > 0) {
          pointsElement.text(`${rankingAtual}`);
        } 
      
        return false;
        }
      });
    



      let btn_sim = document.getElementById("sim_btn")
      let btn_nao = document.getElementById("nao_btn")
      
      btn_sim.addEventListener("click", (event) => {      
        $("#doencas-prexist").show("fade", 250);
      })

      btn_nao.addEventListener("click", (event) => {      
        $("#doencas-prexist").hide("fade", 250)
      })

      // Listing pre-existent conditions for the autocomplete function
      var doencasOpcoes = [
        "Síndrome de Down (Trissomia 21)",
        "Neurofibromatose Tipo 1 (NF1)",
        "Síndrome de Li-Fraumeni",
        "Retinoblastoma Hereditário",
        "Anemia de Fanconi",
        "Síndrome de Beckwith-Wiedemann",
        "Síndrome de Bloom",
        "Síndrome de Rothmund-Thomson",
        "Síndrome de Gorlin (Síndrome do Carcinoma Nevoide Basocelular)",
        "Ataxia-Telangiectasia",
        "Síndrome de Noonan",
        "Síndrome de Costello",
        "Síndrome de Wiskott-Aldrich",
        "Síndrome de Nijmegen",
        "Síndrome de Sotos",
        "Síndrome de Perlman",
        "Síndrome de Schwachman-Diamond",
        "Xeroderma Pigmentoso",
        "Síndrome de Peutz-Jeghers",
        "Síndrome de Denys-Drash",
        "Síndrome de Diamond-Blackfan",
        "Síndrome de Muir-Torre",
        "Disqueratose Congênita",
        "Síndrome de Turcot"
    ];

    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
    
    // jQuery UI autocomplete function for the pre-existent conditions the user may have
    $( "#input_doencas_prexist" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            doencasOpcoes, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
  } );


// Javascript function to check if the user filled all the mandatory form fields correctly
function checkRegistration(feedbackName, feedbackEmail, feedbackPhone, feedbackIdade, feedbackSintomas, feedbackFreq) {
    let isRegistered = false;

    if (feedbackName.classList.contains('okay-fdk') 
        && feedbackEmail.classList.contains('okay-fdk')
        && feedbackSintomas.classList.contains('okay-fdk')
        && feedbackPhone.classList.contains('okay-fdk')
        && feedbackFreq.classList.contains('okay-fdk')
        && feedbackIdade.classList.contains('okay-fdk')) {
            isRegistered = true;
    } else {
        isRegistered = false;
    }
    return isRegistered;
}
