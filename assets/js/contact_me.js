// Contact Form Scripts

var translations = {
  en: {
    fill_all_fields: "Please fill all fields",
    send_success:
      "Your message has been received, we'll get back to you shortly!",
    send_failure: "An error occurred, please try again or contact us by email!"
  },
  fr: {
    fill_all_fields: "Veuillez remplir tous les champs",
    send_success: "Votre message a été reçu! Nous vous répondrons sous peu!",
    send_failure:
      "Une erreur est survenue, veuillez ré-essayer ou nous contacter par courriel!"
  }
};

var lang = translations[$("html").attr("lang")];

$(function() {
  $("form").submit(function(e) {
    e.preventDefault();
    var form = $(this);

    if (
      !form.find("#name").val() ||
      !form.find("#emailaddress").val() ||
      !form.find("#spam").val()
    ) {
      $("#success")
        .html(
          `<div class='alert alert-danger'>
                  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                  <strong>${lang.fill_all_fields}</strong>
                  </div>`
        )
        .get(0)
        .scrollIntoView();
      return;
    }

    var toSend = form.serialize();

    $.post(form.attr("action"), toSend)
      .success(function(receivedData) {
        if (receivedData == "true") {
          $("#success")
            .html(
              `<div class='alert alert-success'>
                    <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                    <strong>${lang.send_success}</strong>
                    </div>`
            )
            .get(0)
            .scrollIntoView();
          form[0].reset();
        } else {
          $("#success")
            .html(
              `<div class='alert alert-danger'>
                    <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                    <strong>${lang.send_failure}</strong>
                    </div>`
            )
            .get(0)
            .scrollIntoView();
        }
      })
      .error(function(xhr) {
        $("#success")
          .html(
            `<div class='alert alert-danger'>
                  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                  <strong>${lang.send_failure}<br>${xhr.responseText}</strong>
                  </div>`
          )
          .get(0)
          .scrollIntoView();
      });
  });

  /*When clicking on Full hide fail/success boxes */
  $("#name").focus(function() {
    $("#success").html("");
  });
});
