jQuery(function($){
    $('#exercice1').on('click',function(e){
        e.preventDefault();
        var elt = $(this);
        var $panelBody = elt.closest('.panel').children('.panel-body').first();
        $panelBody.empty();     
        var request = $.ajax('rest.php')
            .done(function(data, status, xhr){
                $panelBody.append('<table><thead><tr><th>Email</th><th>Mot de passe</th><th>Actif</th><th><th>Modification</th></tr></thead><tbody></tbody></table>');
                var tbody = $panelBody.find('tbody');
                for(var i in data){
                    tbody.append(
                        $('<tr>')
                      .append($('<td>').text(data[i].email))
                      .append($('<td>').text(data[i].password))
                      .append($('<td>').text(data[i].active))
                      .append($('<td>').text(data[i].date))
                      );
                }
            })
            .fail(function(xhr, status){
                elt.parent().after('<p>erreur '+xhr.status+'</p>');
            });
    });
    
    $('#exercice2').on('submit',function(e){
        e.preventDefault();
        var elt = $(this);
        elt.next('p').remove();        
        var request = $.ajax('rest.php', {
                    method : 'POST',
                    data : JSON.stringify({
                        'email' : elt.find('input[name="email"]').val(),
                        'password' : elt.find('input[name="password"]').val(),
                        'active' : elt.find('input[name="active"]:checked').val(),
                    }),
                    contentType : 'application/json'
                }
            )
            .done(function(data, status, xhr){
                elt.after('<p>ok</p>');
            })
            .fail(function(xhr, status){
                elt.after('<p>erreur '+xhr.status+'</p>');
            });
    });
    
    $('#exercice3').on('submit',function(e){
        e.preventDefault();
        var elt = $(this);
        elt.next('p').remove();        
        var request = $.ajax('rest.php/'+elt.find('input[name="email"]').val(), {
                    method : 'DELETE'
                }
            )
            .done(function(data, status, xhr){
                elt.after('<p>ok</p>');
            })
            .fail(function(xhr, status){
                elt.after('<p>erreur '+xhr.status+'</p>');
            });
    });
	
	$('#exercice4').on('submit',function(e){
        e.preventDefault();
        var elt = $(this);
        elt.next('p').remove();        
        var request = $.ajax('rest.php/'+elt.find('input[name="email"]').val())
            .done(function(data, status, xhr){
                elt.after('<p>ok</p>');
				$('#exercice4a input[name="email"]').val(data.email);
				$('#exercice4a input[name="password"]').val(data.password);
				$('#exercice4a input[name="active"][value="'+data.active+'"]').prop('checked','checked');
            })
            .fail(function(xhr, status){
                elt.after('<p>erreur '+xhr.status+'</p>');
            });
    });
	
	$('#exercice4a').on('submit',function(e){
        e.preventDefault();
        var elt = $(this);
        elt.next('p').remove();        
        var request = $.ajax('rest.php/'+elt.find('input[name="email"]').val(), {    
                    method : 'PUT',
                    data : JSON.stringify({
                        'password' : elt.find('input[name="password"]').val(),
                        'active' : elt.find('input[name="active"]:checked').val(),
                    }),
                    contentType : 'application/json'
                }
            )
            .done(function(data, status, xhr){
                elt.after('<p>ok</p>');
            })
            .fail(function(xhr, status){
                elt.after('<p>erreur '+xhr.status+'</p>');
            });
    });
});
